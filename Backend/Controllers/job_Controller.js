import {Job} from '../models/jobmodel.js';
import { uploadToCloudinary } from '../utils/helper.js';

export const postjob = async(req,res)=>{
try {
    
    const {title,description,requirements,salary,location,jobtype,experience,workmode,companyId,email}=req.body; 
    const userId = req.id;
    if(!title||!description||!requirements||!salary||!location||!jobtype||!experience||!workmode||!companyId){
        return res.status(404).json({
            message:"Something is missing",
            success:false
        })
    };


    const job = await Job.create({
        title,
        description,
        requirements:requirements.split(",").map(r=>r.trim()),
        salary:Number(salary),
        location,
        jobtype,
        experience:Number(experience),
        email,
        workmode,
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
        const{location,jobtype,minSalary,maxSalary,keyword}=req.query;
        const query = {};
        if(keyword){

            query.$or = [
                {
                    title:{
                        $regex:keyword,
                        $options:"i"
                    }
                },
                {
                    description:{
                        $regex:keyword,
                        $options:"i"
                    }
                }
            ];
        }

        // location filter
        if(location){
            query.location = location;
        }

        // jobtype filter
        if(jobtype){
            query.jobtype = jobtype;
        }

        // salary range filter
        if(minSalary && maxSalary){

            query.salary = {
                $gte:Number(minSalary),
                $lte:Number(maxSalary)
            };
        }
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
    const job = await Job.findById(jobId).populate({
        path:"application",
    }).populate("company");
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
        const jobs =await Job.find({created_by:adminId}).populate({path:"application"}).populate("company");
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