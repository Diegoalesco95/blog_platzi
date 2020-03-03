import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions';

class Usuarios extends Component {
  componentDidMount() {
    // const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    // this.setState({
    //   usuarios: response.data
    // });
    this.props.traerTodos();
  }

  ponerFilas = () =>
    this.props.usuarios.map(usuario => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
      </tr>
    ));

  render() {
    console.log(this.props);

    return (
      <div>
        <table className="tabla table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Enlace</th>
            </tr>
          </thead>
          <tbody>{this.ponerFilas()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = reducers => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);
