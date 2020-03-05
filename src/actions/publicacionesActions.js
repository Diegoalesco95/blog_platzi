import axios from 'axios';
import { TRAER_POR_USUARIO, LOADING, ERROR } from '../types/publicacionesTypes';
import * as usuariosTypes from '../types/usuariosTypes';

const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = key => async (dispatch, getState) => {
  dispatch({
    type: LOADING
  });
  const { usuarios } = getState().usuariosReducer;
  const { publicaciones } = getState().publicacionesReducer;
  const usuario_id = usuarios[key].id;

  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);

    const publicaciones_actualizadas = [...publicaciones, response.data];

    dispatch({
      type: TRAER_POR_USUARIO,
      payload: publicaciones_actualizadas
    });

    const publicaciones_key = publicaciones_actualizadas.length - 1;
    const usuarios_actualizados = [...usuarios];
    usuarios_actualizados[key] = {
      ...usuarios[key],
      publicaciones_key
    };

    dispatch({
      type: USUARIOS_TRAER_TODOS,
      payload: usuarios_actualizados
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: 'Uuups! Algo salió mal. Parece que las publicaciones no están disponibles.'
    });
  }
};
