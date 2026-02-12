import { registrarUsuario, loginUsuario, obtenerMozos as listarMozosService } from '../services/auth.service.js';
import catchAsync from '../utils/catchAsync.js';

export const registrar = catchAsync(async (req, res, next) => {
  const usuario = await registrarUsuario(req.body);
  res.status(201).json({
    estado: 'success',
    mensaje: 'Usuario creado con éxito',
    data: { id: usuario._id, nombre: usuario.nombre, email: usuario.email }
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, clave } = req.body;
  const { usuario, token } = await loginUsuario(email, clave);
  res.status(200).json({
    estado: 'success',
    token,
    data: { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol }
  });
});

export const obtenerMozos = catchAsync(async (req, res, next) => {
  const mozos = await listarMozosService();
  res.status(200).json({
    estado: 'success',
    results: mozos.length,
    data: mozos
  });
});