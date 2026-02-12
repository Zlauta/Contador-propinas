import dotenv from 'dotenv';
dotenv.config(); // Cargar variables de entorno al principio

import app from './app.js';
import conectarDB from './src/config/db.js';

// Conectar DB
conectarDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});