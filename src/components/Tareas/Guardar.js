import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tareasActions from '../../actions/tareasActions';
import PageLoading from '../General/PageLoading';
import Fatal from '../General/Fatal';
import { Redirect } from 'react-router-dom';

class Guardar extends Component {
  cambioUsuarioId = event => {
    this.props.cambioUsuarioId(event.target.value);
  };
  cambioTitulo = event => {
    this.props.cambioTitulo(event.target.value);
  };
  handleClick = () => {
    console.log('Button was Clicked');
    const { usuario_id, titulo, agregar } = this.props;
    const nueva_tarea = {
      userId: usuario_id,
      title: titulo,
      completed: false
    };
    agregar(nueva_tarea);
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
