import axios from '../api/axios';

export const registrarPeticion = async (usuario) => {
  return await axios.post('/auth/registrar', usuario);
};

export const loginPeticion = async (usuario) => {
  return await axios.post('/auth/login', usuario);
};

export const obtenerMozosPeticion = async () => {
  return await axios.get('/auth/mozos');
};

// Opcional: Para verificar token al recargar página
export const verificarTokenPeticion = async () => {
  // Si tuvieras un endpoint /verify en el back. 
  // Por ahora usaremos la persistencia simple en AuthContext.
};

export const actualizarUsuarioPeticion = async (id, datos) => {
  return await axios.put(`/auth/${id}`, datos);
};

export const eliminarUsuarioPeticion = async (id) => {
  return await axios.delete(`/auth/${id}`);
};