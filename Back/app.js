import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rutas from './src/routes/index.routes.js';
import { globalErrorHandler } from './src/middlewares/error.middleware.js';
import AppError from './src/utils/AppError.js';

const app = express();

// Middlewares
app.use(cors({
  origin: [
    process.env.FRONTEND_URL, // Para desarrollo local
    process.env.VERCEL_URL // ⚠️ AQUÍ IRÁ TU URL DE VERCEL CUANDO LA TENGAS
  ],
  credentials: true // Importante para cookies/tokens
}));
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