import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


const instance = axios.create({
  baseURL: apiUrl, // Asegúrate que tu backend corra aquí
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