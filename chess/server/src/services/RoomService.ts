import { Colors } from "../constants/Colors";
import { RoomStatus } from "../constants/RoomStatus";
import { RoomModel } from "../models";
import { Room } from "../types/types";


const createRoom = async (roomObj: Room)=>{
    const room = await RoomModel.create(roomObj);
    return room;
}

const findRoomById = async(roomId: string)=>{
    const room = await RoomModel.findOne({_id: roomId});

    if(!room) throw Error('Room does not exist');
    return room;
}

const joinRoom = async(roomId: string, username?: string)=>{
    const randomNum = Math.floor(Math.random() * 2); //returns only 0 or 1
    const color = (randomNum == 0)? Colors.WHITE : Colors.BLACK;
    const room = await findRoomById(roomId);
    if(room.status != RoomStatus.pending) throw Error('You cannot join this room!');
    
    if(room.players.length == 0){
        room.players.push({
            username: username,
            color: color
        });
        room.save();
        return room.players[0];
    }else{
        const currentPlayer = room.players[0];
        room.players.push({
            username: username, 
            color: (currentPlayer.color == Colors.WHITE) ? Colors.BLACK : Colors.WHITE
        });
        room.status = RoomStatus.active;
        room.save();
        return room.players[1];
    }

    
}

export const RoomService = {
    createRoom,
    joinRoom,
    findRoomById
}
