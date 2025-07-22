import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getUserByEmail, getUserData, updateUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/data',userAuth,getUserData)
userRouter.put('/update', userAuth, updateUser)
userRouter.get('/userbyemail/:email',getUserByEmail)

export default userRouter;