import React, { useState } from 'react';
import { Chess, Piece, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import './../styles/ChessGame.css';

export function ChessGame(){
    const [game, setGame] = useState(new Chess()); //this initializes the game
    
    const handleMove = (sourceSquare: Square, targetSquare: Square)=>{
        const copy = new Chess(game.fen()); //create a copy of the game state
        const move = copy.move({ from: sourceSquare, to: targetSquare }); //make a move in that copy
        if (move == null) return false; //if it is an invlaid move, do nothing

        setGame(copy); //change the state
        return true
    }

    return (
        <div className='chessboard'>
            <Chessboard
                position = {game.fen()}
                onPieceDrop = {handleMove}
            />
        </div>
    );
}