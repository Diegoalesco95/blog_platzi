import axios from 'axios';
import { TRAER_TODAS, LOADING, ERROR, CAMBIO_USUARIO, CAMBIO_TITULO } from '../types/tareasTypes';

export const traerTodas = () => async dispatch => {
  const URL = 'https://jsonplaceholder.typicode.com';
  dispatch({
    type: LOADING
  });
  try {
    const response = await axios.get(`${URL}/todos`);

    const tareas = {};
    response.data.map(
      tar =>
        (tareas[tar.userId] = {
          ...tareas[tar.userId],
          [tar.id]: {
            ...tar
          }
        })
    );

    dispatch({
      type: TRAER_TODAS,
      payload: tareas
    });
  } catch (error) {
    console.log('Error: ', error.message);
    dispatch({
      type: ERROR,
      payload: 'Uuups! Algo salió mal. Parece que la información de tareas no está disponible.'
    });
  }
};

export const cambioUsuarioId = usuario_id => dispatch => {
  dispatch({
    type: CAMBIO_USUARIO,
    payload: usuario_id
  });
};
export const cambioTitulo = titulo => dispatch => {
  dispatch({
    type: CAMBIO_TITULO,
    payload: titulo
  });
};
