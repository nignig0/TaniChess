import React, { useState } from 'react';
import { Chess, Piece, Square, Color } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import './../styles/ChessGame.css';


type boardProps = {
    color: string
}

export function ChessGame({color}: boardProps){
    const [game, setGame] = useState(new Chess()); //this initializes the game
    
    const handleMove = (sourceSquare: Square, targetSquare: Square)=>{
        try{
            const playerTurn = color == 'WHITE'? "w": "b";
            const copy = new Chess(game.fen()); //create a copy of the game state
            const move = copy.move({ from: sourceSquare, to: targetSquare }); //make a move in that copy
            if (move == null) return false; //if it is an invlaid move, do nothing
            
            if(game.turn.toString() != playerTurn){
                alert('It is not your turn');
                return true;
            }
            setGame(copy); //change the state
            //send the move to the backend somewhere here
            return true;
        }catch(err:any){
            alert('Invalid move');
            return false;
        }
        
    }

    return (
        <div className='chessboard'>
            <Chessboard
                position = {game.fen()}
                onPieceDrop = {handleMove}
                boardOrientation= {color == 'WHITE' ? 'white' : 'black'}
            />
        </div>
    );
}