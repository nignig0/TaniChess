import { useEffect, useState } from "react";
import { ChessGame } from "../components/ChessGame";
import './../styles/App.css';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE } from "../components/App";
import axios from "axios";


export function GamePage(){

    const socket = new WebSocket(`ws://${API_BASE}:5000`);
    const navigate = useNavigate();
    const [waiting, setWaiting] = useState(true);
    const { roomId } = useParams<{roomId: string}>();
    let color: string;

    useEffect(()=>{
       socket.addEventListener('open', ()=>{
        //send a message?
            console.log('Connected to the web socket server');
            socket.send(JSON.stringify({
                type: 'join',
                roomId: roomId
            }));
       });

       socket.addEventListener('message', (event)=>{
        const response = JSON.parse(event.data);
        console.log('New message from the server socket -> ', response);
        const { type } = response;
        if(type == 'init'){
            setWaiting(response.canPlay);
        }
       });

       //clean up when the component unmounts
       return ()=>{
        socket.close();
       };
    }, []); //empty dependency array means I'll do this once when the component renders

    useEffect(()=>{
        //actually join the room
        const joinRoom = async(roomId: String)=>{
            const request = await axios.put(`${API_BASE}/${roomId}`);
            const data = request.data;
            console.log('The data -> ', data);
            color = data.color;
        }
        try{
            joinRoom(roomId!)
        }catch(err:any){
            console.log('Error joining room -> ', err);
            alert('There was an error joining the room');
            navigate('/');
        }
        
    }, []);

    
    return (
        waiting?
        (
            <div>
                <h1>Waiting for another player to join</h1>
            </div>
        )
        :
        (
            <div className="App">
                <h1>A chess game</h1>
                <ChessGame color={color!} roomId= {roomId!} socket = {socket}/>
            </div>
        )
    );
}