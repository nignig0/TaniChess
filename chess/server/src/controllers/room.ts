import { Request, Response } from 'express';
import { Room } from '../types/types';
import { RoomStatus } from '../constants/RoomStatus';
import { RoomService } from '../services/RoomService';
import { Colors } from '../constants/Colors';

const createRoom = async(req: Request, res: Response)=>{
    try{
        const roomObj: Room = {
            players: [{
                userId: req.user as string,
                color: Colors.WHITE
            }],
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
        const playerData = await RoomService.joinRoom(roomId, userId);

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
