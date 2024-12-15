import { useEffect, useRef, useState } from "react";
import { ChessGame } from "../components/ChessGame";
import './../styles/App.css';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE } from "../components/App";
import axios from "axios";


export function GamePage(){

    const socketRef = useRef<WebSocket | null>(null);
    //allows us to make something immutable between child and parent
    //components
    
    const navigate = useNavigate();
    const [waiting, setWaiting] = useState(true);
    const { roomId } = useParams<{roomId: string}>();
    const [color, setColor] = useState<string>('');

    useEffect(()=>{
        socketRef.current = new WebSocket('wss://tanichess.onrender.com');
       socketRef.current.addEventListener('open', ()=>{
        //send a message?
            console.log('Connected to the web socket server');
            socketRef.current!.send(JSON.stringify({
                type: 'init',
                roomId: roomId
            }));
       });

       socketRef.current.addEventListener('message', (event)=>{
        const response = JSON.parse(event.data);
        console.log('New message from the server socket -> ', response);
        const { type } = response;
        if(type == 'init'){
            setWaiting(!response.canPlay);
        }
       });

       //clean up when the component unmounts
       return ()=>{
        socketRef.current!.close();
       };
    }, []); //empty dependency array means I'll do this once when the component renders

    useEffect(()=>{
        //note when you refresh you rejoin the room. Change that on the backend
        //actually join the room
        const joinRoom = async(roomId: String)=>{
            const request = await axios.put(`${API_BASE}/room/${roomId}`);
            const data = request.data.data;
            console.log('The data -> ', data);
            setColor(data.color);
            console.log('The request color -> ', data.color)
            console.log('The players color -> ', color);
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
        color == ''
        ?
        (
        <div>
            <h1>Loading...</h1>
        </div>
        )
        :
        (
            <div className="App">
                <h1>A chess game</h1>
                <ChessGame color={color!} roomId= {roomId!} socket = {socketRef.current!}/>
            </div>
        )
    );
}