import { TRAER_TODAS, LOADING, ERROR, CAMBIO_USUARIO, CAMBIO_TITULO } from '../types/tareasTypes';

const INITIAL_STATE = {
  tareas: {},
  loading: false,
  error: '',
  usuario_id: '',
  titulo: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_TODAS:
      return {
        ...state,
        tareas: action.payload,
        loading: false,
        error: ''
      };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: action.payload, loading: false };
    case CAMBIO_USUARIO:
      return { ...state, usuario_id: action.payload };
    case CAMBIO_TITULO:
      return { ...state, titulo: action.payload };
    default:
      return state;
  }
};
