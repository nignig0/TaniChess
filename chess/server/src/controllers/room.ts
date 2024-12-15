import { Request, Response } from 'express';
import { Room } from '../types/types';
import { RoomStatus } from '../constants/RoomStatus';
import { RoomService } from '../services/RoomService';
import { Colors } from '../constants/Colors';
import { UserService } from '../services/UserService';

const createRoom = async(req: Request, res: Response)=>{
    try{
        const roomObj: Room = {
            players: [],
            status: RoomStatus.pending
        };

        const room = await RoomService.createRoom(roomObj);

        res.status(200).send({
            message: 'Success creating room!', 
            data: room
        });
        return;
    }catch(err: any){
        console.log('Error creating room ->', err);
        res.status(500).send({
            message: 'There was an error creating the room'
        });
        return;
    }
}

const joinRoom = async(req: Request, res: Response)=>{
    try{
        const { roomId } = req.params;
        const userId = req.user;
        let username = 'Anonymous';

        if(userId){
            const user = await UserService.findById(userId);
            username = user!.username;
        }
        const { color } = req.body; 
        const playerData = await RoomService.joinRoom(roomId, username, color);

        res.status(200).send({
            message: 'Successfully joined room',
            data: playerData
        });
        return;

    }catch(err: any){
        console.log('Error Joining Room -> ', err);
        res.status(500).send({
            message: err.message
        });
        return;
    }
}


export const RoomController = {
    createRoom,
    joinRoom
}
