import React from 'react';
import { connect } from 'react-redux';
import PageLoading from '../General/PageLoading';
import Fatal from '../General/Fatal';
import '../styles/comentarios.css';

const Comentarios = props => {
  if (props.com_error) {
    return <Fatal mensaje={props.com_error} />;
  }
  if (props.com_loading && !props.comentarios.length) {
    return <PageLoading />;
  }

  const ponerComentarios = () =>
    props.comentarios.map(comentario => (
      <div className="col-center col-lg-6 mt-2 mb-2" key={comentario.id}>
        <div className="card bg-light border-dark comentario">
          <div className="card-body">
            <h5 className="card-title text-capitalize">{comentario.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{comentario.email}</h6>
            <p className="card.text">{comentario.body}</p>
          </div>
          <div className="card-footer text-muted">{Math.floor(Math.random() * (1 - 15) + 15)} days ago</div>
        </div>
      </div>
    ));

  return (
    <div className="mt-3">
      <h3>Comentarios: </h3>
      <div className="row align-self-center">{ponerComentarios()}</div>
    </div>
  );
};

const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer;

export default connect(mapStateToProps)(Comentarios);
