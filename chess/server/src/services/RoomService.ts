import { Colors } from "../constants/Colors";
import { RoomStatus } from "../constants/RoomStatus";
import { RoomModel } from "../models";
import { Room } from "../types/types";


const createRoom = async (roomObj: Room)=>{
    const room = await RoomModel.create(roomObj);
    return room;
}

const getActiveRoom = async(roomId: string)=>{
    const room = await RoomModel.findOne({_id: roomId});

    if(!room) throw Error('Room does not exist');
    return room;
}

const joinRoom = async(roomId: string, userId: string)=>{
    const room = await getActiveRoom(roomId);
    if(room.status != RoomStatus.pending) throw Error('You cannot join this room!');
    
    const currentPlayer = room.players[0];

    room.players.push({
        userId: userId, 
        color: (currentPlayer.color == Colors.WHITE) ? Colors.BLACK : Colors.WHITE
    });
    room.save();
}

export const RoomService = {
    createRoom,
    joinRoom
}
