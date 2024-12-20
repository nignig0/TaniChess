import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../services/TokenService';
import { JwtPayload } from 'jsonwebtoken';

const handleToken = async(req: Request, res: Response, next: NextFunction)=>{
    const authHeader = req.headers.authorization;
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     return res.status(403).send({
    //         message: "Unauthorized access",
    //     });
    // }
    if(authHeader && authHeader.startsWith('Bearer')){
        const token = authHeader.split(' ')[1];
        const decoded = await TokenService.verifyToken(token);
        console.log('The decoded -> ', decoded);
        req.user = (decoded! as JwtPayload).userId;
    }
    
    // if(!decoded){
    //     res.status(403).send({
    //         message: "Token expired"
    //     });
    //     return;
    // }

    

    next();
    return;
}

export const AuthMiddleware = {
    handleToken
}
