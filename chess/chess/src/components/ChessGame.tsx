import React, { useEffect, useState } from 'react';
import { Chess, Piece, Square, Color } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import './../styles/ChessGame.css';
import { useNavigate } from 'react-router-dom';


type boardProps = {
    color: string,
    roomId: string,
    socket: WebSocket
}

export function ChessGame({color, roomId, socket}: boardProps){
    const [game, setGame] = useState(new Chess()); //this initializes the game
    const navigate = useNavigate();
    
    useEffect(()=>{
        socket.addEventListener('message', (event)=>{
            const response = JSON.parse(event.data);
            console.log('Reading from the board -> ', response);
            const { type } = response;
            if(type == 'move'){
                const { move, fen } = response;
                const [sourceSquare, targetSquare] = move;
                handleMove(sourceSquare as Square, targetSquare as Square, fen);
            }
        })

        // return () => {
        //     if (socket) {
        //         // Clean up listener in case of unmounting
        //         socket.removeEventListener('message', handleMessage);
        //     }
        // };
    }, [socket])
    
    const handleMove = (sourceSquare: Square, targetSquare: Square, fen: any)=>{
        try{
            const copy = new Chess(fen); //create a copy of the game state
            //the game state is gotten from the server
            //the server is the holder of truth
            console.log('copy turn -> ', copy.turn());
            const move = copy.move({ from: sourceSquare, to: targetSquare }); //make a move in that copy
            if (move == null) return false; //if it is an invlaid move, do nothing
            setGame(copy); //change the state
            //send the move to the backend somewhere here
            console.log('After move - copy turn -> ', copy.turn());
            if(copy.isCheckmate()){
                const colorCode = (color == 'WHITE' ? 'w' : 'b'); 
                const message = (copy.turn()!= colorCode) ? 'Congratulations! You won' : 'Game over! Better luck next time';
                alert(message);
                navigate('/'); //navigate to home... wherever this is
            }
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
            const colorCode = (color == 'WHITE' ? 'w' : 'b');   
            if(game.turn().toString() != colorCode){
                //alert('It is not your turn');
                return false;
            }
    
            
            handleMove(sourceSquare, targetSquare, game.fen()); //optimistically update the game

            socket.send(JSON.stringify({
                type: 'move', 
                move: [sourceSquare, targetSquare],
                roomId: roomId,
                fen: game.fen()
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