import { Router } from 'express';
import ProductRoutes from './products';
import CategoriesRoutes from './categories';
import AuthenticationRoutes from './authenticate';
import UserRoutes from './users';

const secureRoutes = new Router();
const publicRoutes = new Router();

publicRoutes.use('/', AuthenticationRoutes);

secureRoutes.use('/products', ProductRoutes);
secureRoutes.use('/categories', CategoriesRoutes);
secureRoutes.use('/users', UserRoutes);

export {
  publicRoutes,
  secureRoutes,
};