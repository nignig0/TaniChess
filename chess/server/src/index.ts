import express, { Request, Response} from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routers/auth';
import roomRouter from './routers/room';

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

wss.on('connection', (ws: WebSocket)=>{
    console.log("New web socket connection!");

    ws.on('message', (message: WebSocket.Data)=>{
        //process what happens here
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

app.listen(port, ()=>{
    console.log(`Listening on port ${port}. Let's go chess server`)
})

app.use('/auth', authRouter);
app.use('/room', roomRouter);