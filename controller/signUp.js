const user=require('../Model/user');
const bcrypt=require('bcrypt');
exports.signUp=async(req,res)=>{
    try {
        const {name,email,password,role}=req.body;
        const checkmail=await user.findOne({email});
        if(checkmail){
            return res.status(400).json({
                success:false,
                message:"user is already registered"
            })
    
        }
        let hashpassword;
        try {
            hashpassword= await bcrypt.hash(password,10);
        } catch (error) {
           return res.status(500).json({
                success:false,
                message:"Internal server error",
                data:error.message
            })
        }
    
        const response=await user.create({name,email,password:hashpassword,role})
        res.status(200).json({
            success:true,
            message:"Entry created successfully",
            data:response
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal server error",
            data:error.message
        })
    }
}