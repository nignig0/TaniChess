import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../services/TokenService';

const requireUser = async(req: Request, res: Response, next: NextFunction)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send({
            message: "Unauthorized access",
        });
    }

    const token = authHeader.split(' ')[1];
    const decoded = await TokenService.verifyToken(token);
    if(!decoded){
        res.status(403).send({
            message: "Token expired"
        });
        return;
    }

    req.user = decoded;

    next();
    return;
}

export const AuthMiddleware = {
    requireUser
}
