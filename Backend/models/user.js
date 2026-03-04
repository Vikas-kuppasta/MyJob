import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true,
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}]
    }
},{timestamps:true})

export const User = mongoose.model('User',userSchema);