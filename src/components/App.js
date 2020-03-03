import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      usuarios: []
    };
  }
  ponerFilas = () =>
    this.state.usuarios.map(usuario => (
      <tr>
        <td>{usuario.nombre}</td>
        <td>{usuario.correo}</td>
        <td>{usuario.enlace}</td>
      </tr>
    ));

  async componentDidMount() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log('respuesta', response);

    this.setState({
      usuarios: [
        {
          nombre: 'Kip',
          correo: 'Kiley.Bailey@yahoo.com',
          enlace: 'http://gordon.net'
        },
        {
          nombre: 'Mossie',
          correo: 'Newton55@yahoo.com',
          enlace: 'http://mustafa.biz'
        }
      ]
    });
  }

  render() {
    return (
      <div className="margen">
        <table className="tabla">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Enlace</th>
            </tr>
          </thead>
          <tbody>{this.ponerFilas()}</tbody>
        </table>
      </div>
    );
  }
}
export default App;
