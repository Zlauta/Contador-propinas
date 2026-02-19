import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaMoneyBillWave, FaHistory, FaTrash, FaEdit, FaUsers, FaUserCog, FaCalendarAlt, FaCheckDouble } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import ModalEditarPropina from '../components/ModalEditarPropina';

// Servicios
import { obtenerMozosPeticion, eliminarUsuarioPeticion } from '../services/auth.service';
import { 
  crearPropinaPeticion, obtenerTotalesPeticion, obtenerHistorialPeticion,
  eliminarPropinaPeticion, actualizarPropinaPeticion, liquidarSemanaPeticion
} from '../services/propina.service';

function DashboardPage() {
  const [mozos, setMozos] = useState([]);
  const [totales, setTotales] = useState([]);
  const [historial, setHistorial] = useState([]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [propinaSeleccionada, setPropinaSeleccionada] = useState(null);

  const { register, handleSubmit, reset } = useForm();
  const { usuario } = useAuth();

  // --- DATOS CALCULADOS PARA LA VISTA ---
  const diaActual = new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
  const diaFormateado = diaActual.charAt(0).toUpperCase() + diaActual.slice(1);
  const granTotalSemana = totales.reduce((acumulador, actual) => acumulador + actual.totalMonto, 0);

  const cargarDatos = async () => {
    try {
      const [resMozos, resTotales, resHistorial] = await Promise.all([
        obtenerMozosPeticion(), obtenerTotalesPeticion(), obtenerHistorialPeticion()
      ]);
      setMozos(resMozos.data.data);
      setTotales(resTotales.data.data);
      setHistorial(resHistorial.data.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { cargarDatos(); }, []);

  // --- UTILIDAD TOAST CONFIRMACIÓN ---
  const confirmarAccion = (mensaje, accionConfirmada) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4`}>
        <div className="flex-1 w-0 p-1">
          <p className="text-sm font-medium text-gray-900">{mensaje}</p>
        </div>
        <div className="flex border-l border-gray-200 ml-4">
          <button onClick={() => { accionConfirmada(); toast.dismiss(t.id); }} className="w-full border border-transparent rounded-none rounded-r-lg p-2 flex items-center justify-center text-sm font-bold text-red-600 hover:bg-red-50">
            Confirmar
          </button>
          <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none p-2 flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-50">
            Cancelar
          </button>
        </div>
      </div>
    ));
  };

  // --- HANDLERS PROPINA ---
  const onSubmitPropina = async (data) => {
    try {
      await crearPropinaPeticion({ idMozo: data.idMozo, monto: Number(data.monto) });
      toast.success('Propina registrada');
      reset();
      cargarDatos();
    } catch (error) { toast.error('Error al registrar'); }
  };

  const borrarPropina = (id) => {
    confirmarAccion('¿Eliminar esta propina permanentemente?', async () => {
      try { await eliminarPropinaPeticion(id); toast.success('Eliminado'); cargarDatos(); } catch (e) { toast.error('Error'); }
    });
  };

  const editarPropina = async (id, nuevosDatos) => {
    try { await actualizarPropinaPeticion(id, nuevosDatos); toast.success('Monto actualizado'); cargarDatos(); } catch (e) { toast.error('Error'); }
  };

  // --- HANDLER RESETEO SEMANA ---
  const handleResetearSemana = () => {
    confirmarAccion('¿Seguro que deseas CERRAR LA SEMANA? Los montos volverán a $0 (pero quedarán guardados en el historial general).', async () => {
      try {
        await liquidarSemanaPeticion();
        toast.success('¡Semana reseteada con éxito!');
        cargarDatos(); 
      } catch (error) {
        toast.error('Hubo un error al resetear la semana');
      }
    });
  };

  // --- HANDLER USUARIOS ---
  const borrarUsuario = (id) => {
    confirmarAccion('¿Borrar este usuario y todo su historial?', async () => {
      try {
        await eliminarUsuarioPeticion(id);
        toast.success('Usuario eliminado');
        cargarDatos();
      } catch (e) { toast.error('No se pudo eliminar el usuario'); }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* BANNER DE RESUMEN SEMANAL */}
        <div className="bg-brand-600 text-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <FaCalendarAlt className="text-2xl" />
            </div>
            <div>
              <p className="text-brand-100 text-sm font-medium">{diaFormateado}</p>
              <h2 className="text-2xl font-bold">Total Recaudado: ${granTotalSemana.toFixed(2)}</h2>
            </div>
          </div>
          
          {usuario?.rol === 'admin' && (
            <button 
              onClick={handleResetearSemana}
              className="bg-white text-brand-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition shadow-md flex items-center gap-2"
            >
              <FaCheckDouble /> Cerrar Semana
            </button>
          )}
        </div>

        {/* 1. CARGA PROPINA */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaMoneyBillWave className="text-brand-600"/> Cargar Propina
          </h2>
          <form onSubmit={handleSubmit(onSubmitPropina)} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mozo</label>
              <select {...register("idMozo", { required: true })} className="w-full border rounded-lg p-2 bg-gray-50">
                <option value="">-- Elegir --</option>
                {mozos.map(m => <option key={m._id} value={m._id}>{m.nombre}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monto ($)</label>
              <input type="number" step="0.01" {...register("monto", { required: true, min: 0 })} className="w-full border rounded-lg p-2 bg-gray-50" placeholder="0.00"/>
            </div>
            <button type="submit" className="bg-brand-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-700 transition shadow-md">
              Registrar
            </button>
          </form>
        </div>

        {/* 2. TOTALES POR MOZO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {totales.map((item) => (
            <div key={item._id} className="bg-white p-6 rounded-xl shadow-sm border flex flex-col items-center">
               <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center font-bold text-xl mb-2">
                 {item.nombreMozo?.charAt(0).toUpperCase()}
               </div>
               <h3 className="font-semibold">{item.nombreMozo}</h3>
               <p className="text-2xl font-bold text-brand-700">${item.totalMonto.toFixed(2)}</p>
               <span className="text-xs text-gray-400 mt-1">{item.cantidad} propinas</span>
            </div>
          ))}
        </div>

        {/* 3. HISTORIAL */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
             <FaHistory className="text-gray-500"/> Historial Activo
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-400 text-xs font-bold uppercase">
                  <th className="py-2">Mozo</th>
                  <th className="py-2">Fecha</th>
                  <th className="py-2 text-right">Monto</th>
                  {usuario?.rol === 'admin' && <th className="py-2 text-center">Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {historial.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 border-b last:border-0">
                    <td className="py-3 font-medium">{p.idMozo?.nombre}</td>
                    <td className="py-3 text-sm text-gray-500">{new Date(p.fecha).toLocaleDateString()} {new Date(p.fecha).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                    <td className="py-3 text-right font-bold text-green-600">${p.monto}</td>
                    {usuario?.rol === 'admin' && (
                      <td className="py-3 flex justify-center gap-2">
                        <button onClick={() => { setPropinaSeleccionada(p); setModalOpen(true); }} className="text-blue-500 hover:text-blue-700 p-1" title="Editar">
                           <FaEdit />
                        </button>
                        <button onClick={() => borrarPropina(p._id)} className="text-red-400 hover:text-red-600 p-1" title="Borrar">
                           <FaTrash />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            {historial.length === 0 && <p className="text-center text-gray-500 mt-4">No hay propinas cargadas en esta semana.</p>}
          </div>
        </div>

        {/* 4. GESTIÓN DE EQUIPO (Solo Admin) */}
        {usuario?.rol === 'admin' && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaUsers className="text-gray-500"/> Gestión de Equipo
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-gray-400 text-xs font-bold uppercase">
                    <th className="py-2">Nombre</th>
                    <th className="py-2">Email</th>
                    <th className="py-2 text-center">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {mozos.map((m) => (
                    <tr key={m._id} className="hover:bg-gray-50 border-b last:border-0">
                      <td className="py-3 flex items-center gap-2">
                         <FaUserCog className="text-gray-400"/> {m.nombre}
                      </td>
                      <td className="py-3 text-gray-600">{m.email}</td>
                      <td className="py-3 text-center">
                        <button onClick={() => borrarUsuario(m._id)} className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 bg-red-50 rounded hover:bg-red-100 transition">
                           Eliminar Usuario
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {mozos.length === 0 && <p className="text-center text-gray-500 mt-4">No hay mozos registrados.</p>}
            </div>
          </div>
        )}

      </div>

      <ModalEditarPropina 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        propinaAEditar={propinaSeleccionada} 
        onUpdate={editarPropina} 
      />
    </div>
  );
}

export default DashboardPage;