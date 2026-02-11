import { Schema, model } from "mongoose";

const propinaSchema = new Schema(
  {
    mozoId: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    monto: { type: Number, required: true },
    fecha: { type: Date, default: Date.now },
    creadoPor: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  },
  {
    timestamps: true,
  },
);

export const Propina = model("Propina", propinaSchema);