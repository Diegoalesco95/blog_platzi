import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PageLoading from '../General/PageLoading';
import Fatal from '../General/Fatal';
import * as tareasActions from '../../actions/tareasActions';

class Tareas extends Component {
  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.traerTodas();
    }
  }

  componentDidUpdate() {
    const { tareas, loading, traerTodas } = this.props;
    if (!Object.keys(tareas).length && !loading) {
      traerTodas();
    }
  }

  mostrarContenido = () => {
    const { tareas, loading, error } = this.props;

    if (loading) {
      return <PageLoading />;
    }
    if (error) {
      return <Fatal mensaje={error} />;
    }
    return Object.keys(tareas).map(usu_id => (
      <div key={usu_id}>
        <h2>Usuario {usu_id}</h2>
        <div className="font-weight-normal text-capitalize mt-4 ml-4 mb-4">{this.ponerTareas(usu_id)}</div>
      </div>
    ));
  };

  ponerTareas = usu_id => {
    const { tareas, cambioCheck, eliminar } = this.props;
    const por_usuario = {
      ...tareas[usu_id]
    };

    return Object.keys(por_usuario).map(tar_id => (
      <div key={tar_id} className="row mb-2">
        <div className="col-12 col-md-8 col-lg-9">
          <input
            type="checkbox"
            defaultChecked={por_usuario[tar_id].completed}
            className="mr-3 mb-2"
            onChange={() => cambioCheck(usu_id, tar_id)}
          />
          {por_usuario[tar_id].title}
        </div>
        <div className="col-12 col-md-4 col-lg-3 center d-flex">
          <Link className="btn btn-outline-primary btn-sm ml-4 mr-2" to={`/tareas/guardar/${usu_id}/${tar_id}`}>
            Editar
          </Link>
          <button className="btn btn-outline-danger btn-sm" onClick={() => eliminar(tar_id)}>
            Eliminar
          </button>
        </div>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <Link className="btn btn-success mb-3" to="/tareas/guardar">
          Agregar
        </Link>

        {this.mostrarContenido()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);
