import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    industry:{
        type:String,
        required:true,
    },
    companySize:{
        type:String
    },
    foundedYear:{
        type:String
    },
    state:{
        type:String,
        required:true,
    },
    email:{
        type:String
    },
    website:{
        type:String,
    },
    companyProfile:{
        companyLogo: String,
        companyLogoPublicId: String,

        companyBanner: String,
        companyBannerPublicId: String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
},{timestamps:true})

export const Company =  mongoose.model('Company',companySchema);