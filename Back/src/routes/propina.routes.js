import { Router } from 'express';
import { crear, obtenerHistorial, obtenerTotales } from '../controllers/propina.controller.js';
import { protegerRuta, restringirA } from '../middlewares/auth.middleware.js';

const router = Router();

// Middleware global para este router
router.use(protegerRuta);

router.get('/', obtenerHistorial);
router.get('/totales', obtenerTotales);
router.post('/', restringirA('admin'), crear);

export default router;