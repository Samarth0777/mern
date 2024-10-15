// const { process } = require("@hapi/joi/lib/errors")
const jwt=require("jsonwebtoken")
const User=require("../models/user")

const authmiddleware=async(req,res,next)=>{
    const token=req.header("Authorization")
    // const getToken=localStorage.getItem("token")
    // console.log("token extracted from localstorage "+getToken)
    
    // const token=""
    if(!token){
        console.log("token from auth middleware "+token)
        return res.status(401).json({msg:"Token not found!"})
    }
    console.log("token found "+token) 

    const jwtToken=token.replace('Bearer',"").trim()

    try {
        const verified=jwt.verify(jwtToken,process.env.SECRET_KEY)
        console.log("verified"+JSON.stringify(verified))
        const userData=await User.findOne({email:verified.email}).select({password:0})
        console.log("userdata"+userData)
        req.user=userData
        req.token=token
        req.userID=userData._id 
        next();
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

module.exports=authmiddleware