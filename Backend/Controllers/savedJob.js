import {SavedJob} from './../models/SavedJob.js'

export const savejob = async(req,res)=>{
    try {
      const userId = req.id;
      const jobId = req.params.jobId

      if(!jobId||!userId){
        return res.status(400).json({
            message:"something is missing",
            success:false
        });
    };

    const existing = await SavedJob.findOne({
            user:userId,
            job:jobId
        });

        if(existing){
            return res.status(400).json({
                message:"Job is already saved",
                success:false
            });
        };

        const savedJob = await SavedJob.create({
            user:userId,
            job:jobId
        });

        return res.status(200).json({
            message:"Job saved successfully",
            success:true,
            savedJob
        })

    } catch (error) {
        console.log(error);
    }
};

export const getSavedJobs = async(req,res)=>{
    try {
        const userId = req.id;
        const savedJobs = await SavedJob.find({user:userId}).populate({
            path:"job",
            populate:{
                path:"company"
            }
        });
        
        res.status(200).json({
            success:true,
            savedJobs,
        })

    } catch (error) {
        console.log(error);
    }
};