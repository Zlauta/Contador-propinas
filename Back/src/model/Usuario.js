import { Schema, model } from "mongoose";

const usuarioSchema = new Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contrasenia: { type: String, required: true },
    rol : { type: String, enum: ["admin", "mozo"], default: "mozo" },
    propinas: [{ type: Schema.Types.ObjectId, ref: "Propina" }],

  },
  {
    timestamps: true,
  },
);

export const Usuario = model("Usuario", usuarioSchema);
