import { Router } from 'express';
import { registrar, login, obtenerMozos, eliminarUser, actualizarUser } from '../controllers/auth.controller.js';
import { protegerRuta, restringirA } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/registrar', registrar);
router.post('/login', login);
router.put('/:id', protegerRuta, restringirA('admin'), actualizarUser);
router.delete('/:id', protegerRuta, restringirA('admin'), eliminarUser);
router.get('/mozos', protegerRuta, obtenerMozos);

export default router;