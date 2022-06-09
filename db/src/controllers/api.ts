import { Request, Response } from 'express';

export const hello = (request: Request, response: Response) => {
    response.send('API');
};
