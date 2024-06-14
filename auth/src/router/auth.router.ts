import { Router } from 'express';

export const authRouter = Router();

authRouter.post('/sign-up', () => {});
authRouter.post('/sign-in', () => {});
authRouter.post('/sign-out', () => {});
authRouter.get('/check', (req, res) => res.send('Hi from check'));
