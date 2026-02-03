import {Company} from '../models/Company_model.js';
import mongoose from 'mongoose';

export const registerCompany = async(req,res)=>{
try {
    const {companyname} = req.body;
    if(!companyname){
        return res.status(400).json({
            message:"Company name is required",
            success:false
        });
    };
    let company = await Company.findOne({name:companyname});
    if(company){
        return res.status(400).json({
            message:"you can't register with same name",
            success:false
        })
    };

    company =await Company.create({
        name:companyname,
        userId:req.id
    });

    return res.status(201).json({
        message:"Company registered successfully",
        company,
        success:true
    })
    
} catch (error) {
    console.log(error);
    
}
};

export const getCompany  = async(req,res)=>{
    try {
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success:false
            })
        };

        return res.status(200).json({
            companies,
            success:true
        })

    } catch (error) {
        console.log(error);
    };
};

export const getCompanyId = async(req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        };

        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
};

export const updateCompany = async(req,res)=>{
    try {
        const {name,website,location,description} = req.body;
        const updateData = {name,website,location,description};
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});
        if(!updatedCompany){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        };

        return res.status(200).json({
            message:"Company information updated",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}