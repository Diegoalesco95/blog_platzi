import axios from 'axios';
import { TRAER_TODOS, LOADING, ERROR } from '../types/usuariosTypes';

export const traerTodos = () => async dispatch => {
  const URL = 'https://jsonplaceholder.typicode.com';
  dispatch({
    type: LOADING
  });
  try {
    const response = await axios.get(`${URL}/users`);
    dispatch({
      type: TRAER_TODOS,
      payload: response.data
    });
  } catch (error) {
    console.log('Error: ', error.message);
    dispatch({
      type: ERROR,
      payload: 'Uuups! Algo salió mal. Parece que la información del usuario no está disponible.'
    });
  }
};
