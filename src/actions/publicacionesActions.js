import axios from 'axios';
import { TRAER_TODOS, LOADING, ERROR } from '../types/publicacionesTypes';

export const traerTodos = () => async dispatch => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    dispatch({
      type: TRAER_TODOS,
      payload: response.data
    });
  } catch (error) {
    console.log('Error: ', error.message);
    dispatch({
      type: ERROR,
      payload: 'Uuups! Algo salió mal, intente más tarde.'
    });
  }
};
