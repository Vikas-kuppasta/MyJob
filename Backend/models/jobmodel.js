
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    requirements:[{
        type:String,
        required:true,
    }],
    salary:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    jobtype:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    experience:{
        type:Number,
        required:true
    },
    workmode:{
        type:String,
        required:true
    },
    
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true,
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true,
    },
    application:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Application',
        }
    ]
},{timestamps:true});

export const Job = mongoose.model('Job',jobSchema);