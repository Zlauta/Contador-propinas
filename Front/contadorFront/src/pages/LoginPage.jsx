import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const ok = await login(data);
    if (ok) navigate('/dashboard');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 md:p-10 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-brand-600 mb-6 text-center">Bienvenido</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-3 text-gray-400" />
              <input 
                type="email" 
                {...register("email", { required: true })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                placeholder="juan@bonafide.com"
              />
            </div>
            {errors.email && <span className="text-red-500 text-sm">El email es requerido</span>}
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Contraseña</label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-3 text-gray-400" />
              <input 
                type="password" 
                {...register("clave", { required: true })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                placeholder="********"
              />
            </div>
            {errors.clave && <span className="text-red-500 text-sm">La contraseña es requerida</span>}
          </div>

          <button type="submit" className="w-full bg-brand-600 text-white py-2 rounded-lg hover:bg-brand-700 transition duration-200 font-bold shadow-md">
            Ingresar
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          ¿No tienes cuenta? <Link to="/registro" className="text-brand-600 font-bold hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;