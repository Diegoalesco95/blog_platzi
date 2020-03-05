import axios from 'axios';
import { ACTUALIZAR, LOADING, ERROR, COM_LOADING, COM_ERROR } from '../types/publicacionesTypes';
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

    const nuevas = response.data.map(publicacion => ({
      ...publicacion,
      comentarios: [],
      abierto: false
    }));

    const publicaciones_actualizadas = [...publicaciones, nuevas];

    dispatch({
      type: ACTUALIZAR,
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

export const openClose = (pub_key, com_key) => (dispatch, getState) => {
  const { publicaciones } = getState().publicacionesReducer;
  const seleccionada = publicaciones[pub_key][com_key];

  const actualizada = {
    ...seleccionada,
    open: !seleccionada.open
  };

  const publicaciones_actualizadas = [...publicaciones];

  publicaciones_actualizadas[pub_key] = [...publicaciones[pub_key]];
  publicaciones_actualizadas[pub_key][com_key] = actualizada;

  dispatch({
    type: ACTUALIZAR,
    payload: publicaciones_actualizadas
  });
};

export const traerComentarios = (pub_key, com_key) => async (dispatch, getState) => {
  dispatch({
    type: COM_LOADING
  });
  const { publicaciones } = getState().publicacionesReducer;
  const seleccionada = publicaciones[pub_key][com_key];

  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`);

    const actualizada = {
      ...seleccionada,
      comentarios: response.data
    };

    const publicaciones_actualizadas = [...publicaciones];

    publicaciones_actualizadas[pub_key] = [...publicaciones[pub_key]];
    publicaciones_actualizadas[pub_key][com_key] = actualizada;

    dispatch({
      type: ACTUALIZAR,
      payload: publicaciones_actualizadas
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: COM_ERROR,
      payload: 'Comentarios no disponibles'
    });
  }
};
