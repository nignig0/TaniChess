import { Router } from 'express';
import { RoomController } from '../controllers/room';

const roomRouter = Router();

roomRouter.post('/', RoomController.createRoom);
roomRouter.put('/:roomId', RoomController.joinRoom);

export default roomRouter;