import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PageLoading from '../General/PageLoading';
import Fatal from '../General/Fatal';
import * as tareasActions from '../../actions/tareasActions';

class Guardar extends Component {
  componentDidMount() {
    const {
      match: {
        params: { usu_id, tar_id }
      },
      tareas,
      cambioUsuarioId,
      cambioTitulo
    } = this.props;

    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      cambioUsuarioId(tarea.userId);
      cambioTitulo(tarea.title);
    }
  }
  cambioUsuarioId = event => {
    this.props.cambioUsuarioId(event.target.value);
  };
  cambioTitulo = event => {
    this.props.cambioTitulo(event.target.value);
  };
  handleClick = () => {
    console.log('Button was Clicked');

    const {
      match: { params: usu_id, tar_id },
      tareas,
      usuario_id,
      titulo,
      agregar,
      editar
    } = this.props;

    const nueva_tarea = {
      userId: usuario_id,
      title: titulo,
      completed: false
    };

    if (usu_id && tar_id) {
      const tarea = tareas[usu_id][tar_id];
      const tarea_editada = {
        ...nueva_tarea,
        completed: tarea.completed,
        id: tarea.id
      };
      editar(tarea_editada);
    } else {
      agregar(nueva_tarea);
    }
  };

  deshabilitar = () => {
    const { usuario_id, titulo, loading } = this.props;

    if (loading) {
      return true;
    }
    if (!usuario_id || !titulo) {
      return true;
    }
    return false;
  };
  mostrarAccion = () => {
    const { error, loading } = this.props;
    if (loading) {
      return <PageLoading />;
    }
    if (error) {
      return <Fatal mensaje={error} />;
    }
  };

  render() {
    return (
      <div>
        {this.props.regresar ? <Redirect to="/tareas" /> : ''}
        <h1>Guardar Tarea</h1>
        <div>
          <div className="form-group">
            <label htmlFor="userId"> Usuario Id:</label>
            <input className="form-control" type="number" name="userId" value={this.props.usuario_id} onChange={this.cambioUsuarioId} />
          </div>
          <div className="form-group">
            <label htmlFor="titulo">Titulo:</label>
            <input className="form-control" type="text" name="titulo" value={this.props.titulo} onChange={this.cambioTitulo} />
          </div>
          <button className="btn btn-success" onClick={this.handleClick} disabled={this.deshabilitar()}>
            Save
          </button>
          {this.mostrarAccion()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);
