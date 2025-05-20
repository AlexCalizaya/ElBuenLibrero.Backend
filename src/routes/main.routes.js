import { Router } from 'express';
import bookRoutes from './book.routes.js';
import clientRoutes from './client.routes.js';
import orderRoutes from './client.routes.js';
import detailRoutes from './client.routes.js';

const router = Router();

// Rutas principales
router.use('/books', bookRoutes);
router.use('/clients', clientRoutes);
router.use('/orders', orderRoutes);
router.use('/details', detailRoutes);

export default router;
