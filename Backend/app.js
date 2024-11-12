import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connection } from './DB_connect.js';
import { errorHandler } from './middlewares/errorHandler.js';
import userRouter from './routes/userRoutes.js';


const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true,
  }));


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/user', userRouter);

connection();
app.use(errorHandler);

export default app;