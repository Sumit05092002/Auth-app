const jwt=require('jsonwebtoken');
require('dotenv').config();
exports. authmid=(req,res,next)=>{
    try {
        
        const token=req.body.token||req.cookies.token||req.header("Authorization").replace("Bearer ","");
        if(!token||token===undefined){
            return res.status(401).json({
                success:false,
                message:"Token is empty"
            })
        }
        try {
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            req.user=payload;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Something went wrong while verifying the token"
        })
    }
}

exports.student=(req,res,next)=>{
    try {
        const role=req.user.role;
        if(role!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for students"
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.Admin=(req,res,next)=>{
    try {
        const role=req.user.role;
        if(role!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin"
            })
        }
        next();
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
    
}