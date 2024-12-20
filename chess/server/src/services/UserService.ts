import { UserModel } from "../models"

const createUser = async (username: string, email: string, password: string)=>{
    const user = await UserModel.create({
        username: username, 
        email: email, //should add soome email validation
        password: password //should also add some password validation
    });
    return user;
}

const findByUsername = async (username: string)=>{
    const user = await UserModel.findOne({username: username});
    return user;
}

const findById = async (userId: string)=>{
    const user = await UserModel.findOne({_id: userId});
    return user;
}

const doesUserExist = async(username: string, email: string)=>{
    const user = await UserModel.findOne({
        $or: [{
            username: username
        }, {
            email: email
        }]
    });

    return user != null;
}

export const UserService = {
    createUser,
    findByUsername,
    findById,
    doesUserExist
}
