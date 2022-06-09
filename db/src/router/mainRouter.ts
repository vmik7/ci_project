import { Request, Response, Router } from 'express';

export const mainRouter = Router();

mainRouter.get('/', (request: Request, response: Response) => {
    response.send('Hello');
});
