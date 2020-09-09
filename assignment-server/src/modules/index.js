import { Router } from 'express';
import ProductRoutes from './products';
import CategoriesRoutes from './categories';
import AuthenticationRoutes from './authenticate';

const router = new Router();

router.use('/products', ProductRoutes);
router.use('/categories', CategoriesRoutes);
router.use('/', AuthenticationRoutes);

export default router;