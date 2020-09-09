import { Router } from 'express';
import Controller from './controller';

const router = new Router();

router.get('/', (req, res, next) => {
  return Controller.getCategories(req, res, next);
});

export default router;