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
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalname:{type:String},
        profilePhoto:{type:String,default:""},
        profilePhotoPublicId:{type:String,default:""},
        profileBanner:{type:String,default:""},
        profileBannerPublicId:{type:String,default:""}
    }
},{timestamps:true})

export const User = mongoose.model('User',userSchema);