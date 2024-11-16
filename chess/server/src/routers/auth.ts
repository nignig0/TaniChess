import { Router } from 'express';
import { authController } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/register', authController.register); //register controller here

authRouter.post('/login', authController.login)

export default authRouter;
