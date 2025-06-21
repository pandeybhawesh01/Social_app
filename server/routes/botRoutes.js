import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { addChat, createChat, deleteChat, getChats } from '../controllers/botController.js';

const botRouter = express.Router();

botRouter.get('/chats/', userAuth, getChats);
botRouter.post('/createChat',userAuth,createChat)
botRouter.post('/addChat/:chatId',userAuth,addChat)
botRouter.delete('/deleteChat',userAuth,deleteChat)

export default botRouter;
