import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaUtensils } from 'react-icons/fa';

function Navbar() {
  const { logout, usuario } = useAuth();

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <Link to="/dashboard" className="flex items-center gap-2 text-2xl font-bold text-brand-600">
        <FaUtensils />
        <span>BONAFIDE <span className="text-gray-500 text-sm font-normal">Staff</span></span>
      </Link>
      
      <div className="flex items-center gap-4">
        {usuario && <span className="text-gray-600 hidden md:block">Hola, <b>{usuario.nombre}</b></span>}
        <button 
          onClick={logout} 
          className="flex items-center gap-2 text-gray-500 hover:text-brand-600 transition-colors"
          title="Cerrar Sesión"
        >
          <span className="hidden md:inline">Salir</span>
          <FaSignOutAlt />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;