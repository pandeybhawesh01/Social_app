import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoutes.js';
import fileUpload from 'express-fileupload';

const app =express()
const port= process.env.PORT|| 4000;
const allowedOrigins=['http://localhost:5173']

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins,credentials:true}))//controls which domains can access the server
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: './tmp'
}))
//APi Endpoints
app.get('/',(req,res)=>{
    res.send("Api working")
})
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})
