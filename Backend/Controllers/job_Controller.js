import {Job} from '../models/jobmodel.js';
import { uploadToCloudinary } from '../utils/helper.js';

export const postjob = async(req,res)=>{
try {
    const {title,description,requirements,salary,location,jobtype,experience,position,companyId,}=req.body; 
    const companyLogo = req.files?.companyLogo?.[0];
    const companyBanner = req.files?.companyBanner?.[0];
    const userId = req.id;
    if(!title||!description||!requirements||!salary||!location||!jobtype||!experience||!position||!companyId){
        return res.status(404).json({
            message:"Something is missing",
            success:false
        })
    };

    let companyLogoUrl ="";
    let companyBannerUrl ="";

    if(companyLogo){
        const result = await uploadToCloudinary(companyLogo.buffer,"CompanyLogo-images");
        companyLogoUrl = result.secure_url;
    };
    if(companyBanner){
        const result = await uploadToCloudinary(companyBanner.buffer,"CompanyBanner-images");
        companyBannerUrl = result.secure_url;
    };


    const job = await Job.create({
        title,
        description,
        requirements:requirements.split(",").map(r=>r.trim()),
        salary:Number(salary),
        location,
        jobtype,
        experience:Number(experience),
        position,
        companyProfile:{
            companyLogo:companyLogoUrl,
            companyBanner: companyBannerUrl,
        },
        company:companyId,
        created_by:userId,
    })

    return res.status(200).json({
        message:"New job created successfully",
        job,
        success:true
    })
} catch (error) {
        console.log(error);
        
    }
};

export const getAlljobs = async(req,res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]
        };
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({
                message:"jobs not found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
};

export const getjobById = async(req,res)=>{
try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if(!job){
        return res.status(404).json({
            message:"job not found",
            success:false
        })
    };
    return res.status(200).json({
        job,
        success:true
    })
} catch (error) {
    console.log(error);
    
}


};

export const getJobsAdmin = async(req,res)=>{
    try {
        const adminId = req.id;
        const jobs = Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}