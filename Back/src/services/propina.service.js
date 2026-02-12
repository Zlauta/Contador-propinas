import Propina from '../model/Propina.js';
import AppError from '../utils/appError.js';

export const crearPropina = async (datos) => {
  if (datos.monto < 0) throw new AppError('El monto no puede ser negativo', 400);
  return await Propina.create(datos);
};

export const obtenerHistorial = async () => {
  return await Propina.find()
    .populate('idMozo', 'nombre email')
    .populate('creadoPor', 'nombre')
    .sort({ createdAt: -1 });
};

export const calcularTotalesSemanales = async () => {
  return await Propina.aggregate([
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