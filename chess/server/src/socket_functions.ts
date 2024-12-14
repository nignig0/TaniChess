import { Message } from "./types/types";
import WebSocket from 'ws';

export const init = (ws: WebSocket, roomId: string, clients: Map<String, WebSocket[]>)=>{
    if(!clients.has(roomId)) clients.set(roomId, []);
    
    clients.get(roomId)!.push(ws);

        let message: Message;
        if(clients.get(roomId)!.length < 2){
            message = {
                type: 'init',
                roomId: roomId,
                canPlay: false
            };
        }else{
            message = {
                type: 'init',
                roomId: roomId,
                canPlay: true
            }
        }

    return message;           
}

export const propagateMessage = (roomId: String, clients: Map<String, WebSocket[]>, message: Message)=>{
    const sockets = clients.get(roomId);
    if(!sockets){
        console.log('This room does not exist');
        return;
    }

    for(const socket of sockets){
        socket.send(JSON.stringify(message));
    }

}
