const path=require('path')
require("dotenv").config({path:path.resolve(__dirname,'./db/.env')})
const express=require("express")
const app=express(); 
const port=200
const router=require("./router/auth")
const connect=require("./db/connect ")
const contactrouter=require("./router/contact")
const cors=require("cors")
const adminrouter=require("./router/admin")

const corsoptions={
    origin:"http://localhost:5173",
    methods:"GET,POST,DELETE,PATCH",
    credentials:true
} 

app.use(cors(corsoptions))

connect();

app.use("/api/admin",adminrouter)

app.use(express.json())

app.use("/api",contactrouter)
app.use("/api/auth",router)

app.get("/",(req,res)=>{
    console.log("Server Started")
    res.send("Started")
})

app.listen(port,(req,res)=>{ 
    console.log("started")
})