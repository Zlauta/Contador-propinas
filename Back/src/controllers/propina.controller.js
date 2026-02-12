import { crearPropina, obtenerHistorial as obtenerHistorialService, calcularTotalesSemanales } from '../services/propina.service.js';
import catchAsync from '../utils/catchAsync.js';

export const crear = catchAsync(async (req, res, next) => {
  const datos = { ...req.body, creadoPor: req.usuario.id };
  const propina = await crearPropina(datos);
  res.status(201).json({
    estado: 'success',
    data: propina
  });
});

export const obtenerHistorial = catchAsync(async (req, res, next) => {
  const historial = await obtenerHistorialService();
  res.status(200).json({
    estado: 'success',
    results: historial.length,
    data: historial
  });
});

export const obtenerTotales = catchAsync(async (req, res, next) => {
  const totales = await calcularTotalesSemanales();
  res.status(200).json({
    estado: 'success',
    data: totales
  });
});