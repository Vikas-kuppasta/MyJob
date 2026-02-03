import {User} from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async(req,res)=>{
    try {
        const {firstname,email,password,role} = req.body;
        if(!firstname || !email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            });
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"user already exist",
                success:false,
            })
        }
        const hashedpassword = await bcrypt.hash(password,10);

       await User.create({
        firstname,
        email,
        password:hashedpassword,
        role,
       })

       return res.status(201).json({
        message:"Account created successfully",
        success:true
       });

    } catch (error) {
        return res.json({message:error});        
    }
};

export const login  = async(req,res)=>{
    try {
        const {email,password,role} = req.body;
        if(!email||!password||!role){
            return res.status(400).json({
                message:"something missing",
                success:false,
            })
        };

        const user = await  User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"incorrect email or password ",
                success:false,
            })
        };

        const isPasswordMatch = await bcrypt.compare(password,user.password);       
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"password incorrect ",
                success:false,
            })
        };

        if(role!==user.role){
            return res.status(400).json({
                message:"Account doesn't exist with this role ",
                success:false,
            })
        };

        const tokenData = {
            userId:user._id
        };

        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1d"})

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            message:`Welcome back ${user.firstname}`,
            user:{
                _id:user._id,
                firstname:user.firstname,
                email:user.email,
                role:user.role

            },
            success:true
        })
    } catch (error) {
        console.log('Error: '+error);
    }
};

export const logout = async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully",
            success:true,
        });
    } catch (error) {
        console.log(error);
    }
};

