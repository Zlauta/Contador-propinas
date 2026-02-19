import { crearPropina, obtenerHistorial as obtenerHistorialService, calcularTotalesSemanales, actualizarPropina, eliminarPropina, liquidarSemana } from '../services/propina.service.js';
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

export const liquidar = catchAsync(async (req, res, next) => {
  const resultado = await liquidarSemana();
  res.status(200).json({
    estado: 'success',
    mensaje: `Se resetearon ${resultado.modifiedCount} propinas.`
  });
});

export const eliminar = catchAsync(async (req, res, next) => {
  await eliminarPropina(req.params.id);
  res.status(204).json({ // 204 = No Content
    estado: 'success',
    data: null
  });
});

// NUEVO
export const actualizar = catchAsync(async (req, res, next) => {
  const propina = await actualizarPropina(req.params.id, req.body);
  res.status(200).json({
    estado: 'success',
    data: propina
  });
});