import React, { Component } from 'react';
import './styles/Loader.css';

export default class Loader extends Component {
  render() {
    return (
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
