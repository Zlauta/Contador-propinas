import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js"; // Nota el .js
import Usuario from "../model/Usuario.js"; // Nota el .js
import catchAsync from "../utils/catchAsync.js";

export const protegerRuta = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("No has iniciado sesión. Por favor ingresa.", 401),
    );
  }

  const decodificado = jwt.verify(token, process.env.JWT_SECRET);
  const usuarioActual = await Usuario.findById(decodificado.id);

  if (!usuarioActual) {
    return next(new AppError("El usuario de este token ya no existe.", 401));
  }

  req.usuario = usuarioActual;
  next();
});

export const restringirA = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return next(
        new AppError("No tienes permiso para realizar esta acción", 403),
      );
    }
    next();
  };
};
