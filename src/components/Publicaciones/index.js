import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageLoading from '../General/PageLoading';
import Fatal from '../General/Fatal';
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';
import Comentarios from './Comentarios';

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario, openClose, traerComentarios } = publicacionesActions;

class Publicaciones extends Component {
  async componentDidMount() {
    const {
      usuariosTraerTodos,
      publicacionesTraerPorUsuario,
      match: {
        params: { key }
      }
    } = this.props;
    if (!this.props.usuariosReducer.usuarios.length) {
      await usuariosTraerTodos();
    }
    if (this.props.usuariosReducer.error) {
      return;
    }
    if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[this.props.match.params.key])) {
      publicacionesTraerPorUsuario(key);
    }
  }

  ponerUsuario = () => {
    const {
      usuariosReducer,
      match: {
        params: { key }
      }
    } = this.props;
    if (usuariosReducer.error) {
      return <Fatal mensaje={usuariosReducer.error} />;
    }
    if (!usuariosReducer.usuarios.length || usuariosReducer.loading) {
      return <PageLoading />;
    }
    const nombre = usuariosReducer.usuarios[key].name;

    return <h1>Publicaciones de {nombre}</h1>;
  };

  ponerPublicaciones = () => {
    const {
      usuariosReducer,
      usuariosReducer: { usuarios },
      publicacionesReducer,
      publicacionesReducer: { publicaciones },
      match: {
        params: { key }
      }
    } = this.props;

    if (!usuarios.length) {
      return;
    }
    if (usuariosReducer.error) {
      return;
    }
    if (publicacionesReducer.loading) {
      return <PageLoading />;
    }
    if (publicacionesReducer.error) {
      return <Fatal mensaje={publicacionesReducer.error} />;
    }
    if (!publicaciones.length) {
      return;
    }
    if (!('publicaciones_key' in usuarios[key])) {
      return;
    }

    const { publicaciones_key } = usuarios[key];

    return this.mostrarInfo(publicaciones[publicaciones_key], publicaciones_key);
  };

  mostrarInfo = (publicaciones, pub_key) =>
    publicaciones.map((publicacion, com_key) => (
      <div
        className="pub_titulo pt-3 pb-3"
        key={publicacion.id}
        onClick={() => this.mostrarComentarios(pub_key, com_key, publicacion.comentarios)}
      >
        <h2 className="text-capitalize">{publicacion.title}</h2>
        <h3>{publicacion.body}</h3>
        {publicacion.open ? <Comentarios comentarios={publicacion.comentarios} /> : ''}
      </div>
    ));

  mostrarComentarios = (pub_key, com_key, comentarios) => {
    this.props.openClose(pub_key, com_key);
    if (!comentarios.length) {
      this.props.traerComentarios(pub_key, com_key);
    }
  };

  render() {
    console.log(this.props);

    return (
      <div>
        {this.ponerUsuario()}
        {this.ponerPublicaciones()}
      </div>
    );
  }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
  return {
    usuariosReducer,
    publicacionesReducer
  };
};

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTraerPorUsuario,
  openClose,
  traerComentarios
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);
