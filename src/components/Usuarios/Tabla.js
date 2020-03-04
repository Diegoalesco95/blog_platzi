import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Tabla = props => {
  const ponerFilas = () =>
    props.usuarios.map((usuario, key) => (
      <tr key={usuario.id}>
        <td className="text-center">{usuario.name}</td>
        <td className="text-center">{usuario.email}</td>
        <td className="text-center">{usuario.website}</td>
        <td className="text-center">
          <Link to={`/publicaciones/${key}`}>
            <span className="eye-solid icon text-center"></span>
          </Link>
        </td>
      </tr>
    ));

  return (
    <div>
      <table className="tabla table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th className="text-center text-uppercase" scope="col">
              Nombre
            </th>
            <th className="text-center text-uppercase" scope="col">
              Correo
            </th>
            <th className="text-center text-uppercase" scope="col">
              Enlace
            </th>
            <th className="text-center text-uppercase" scope="col">
              Opciones
            </th>
          </tr>
        </thead>
        <tbody>{ponerFilas()}</tbody>
      </table>
    </div>
  );
};

const mapStateToProps = reducers => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps)(Tabla);
