const express=require('express');
const router=express.Router();

const {login}=require('../controller/login')
const {signUp}=require('../controller/signUp');
const { authmid, student, Admin } = require('../middlewares/authmid');
router.post("/login",login);
router.post("/signup",signUp);
router.get("/test",(req,res)=>{
    res.send("This is a protected route for checking whether the user is logged in or not")
})
router.get("/student",authmid,student,(req,res)=>{
    res.send("welcome to student's dashboard");
})
router.get("/admin",authmid,Admin,(req,res)=>{
    res.send("welcome to Admin's dashboard");
})
module.exports=router;