import axios from '../api/axios';

export const crearPropinaPeticion = async (propina) => {
  return await axios.post('/propinas', propina);
};

export const obtenerHistorialPeticion = async () => {
  return await axios.get('/propinas');
};

export const obtenerTotalesPeticion = async () => {
  return await axios.get('/propinas/totales');
};

export const eliminarPropinaPeticion = async (id) => {
  return await axios.delete(`/propinas/${id}`);
};

export const actualizarPropinaPeticion = async (id, datos) => {
  return await axios.put(`/propinas/${id}`, datos);
};

export const liquidarSemanaPeticion = async () => {
  return await axios.post('/propinas/liquidar');
};