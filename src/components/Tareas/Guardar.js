import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as tareasActions from '../../actions/tareasActions';

class Guardar extends Component {
  cambioUsuarioId = e => {
    this.props.cambioUsuarioId(e.target.value);
  };
  cambioTitulo = e => {
    this.props.cambioTitulo(e.target.value);
  };

  render() {
    return (
      <div>
        <h1>Guardar Tarea</h1>
        <form>
          <div className="form-group">
            <label htmlFor="userId"> Usuario Id:</label>
            <input className="form-control" type="number" name="userId" value={this.props.usuario_id} onChange={this.cambioUsuarioId} />
          </div>
          <div className="form-group">
            <label htmlFor="titulo">Titulo:</label>
            <input className="form-control" type="text" name="titulo" value={this.props.titulo} onChange={this.cambioTitulo} />
          </div>
          <button className="btn btn-success">Save</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);
