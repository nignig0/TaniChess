import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../services/TokenService';

const requireUser = async(req: Request, res: Response, next: NextFunction)=>{
    const token = req.headers.authorization;
    if(!token){
        res.status(403).send({
            message: "Unauthorised access"
        });
        return;
    }

    const decoded = await TokenService.verifyToken(token);
    if(!decoded){
        res.status(403).send({
            message: "Token expired"
        });
        return;
    }

    next();
    return;
}

export const AuthMiddleware = {
    requireUser
}
