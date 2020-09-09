import { Router } from 'express';
import Controller from './controller';
import trycatchWrapper from '@utils/trycatchWrapper';

const router = new Router();

router.post('/signup', trycatchWrapper(async (req, res, next) => {
  return await Controller.signUp(req, res, next);
}));

export default router;