import { Router } from 'express';
import { authRouter } from './auth.router';

export const router = Router({ mergeParams: true });

router.use('/auth', authRouter);
