const user=require('../Model/user');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
exports.login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details",
            })
        }
        const User=await user.findOne({email});
        if(!User){
            return res.status(400).json({
                success:false,
                message:"user is not registered"
            })
        }
        
        const payload={
            email:User.email,
            id:User._id,
            role:User.role
        }
        require('dotenv').config();
        if(await bcrypt.compare(password,User.password)){
            let token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'2h'
            })
            User.password="undefined";
            const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                message:'logged In successfully',
                token,
                User
            })
        }else{
            return res.status(403).json({
                success:false,
                message:'Incorrect password',
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Log In problem",
            data:error.message
        })
    }
}