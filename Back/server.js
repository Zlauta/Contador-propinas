import dotenv from 'dotenv';
dotenv.config(); // Cargar variables de entorno al principio

import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});