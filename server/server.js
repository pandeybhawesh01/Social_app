import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoute.js';

const app =express()
const port= process.env.PORT|| 4000;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}))//controls which domains can access the server
//APi Endpoints
app.get('/',(req,res)=>{
    res.send("Api working")
})
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})
