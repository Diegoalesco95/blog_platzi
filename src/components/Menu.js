import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg" id="menu">
      <Link to="#" className="navbar-brand mb-0 h1">
        PlatziBlog
      </Link>
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link active" to="/">
            Usuarios
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tareas">
            Tareas
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
