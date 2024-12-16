import { Lobby } from "../components/Lobby";
import { NavBar } from "../components/navBar";
import '../styles/lobby.css';


export function LobbyPage(){
    return (
        <div className="lobbyDiv"> 
            <NavBar/>
            <h1>The Lobby</h1>
            <p>Choose a game to join</p>
            <Lobby/>
        </div>
    )
}