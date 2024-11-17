import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

const jwtSecret = process.env.JWT_SECRET;

const verifyToken = async(token: string)=>{
    try{
        const decoded = jwt.verify(token, jwtSecret as string);
        return decoded;
    }catch(err: any){
        return null;
    }
    
}

export const TokenService = {
    verifyToken
}

