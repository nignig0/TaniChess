import express, { Request, Response} from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routers/auth';
import roomRouter from './routers/room';
import { handleLobbyListeners, init, propagateMessage } from './socket_functions';
import cors from 'cors';
import { Message } from './types/types';
import { MessageTypes } from './constants/sockets';
import { RoomService } from './services/RoomService';
import e from 'express';

dotenv.config();


const mongoUri = process.env.MONGO_URI as string; // Type assertion for TypeScript
mongoose.connect(mongoUri)
.then(()=> console.log('Connected Boyyy'))
.catch((e)=> console.log('Error connecting to the db ->', e));


const app = express();
app.use(express.json());
const port = 5000;

const server = http.createServer(app);

const wss = new WebSocketServer({server});
const clients = new Map<string, WebSocket[]>();

wss.on('connection', (ws: WebSocket)=>{
    console.log("New web socket connection!");

    ws.on('message', async (message: WebSocket.Data)=>{
        //process what happens here
        const rawData = JSON.parse(message.toString());
        const data: Message = {
            type: rawData.type,
            canPlay: rawData.canPlay,
            move: rawData.move,
            roomId: rawData.roomId,
            fen: rawData.fen
        };
        console.log('The message -> ', data);
        const { type, roomId } = data;

        if(type == 'init'){
            const message = init(ws, roomId!, clients);
            propagateMessage(roomId!, clients, message);
            const room = await RoomService.findRoomById(roomId!);

            let gameResponse:Message;

            if(room!.players.length == 1){
                gameResponse = {
                    type: MessageTypes.LOBBY_LISTENER,
                    player: room!.players[0].username ?? "Anonymous",
                    roomId: roomId,
                    color: room!.players[0].color
                }
            }else{
                gameResponse = {
                    type: MessageTypes.GAME_REMOVE,
                    roomId: roomId
                }
            }

            //if there is only one person in the room
            //send to all the lobby listeners
            //if someone else has joined the room
            //then send a message to remove from the lobby

            propagateMessage(MessageTypes.LOBBY_LISTENER, clients, gameResponse);
        }else if(type == 'move'){
            //we'll work on saving moves tomorrow
            const { move, fen } = data;
            const message: Message = {
                type: 'move',
                move: move,
                roomId: roomId,
                fen: fen
            };
            propagateMessage(roomId!, clients, message);
        }else if(type == MessageTypes.LOBBY_LISTENER){
            handleLobbyListeners(clients, ws);
        }
    });

    ws.on('close', ()=>{
        console.log("Connection closed");
        //handle what happens if the client closes the connection 
        //or there's an error and the connection has to be closed.
    });
})

app.get('/', async(req: Request, res: Response)=>{
    res.send("Let the chess begin!");
})

const corsOptions = {
    origin: 'http://localhost:3000',  // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT'],        // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
  };
  
  // Use the CORS middleware
  app.use(cors(corsOptions));

server.listen(port, ()=>{
    console.log(`Listening on port ${port}. Let's go chess server`)
})

app.use('/auth', authRouter);
app.use('/room', roomRouter);