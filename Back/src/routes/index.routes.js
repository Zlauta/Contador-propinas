import { Router } from 'express';
import authRoutes from './auth.routes.js';
import propinaRoutes from './propina.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/propinas', propinaRoutes);

export default router;