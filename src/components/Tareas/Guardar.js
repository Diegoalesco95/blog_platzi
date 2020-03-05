import React, { Component } from 'react';

class Guardar extends Component {
  render() {
    return (
      <div>
        <h1>Guardar Tarea</h1>
        <form>
          <div className="form-group">
            <label htmlFor="userId"> Usuario Id:</label>
            <input className="form-control" type="number" name="userId" />
          </div>
          <div className="form-group">
            <label htmlFor="titulo">Titulo:</label>
            <input className="form-control" type="text" name="titulo" />
          </div>
          <button className="btn btn-success">Save</button>
        </form>
      </div>
    );
  }
}

export default Guardar;
