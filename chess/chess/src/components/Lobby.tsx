import { useEffect, useState } from "react";
import { Game, Message } from "../types";

export function Lobby(){
    const [games, setGames] = useState<Game[]>([]);
    //games has a list of room objects

    const socket = new WebSocket('wss://tanichess.onrender.com');

    useEffect(()=>{
        //we want to set an event listener for when a new game is created
        //or when someone has joined a game

        socket.addEventListener('open', ()=>{
            //open event is when a connection has been created
            const message: Message = {
                type: 'lobby_listener'
            };
            socket.send(JSON.stringify(message));
        });

        socket.addEventListener('message', (event)=>{
            const data = JSON.parse(event.data);
            console.log('Lobby Listener Message recieved -> ', data);
            //create the game fromm the data
            //add it to the list of games
            setGames([
                ...games
            ])
        });

        return ()=>{
            socket.close();
        };
    }, []);
}