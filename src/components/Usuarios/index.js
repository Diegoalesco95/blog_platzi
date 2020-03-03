import React, { Component } from 'react';
import axios from 'axios';

class Usuarios extends Component {
  constructor() {
    super();
    this.state = {
      usuarios: []
    };
  }
  ponerFilas = () =>
    this.state.usuarios.map(usuario => (
      <tr key={usuario.id}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
      </tr>
    ));

  async componentDidMount() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');

    this.setState({
      usuarios: response.data
    });
  }

  render() {
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
export default Usuarios;
