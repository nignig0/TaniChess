import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserService } from '../services/UserService';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const register = async(req: Request, res: Response)=>{
    try{
        const { username, email, password, passwordConfirm } = req.body;
        if(!username || !email || !password || !passwordConfirm){
            res.status(400).send({
                message: "Enter your username, email and both password fields"
            });
            return;
        }

        if(password != passwordConfirm){
            res.status(400).send({
                message: "The password's do not match"
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserService.createUser(username, email, hashedPassword);
        

        const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET as string, { expiresIn: '24h' });

        res.status(200).send({
            message: 'Successfully registered user',
            data: {
                token: token,
                expires: (24*60*60)
            }
        });
        return;

    }catch(err: any){
        console.log('Error registering user ->', err);
        res.status(500).send({
            message: 'Error registering user'
        });
        return;
    }
}

const login = async (req: Request, res: Response)=>{
    try{
        const { username, password } = req.body;
        if(!username || !password){
            res.status(400).send({
                message: "Enter Password and Username"
            });
            return;
        }

        const user = await UserService.findByUsername(username);
        if(!user){
            console.log(`User with username ${username} does not exist`);
            res.status(404).send({
                message: `User with username ${username} does not exist`
            });
            return;
        }

        const isPasswordSame = await bcrypt.compare(password, user!.password);
        
        if(!isPasswordSame){
            res.status(400).send({
                message: "Password Incorrect"
            });
            return;
        }

        const token = jwt.sign({ userId: user!._id.toString() }, process.env.JWT_SECRET as string, { expiresIn: '24h' });

        res.status(200).send({
            message: "Successfully logged in",
            data: {
                token: token,
                expires: (24*60*60)
            }
        });
        return;

    }catch(err: any){
        console.log('Error registering user ->', err);
        res.status(500).send({
            message: 'Error login in!'
        });
        return;
    }
}

export const authController = {
    login, 
    register
}
