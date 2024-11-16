import Mongoose from 'mongoose';

interface Identified {
    _id?: Mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}

export interface User extends Identified {
    username: string,
    email: string, 
    password: string
}

export interface Room extends Identified {
    players: User[]
}
