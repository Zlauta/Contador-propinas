import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

function RegistroPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registrarse } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const ok = await registrarse(data);
    if (ok) navigate('/login');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 md:p-10 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-brand-600 mb-2 text-center">Crear Cuenta</h1>
        <p className="text-gray-500 text-center mb-6">Únete al equipo de cocina</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div className="relative flex items-center">
              <FaUser className="absolute left-3 text-gray-400" />
              <input type="text" {...register("nombre", { required: true })} 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-brand-500 focus:outline-none" placeholder="Nombre completo" />
            </div>
            {errors.nombre && <span className="text-red-500 text-xs">Requerido</span>}
          </div>

          <div>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-3 text-gray-400" />
              <input type="email" {...register("email", { required: true })} 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-brand-500 focus:outline-none" placeholder="Email" />
            </div>
            {errors.email && <span className="text-red-500 text-xs">Requerido</span>}
          </div>

          <div>
            <div className="relative flex items-center">
              <FaLock className="absolute left-3 text-gray-400" />
              <input type="password" {...register("clave", { required: true, minLength: 6 })} 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-brand-500 focus:outline-none" placeholder="Contraseña" />
            </div>
            {errors.clave && <span className="text-red-500 text-xs">Mínimo 6 caracteres</span>}
          </div>

          <div>
             <select {...register("rol")} className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:border-brand-500 focus:outline-none">
                <option value="mozo">Mozo / Cocina</option>
             </select>
          </div>

          <button type="submit" className="w-full bg-brand-600 text-white py-2 rounded-lg hover:bg-brand-700 font-bold shadow-md transition duration-200">
            Registrarse
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600 text-sm">
          ¿Ya tienes cuenta? <Link to="/login" className="text-brand-600 font-bold hover:underline">Ingresa aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default RegistroPage;