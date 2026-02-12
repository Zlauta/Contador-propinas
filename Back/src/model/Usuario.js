import { Schema, model } from 'mongoose';

const UsuarioSchema = new Schema({
  nombre: { type: String, required: [true, 'El nombre es obligatorio'], trim: true },
  email: { type: String, required: [true, 'El email es obligatorio'], unique: true, trim: true },
  clave: { type: String, required: [true, 'La contraseña es obligatoria'] },
  rol: { type: String, enum: ['admin', 'mozo'], default: 'mozo' },
}, { timestamps: true });

export default model('Usuario', UsuarioSchema);
