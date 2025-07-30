import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { followUser, getUserByEmail, getUserData, updateUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/data',userAuth,getUserData)
userRouter.put('/update', userAuth, updateUser)
userRouter.get('/userbyemail/:email',getUserByEmail)
userRouter.post('/follow',userAuth,followUser)

export default userRouter;