import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSignOutAlt, FaUtensils } from "react-icons/fa";
import logo from "../../public/assets/logoBonafide.png";

function Navbar() {
  const { logout, usuario } = useAuth();

  return (
    <nav className="fondo shadow-md py-4 px-8 flex justify-between items-center">
      <Link
        to="/dashboard"
        className="flex items-center gap-2 text-2xl font-bold text-brand-600"
      >
        <img src={logo} alt="Logo" className="h-20 w-25 mr-2" />
      </Link>

      <div className="flex items-center gap-4">
        {usuario && (
          <span className="text-white hidden md:block">
            Hola, <b>{usuario.nombre}</b>
          </span>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-2 text-white hover:text-brand-600 transition-colors"
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
