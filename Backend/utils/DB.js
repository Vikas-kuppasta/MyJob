import mongoose from "mongoose";

const connectedDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('db connected');
        
        
    } catch (error) {
        console.log('error '+error);
        
    }
}

export default connectedDb;