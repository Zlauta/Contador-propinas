import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RutaProtegida() {
  const { estaAutenticado, cargando } = useAuth();

  if (cargando) return <h1 className="text-center mt-10">Cargando...</h1>;
  if (!estaAutenticado) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default RutaProtegida;