const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try{
        const {name,email,password,role}=req.body;
        const allowedRoles = ['user', 'company'];
        const finalRole = allowedRoles.includes(role) ? role : 'user';
        const isEmailExist = await User.findOne({email});
        if(isEmailExist){
            return res.status(400).json({message:"Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name,email,password:hashedPassword,role:finalRole});
        const savedUser=await user.save();
        res.status(201).json({name,email,role:finalRole,_id:savedUser._id});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const checkUser = await User.findOne({email});
        if(!checkUser){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        const passwordMatch = await bcrypt.compare(password,checkUser.password);
        if(!passwordMatch){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        const token = jwt.sign({id:checkUser._id,role:checkUser.role},process.env.JWT_SECRET,{expiresIn:"24h"});
        res.status(200).json({message:"Login successful",token,name:checkUser.name,role:checkUser.role});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports={
    registerUser,
    loginUser
}