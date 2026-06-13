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

    profilePhoto:{type:String,default:""},
    profilePhotoPublicId:{type:String,default:""},

    profileBanner:{type:String,default:""},
    profileBannerPublicId:{type:String,default:""},

    resume:{type:String},
    resumePublicId:{type:String,default:""},
    resumeOriginalname:{type:String},

    phone:{type:String},

    location:{type:String},

    github:{type:String},

    linkedin:{type:String},

    portfolio:{type:String},

    education:[{
        college:String,
        degree:String,
        field:String,
        startYear:Number,
        endYear:Number
    }],

    experience:[{
        company:String,
        position:String,
        startDate:Date,
        endDate:Date,
        description:String
    }],

    projects:[{
        title:String,
        description:String,
        techStack:[String],
        githubLink:String,
        liveLink:String
    }]
}
},{timestamps:true})

export const User = mongoose.model('User',userSchema);