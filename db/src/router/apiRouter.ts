import { Router } from 'express';
import * as api from 'controllers/api';

export const apiRouter = Router();

apiRouter.get('/', api.hello);
