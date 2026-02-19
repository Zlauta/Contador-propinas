import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rutas from './src/routes/index.routes.js';
import { globalErrorHandler } from './src/middlewares/error.middleware.js';
import AppError from './src/utils/appError.js';

const app = express();

// Middlewares
// Lista blanca dinámica
app.use((req, res, next) => {
  // Permitir origen específico (ajusta la URL a la de tu front)
  const allowedOrigins = ['https://bonafide-front.vercel.app', 'http://localhost:5173'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Si es una petición OPTIONS (Preflight), respondemos OK y terminamos aquí
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});
// -------------------------------------------------------------
app.use(express.json());
if (process.env.NODE_ENV === 'production') app.use(morgan('dev'));

// Rutas
app.use('/api', rutas);

// 404
app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`No se encontró la ruta ${req.originalUrl}`, 404));
});

// Manejador de Errores
app.use(globalErrorHandler);

export default app;