import Propina from '../model/Propina.js';
import AppError from '../utils/AppError.js';

// --- UTILIDAD: Calcular rango de fechas (Semana Sábado a Sábado) ---
const obtenerRangoSemanaActual = () => {
  const hoy = new Date();
  const diaSemana = hoy.getDay(); // 0 (Domingo) a 6 (Sábado)

  // Queremos que la semana empiece el Sábado pasado (o hoy si es sábado)
  // Si es Sábado (6) -> restamos 0 días.
  // Si es Domingo (0) -> restamos 1 día.
  // Si es Lunes (1) -> restamos 2 días...
  // Fórmula: (diaSemana + 1) % 7 es cuantos días pasaron desde el sábado.
  const diasDesdeSabado = (diaSemana + 1) % 7;

  const inicio = new Date(hoy);
  inicio.setDate(hoy.getDate() - diasDesdeSabado);
  inicio.setHours(0, 0, 0, 0); // Sábado 00:00:00

  const fin = new Date(inicio);
  fin.setDate(inicio.getDate() + 7); // Próximo Sábado 00:00:00

  return { inicio, fin };
};

// --- CRUD ---

export const crearPropina = async (datos) => {
  if (datos.monto < 0) throw new AppError('El monto no puede ser negativo', 400);
  return await Propina.create(datos);
};

// Modificado: Ahora filtra por la semana actual
export const obtenerHistorial = async () => {
  const { inicio, fin } = obtenerRangoSemanaActual();
  
  return await Propina.find({
    fecha: { $gte: inicio, $lt: fin } // Solo traer datos entre Sábado y Sábado
  })
    .populate('idMozo', 'nombre email')
    .populate('creadoPor', 'nombre')
    .sort({ createdAt: -1 });
};

// Modificado: Ahora calcula totales solo de esta semana
export const calcularTotalesSemanales = async () => {
  const { inicio, fin } = obtenerRangoSemanaActual();

  return await Propina.aggregate([
    {
      $match: {
        fecha: { $gte: inicio, $lt: fin } // FILTRO CLAVE: Solo semana actual
      }
    },
    {
      $group: {
        _id: "$idMozo",
        totalMonto: { $sum: "$monto" },
        cantidad: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "usuarios",
        localField: "_id",
        foreignField: "_id",
        as: "infoMozo"
      }
    },
    {
      $project: {
        nombreMozo: { $arrayElemAt: ["$infoMozo.nombre", 0] },
        totalMonto: 1,
        cantidad: 1
      }
    }
  ]);
};

// NUEVO: Eliminar Propina
export const eliminarPropina = async (id) => {
  const propina = await Propina.findByIdAndDelete(id);
  if (!propina) throw new AppError('No se encontró la propina con ese ID', 404);
  return propina;
};

// NUEVO: Actualizar Propina
export const actualizarPropina = async (id, datos) => {
  const propina = await Propina.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
  if (!propina) throw new AppError('No se encontró la propina', 404);
  return propina;
};