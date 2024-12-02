import { ChessGame } from "../components/ChessGame";
import './../styles/App.css';

export function GamePage(){
    return (
        <div className="App">
            <h1>A chess game</h1>
            <ChessGame/>
        </div>
    );
}