import User from "../models/User.js";
import upload from "./upload.js";
export const updatedUser= async(req,res,next)=>{
    try{
        const img=req.file?req.file.location:null;
        const updatedHotel=await User.findByIdAndUpdate(req.params.id,
            {$set:{
                username:req.body.username,
                email:req.body.email,
                phone:req.body.phone,
                img:img
            }},
            {new:true})
        res.status(200).json(updatedHotel)
    }catch(err){
        next(err);
    }
}

export const deleteUser= async(req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel have been deleted!!!")
    }catch(err){
        next(err);
    }
}

export const getUser= async(req,res,next)=>{
    try{
        const user=await User.findById(req.params.id);
        res.status(200).json(user);
        
    }catch(err){
        next(err);
    }
}

export const getAllUser= async(req,res,next)=>{
    try{
        const users=await User.find();
        res.status(200).json(users);
    }catch(err){
        next(err);
    }
}