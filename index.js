const express=require('express');
const app=express();

app.listen(3000,()=>{
    console.log("Hello this is your server");
})

app.use(express.json());
const dbConnect=require('./config/database');
dbConnect();

const route=require("./routes/auth");
app.use('/api/v1',route);

app.get("/",(req,res)=>{
    res.send("Hello I am your server");
})

const cookieParser=require('cookie-parser')
app.use(cookieParser);