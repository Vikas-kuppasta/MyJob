import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectedDb from './utils/DB.js';
import userRoute from './routes/userroute.js'
import CompanyRoute from './routes/companyroute.js'
import jobRoute from './routes/jobroute.js'
import ApplicationRoute from './routes/applicationroute.js'
import saveJobRoute from "./routes/savedJobRoute.js"
dotenv.config({});

const app = express();
const PORT =process.env.PORT ||5000;
const corsOptions = {
    origin:[
        'http://localhost:5173',
        "https://hiredly-ten.vercel.app"],
    credentials:true,
}


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors(corsOptions))
// 

app.use('/user',userRoute),
app.use('/user/Company',CompanyRoute),
app.use('/user/job',jobRoute,saveJobRoute),
app.use('/user/application',ApplicationRoute),


app.listen(PORT, () =>{ 
    connectedDb();
console.log(`Server started on port ${PORT}`)});
