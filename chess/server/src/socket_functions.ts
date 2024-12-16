import { MessageTypes } from "./constants/sockets";
import { Message } from "./types/types";
import WebSocket from 'ws';

export const init = (ws: WebSocket, roomId: string, clients: Map<String, WebSocket[]>, socketToRoomMap: Map<WebSocket, string[]>, player: string = 'Anonymous')=>{
    if(!clients.has(roomId)) clients.set(roomId, []);
    
    clients.get(roomId)!.push(ws);

    let message: Message;
    if(clients.get(roomId)!.length < 2){
        message = {
            type: 'init',
            roomId: roomId,
            canPlay: false,
            player: player
        };
    }else{
        message = {
            type: 'init',
            roomId: roomId,
            canPlay: true,
            player: player
        };
    }

    if(!socketToRoomMap.has(ws)) socketToRoomMap.set(ws, []);
    socketToRoomMap.get(ws)!.push(roomId);

    return message;           
}

export const propagateMessage = (key: string, clients: Map<string, WebSocket[]>, message: Message)=>{
    //key can be a roomId or something else
    const sockets = clients.get(key);
    if(!sockets){
        console.log('This room does not exist');
        return;
    }

    for(const socket of sockets){
        socket.send(JSON.stringify(message));
    }

}

export const handleLobbyListeners = (client: Map<string, WebSocket[]>, socket: WebSocket, messages: Message[])=>{
    client.get(MessageTypes.LOBBY_LISTENER)!.push(socket);
    const message = JSON.stringify({
        type: MessageTypes.LOBBY_LISTENER,
        lobbyGames: messages
    });
    socket.send(message); //get the socket up to speed
}

export const propagateLobbyGames = (clients: Map<string, WebSocket[]>, messages: Message[])=>{
    for(const client of clients.get(MessageTypes.LOBBY_LISTENER)!){
        const message = JSON.stringify({
            type: MessageTypes.LOBBY_LISTENER,
            lobbyGames: messages
        });
        client.send(message);
    }
}
