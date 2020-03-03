import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
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
