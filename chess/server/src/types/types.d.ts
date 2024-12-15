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
    type: string,
    canPlay?: boolean,
    move?: [string],//a move has two strings starting and ending position
    roomId: Mongoose.Types.ObjectId | string,
    fen?: any
}
