import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectedDb from './utils/DB.js';
dotenv.config({});

const app = express();
const PORT =process.env.PORT ||5000;
const corsOptions = {
    origin:'http//localhost:5173',
    Credentials:true,
}


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors(corsOptions))




app.listen(PORT, () =>{ 
    connectedDb();
console.log(`Server started on port ${PORT}`)});
