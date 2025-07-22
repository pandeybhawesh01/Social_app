
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoutes.js';
import fileUpload from 'express-fileupload';
import botRouter from './routes/botRoutes.js';

const app =express()
const port= process.env.PORT|| 4000;
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-frontend.vercel.app'
];


connectDB();
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With']
}));

// app.options('*', cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
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
app.use('/api/bot',botRouter)

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})
