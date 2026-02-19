import Usuario from "../model/Usuario.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

export const registrarUsuario = async (datos) => {
  const { nombre, email, clave, rol } = datos;

  if (await Usuario.findOne({ email })) {
    throw new AppError("El correo ya está registrado", 400);
  }

  const hash = await argon2.hash(clave);

  const usuario = await Usuario.create({
    nombre,
    email,
    clave: hash,
    rol,
  });

  return usuario;
};

export const loginUsuario = async (email, clave) => {
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    throw new AppError("Credenciales incorrectas", 401);
  }

  if (!(await argon2.verify(usuario.clave, clave))) {
    throw new AppError("Credenciales incorrectas", 401);
  }

  const token = jwt.sign(
    { id: usuario._id, rol: usuario.rol },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
  );

  return { usuario, token };
};

export const obtenerMozos = async () => {
  return await Usuario.find({ rol: "mozo" }).select("nombre _id email");
};

export const eliminarUsuario = async (id) => {
  const usuario = await Usuario.findByIdAndDelete(id);
  if (!usuario) throw new AppError('Usuario no encontrado', 404);
  return usuario;
};

// NUEVO: Actualizar Usuario (ej: cambiar nombre o rol)
export const actualizarUsuario = async (id, datos) => {
  // Evitar que actualicen la contraseña por aquí (eso requiere hash)
  if (datos.clave) {
     delete datos.clave; 
  }
  
  const usuario = await Usuario.findByIdAndUpdate(id, datos, { new: true });
  if (!usuario) throw new AppError('Usuario no encontrado', 404);
  return usuario;
};