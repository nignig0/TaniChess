import { Lobby } from "../components/Lobby";
import '../styles/lobby.css';


export function LobbyPage(){
    return (
        <div className="lobbyDiv">
            <h1>The Lobby</h1>
            <p>Choose a game to join</p>
            <Lobby/>
        </div>
    )
}