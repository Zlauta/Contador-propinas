import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Asegúrate que tu backend corra aquí
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Inyectar token automáticamente en cada petición
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;