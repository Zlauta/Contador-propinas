import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rutas from './src/routes/index.routes.js';
import { globalErrorHandler } from './src/middlewares/error.middleware.js';
import AppError from './src/utils/appError.js';
import conectarDB from './src/config/db.js';

const app = express();



app.use(cors({
  origin: [
    process.env.FRONTEND_URL, // Tu frontend exacto (sin barra al final)
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  credentials: true
}));

app.options(/(.*)/, cors());

app.use(express.json());
if (process.env.NODE_ENV === 'production') app.use(morgan('dev'));

conectarDB();

// Rutas
app.use('/api', rutas);

// 404
app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`No se encontró la ruta ${req.originalUrl}`, 404));
});

// Manejador de Errores
app.use(globalErrorHandler);

export default app;