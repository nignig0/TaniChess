import { Router } from 'express';
import { RoomController } from '../controllers/room';
import { AuthMiddleware } from '../middleware/authMiddleware';

const roomRouter = Router();

roomRouter.post('/', RoomController.createRoom);
roomRouter.put('/:roomId', [AuthMiddleware.handleToken, RoomController.joinRoom]);

export default roomRouter;