import { RoomModel } from "../models";
import { Room } from "../types/types";


const createRoom = async (roomObj: Room)=>{
    const room = await RoomModel.create(roomObj);
}

export const RoomService = {
    createRoom
}
