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
    const [playerTurn, setPlayerTurn] = useState(color === 'WHITE' ? 'w' : 'b');

    useEffect(()=>{
        socket.addEventListener('message', (event)=>{
            const response = JSON.parse(event.data);
            console.log('Reading from the board -> ', response);
            const { type } = response;
            if(type == 'move'){
                const { move } = response;
                const [sourceSquare, targetSquare] = move;
                handleMove(sourceSquare as Square, targetSquare as Square);
            }
        })

        // return () => {
        //     if (socket) {
        //         // Clean up listener in case of unmounting
        //         socket.removeEventListener('message', handleMessage);
        //     }
        // };
    }, [socket])
    
    const handleMove = (sourceSquare: Square, targetSquare: Square)=>{
        try{
            const copy = new Chess(game.fen()); //create a copy of the game state
            console.log('copy turn -> ', copy.turn());
            const move = copy.move({ from: sourceSquare, to: targetSquare }); //make a move in that copy
            if (move == null) return false; //if it is an invlaid move, do nothing
            setGame(copy); //change the state
            setPlayerTurn(copy.turn()); // Update the turn state
            //send the move to the backend somewhere here
            console.log('After move - copy turn -> ', copy.turn());
            return true;
        }catch(err:any){
            console.log('Error making move ->', err);
            //alert('Invalid move');
            return false;
        }
        
    }

    const handlePlayerMove = (sourceSquare: Square, targetSquare: Square)=>{
        try{
            console.log('game turn -> ', game.turn().toString());    
            console.log('player color -> ', color);    
            if(game.turn().toString() != playerTurn){
                //alert('It is not your turn');
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
            console.log('Error making move ->', err);
            //alert('Invalid move');
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