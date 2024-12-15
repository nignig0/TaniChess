import { useEffect, useState } from "react";
import { Game, Message } from "../types";
import { useNavigate } from "react-router-dom";

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
            if (data.type == 'lobby_listener'){
                const newGame: Game = {
                    roomId: data.roomId,
                    player: data.player,
                    color: data.color

                }
                setGames([
                    newGame, 
                    ...games
                ]);
            }else{
                setGames(games.filter((g)=> g.roomId != data.roomId));
            }
            
        });

        return ()=>{
            socket.close();
        };
    }, []);

    const navigate = useNavigate();

    return (
        <div>
            <table>
                <thead>
                <th>Player</th>
                <th>Color</th>
                </thead>
                {games.map((game)=>{
                    return (
                        <tr onClick={()=> navigate(`/${game.roomId}`)}>
                            <td>{game.player}</td>
                            <td>{game.color}</td>
                        </tr>
                    )
                })}
            </table>

        </div>
    );
}