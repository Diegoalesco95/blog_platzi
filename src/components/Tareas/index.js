import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageLoading from '../General/PageLoading';
import Fatal from '../General/Fatal';
import * as tareasActions from '../../actions/tareasActions';

class Tareas extends Component {
  componentDidMount() {
    this.props.traerTodas();
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
        <div className="contenedor_tareas">{this.ponerTareas(usu_id)}</div>
      </div>
    ));
  };

  ponerTareas = usu_id => {
    const { tareas } = this.props;
    const por_usuario = {
      ...tareas[usu_id]
    };

    return Object.keys(por_usuario).map(tar_id => (
      <div key={tar_id}>
        <input type="checkbox" defaultChecked={por_usuario[tar_id].completed} className="mr-3" />
        {por_usuario[tar_id].title}
      </div>
    ));
  };

  render() {
    console.log(this.props);

    return <div>{this.mostrarContenido()}</div>;
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);
