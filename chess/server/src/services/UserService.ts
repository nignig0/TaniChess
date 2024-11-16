import { UserModel } from "../models"

const createUser = async (username: string, email: string, password: string)=>{
    const user = await UserModel.create({
        username: username, 
        email: email,
        password: password
    });
    return user;
}

const findByUsername = async (username: string)=>{
    const user = await UserModel.findOne({username: username});
    return user;
}

export const UserService = {
    createUser,
    findByUsername
}
