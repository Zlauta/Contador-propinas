import { createContext, useState, useContext, useEffect } from 'react';
import { loginPeticion, registrarPeticion } from '../services/auth.service';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [cargando, setCargando] = useState(true);

  // Registro
  const registrarse = async (datos) => {
    try {
      const res = await registrarPeticion(datos);
      setUsuario(res.data.usuario);
      toast.success('Cuenta creada exitosamente');
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al registrarse';
      toast.error(mensaje);
      return false;
    }
  };

  // Login
  const login = async (datos) => {
    try {
      const res = await loginPeticion(datos);
      setUsuario(res.data.data); 
      setEstaAutenticado(true);
      localStorage.setItem('token', res.data.token);
      toast.success(`Bienvenido ${res.data.data.nombre}`);
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.mensaje || 'Error al iniciar sesión';
      toast.error(mensaje);
      return false;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
    setEstaAutenticado(false);
  };

  // Verificación de sesión al cargar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setEstaAutenticado(true);
      // Aquí podrías decodificar el token para sacar el nombre del usuario si quisieras
      // o hacer una llamada a un endpoint /profile
    }
    setCargando(false);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, login, registrarse, logout, estaAutenticado, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};