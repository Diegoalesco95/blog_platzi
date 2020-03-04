import React from 'react';
import '../styles/Fatal.css';
import Error404 from '../../assets/img/404.png';
const Fatal = props => {
  return (
    <div className="Fatal">
      <img src={Error404} alt="Error 404" />
      <h2>{props.mensaje}</h2>;
    </div>
  );
};

export default Fatal;
