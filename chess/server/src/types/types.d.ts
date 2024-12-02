import Mongoose from 'mongoose';

interface Identified {
    _id?: Mongoose.Types.ObjectId,
    createdAt?: Date,
    updatedAt?: Date
}

export interface User extends Identified {
    username: string,
    email: string, 
    password: string
}


export interface Room extends Identified {
    players: {
        userId?: string,
        color: string
    }[],
    status: string,
}

export interface Message {
    move: string,
    roomId: Mongoose.Types.ObjectId | string,
    metadata?: any
}
