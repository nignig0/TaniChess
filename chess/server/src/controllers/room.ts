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
            data: {
                roomId: room._id
            }
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

export const RoomController = {
    createRoom
}
