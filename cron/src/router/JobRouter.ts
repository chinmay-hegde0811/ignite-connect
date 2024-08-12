import { Router } from 'express';
import cron from '../controller/JobController';

const jobRouter: Router = Router();

jobRouter.post('/', (req, res, next) => {
  try {
    cron(req, res);
  } catch (error) {
    next(error);
  }
});

export default jobRouter;
