import React from 'react';
import { connect } from 'react-redux';
import PageLoading from '../General/PageLoading';
import Fatal from '../General/Fatal';

const Comentarios = props => {
  if (props.loading) {
    return <PageLoading />;
  }
  if (props.error) {
    return <Fatal mensaje={props.error} />;
  }

  const ponerComentarios = () =>
    props.comentarios.map(comentario => (
      <li>
        <b>
          <u>{comentario.email}</u>
        </b>
        <br />
        {comentario.body}
      </li>
    ));

  return <ul>{ponerComentarios()}</ul>;
};

const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer;

export default connect(mapStateToProps)(Comentarios);
