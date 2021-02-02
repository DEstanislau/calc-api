import { Router } from 'express';
import CalcController from './app/Controllers/CalcController';

const routes = new Router();

routes.post('/calc', CalcController.store);

export default routes;
