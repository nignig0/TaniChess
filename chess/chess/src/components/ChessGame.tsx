import React, { useEffect, useState } from 'react';
import { Chess, Piece, Square, Color } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import './../styles/ChessGame.css';


type boardProps = {
    color: string,
    roomId: string,
    socket: WebSocket
}

export function ChessGame({color, roomId, socket}: boardProps){
    const [game, setGame] = useState(new Chess()); //this initializes the game

    useEffect(()=>{
        socket.addEventListener('message', (event)=>{
            const response = JSON.parse(event.data);
            const { type } = response;
            if(type == 'move'){
                const { move } = response;
                const [sourceSquare, targetSquare] = move;
                handleMove(sourceSquare as Square, targetSquare as Square);
            }
        })
    }, [])
    
    const handleMove = (sourceSquare: Square, targetSquare: Square)=>{
        try{
            const copy = new Chess(game.fen()); //create a copy of the game state
            const move = copy.move({ from: sourceSquare, to: targetSquare }); //make a move in that copy
            if (move == null) return false; //if it is an invlaid move, do nothing
            setGame(copy); //change the state
            //send the move to the backend somewhere here
            return true;
        }catch(err:any){
            alert('Invalid move');
            return false;
        }
        
    }

    const handlePlayerMove = (sourceSquare: Square, targetSquare: Square)=>{
        try{
            const playerTurn = color == 'WHITE'? "w": "b";          
            if(game.turn.toString() != playerTurn){
                alert('It is not your turn');
                return true;
            }
            socket.send(JSON.stringify({
                type: 'move', 
                move: [sourceSquare, targetSquare],
                roomId: roomId
            }));
            //send the move
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
                onPieceDrop = {handlePlayerMove}
                boardOrientation= {color == 'WHITE' ? 'white' : 'black'}
            />
        </div>
    );
}