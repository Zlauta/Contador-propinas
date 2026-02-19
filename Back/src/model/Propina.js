import { Schema, model } from 'mongoose';

const PropinaSchema = new Schema({
  idMozo: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
  creadoPor: { type: Schema.Types.ObjectId, ref: 'Usuario' },
  liquidada: { type: Boolean, default: false }
}, { timestamps: true });

export default model('Propina', PropinaSchema);