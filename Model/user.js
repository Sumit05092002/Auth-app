const mongoose=require('mongoose');

const user= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:20
    },

    email:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        reuired:true,
    },
    role:{
        type:String,
        enum:["Admin","Student","Visitor"],
    }
})

module.exports= mongoose.model("user",user);