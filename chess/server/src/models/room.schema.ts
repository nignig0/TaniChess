import { model, Schema } from "mongoose";
import { Room } from "../types/types";
import { RoomStatus } from "../constants/RoomStatus";

const RoomSchema = new Schema<Room>({
    status: {
        type: String, 
        enum: RoomStatus,
        default: RoomStatus.pending
    },
    players: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: false
        }, 
        color: {
            type: String, 
            required: true
        }
    }]
});

export const RoomModel = model<Room>('room', RoomSchema);
