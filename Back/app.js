import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rutas from './src/routes/index.routes.js';
import { globalErrorHandler } from './src/middlewares/error.middleware.js';
import AppError from './src/utils/AppError.js';

const app = express();

// Middlewares
// Lista blanca dinámica
const allowedOrigins = [
  process.env.FRONTEND_URL, // <--- Tu variable de entorno (Prod)
  "http://localhost:5173"   // <--- Tu entorno local (Dev)
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (como Postman o Server-to-Server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("Bloqueado por CORS:", origin); // Esto te ayuda a ver en los logs de Vercel quién intenta entrar
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // ¡CRÍTICO! Permite pasar cookies/tokens
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
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