import { Router } from 'express';
import { registrar, login, obtenerMozos } from '../controllers/auth.controller.js';
import { protegerRuta } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/registrar', registrar);
router.post('/login', login);
router.get('/mozos', protegerRuta, obtenerMozos);

export default router;