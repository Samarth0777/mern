const user = require("../models/user")
const joi=require("@hapi/joi")

const validationSchema=joi.object({
    username:joi.string().min(5).required(),
    email:joi.string().required(),
    password:joi.string().min(8).required()
})


const home=async(req,res)=>{
    try {
        res.send("Started through Router")
    } catch (error) {
        console.log(error)
    }
}

const register=async(req,res)=>{
    try {
        const {error}=validationSchema.validate(req.body)
        if(error){
            // console.log("Registration error : "+json(error.details[0].message))
            return res.status(400).send({Registration_error:error.details[0].message})
        }

        const {username,email,password}=req.body
        const check=await user.findOne({email:email})
        const _chkusr=await user.findOne({username:username})
        if(check){
            console.log(check)
            return res.status(400).json("email already exist")
        }
        if(_chkusr)
            return res.status(400).send("Username Taken")
        const created=await user.create({username,email,password})
        res.status(200).send({token:await created.generateToken()})
    } catch (error) {
        res.send(error)        
    }
}

const login=async(req,res)=>{
    try {
        const {username,password}=req.body
        const _ckusr=await user.findOne({username:username})
        console.log(_ckusr)
        if(_ckusr===null)
            return res.status(401).send("No User Found")
        if(password!=_ckusr.password)
            res.status(403).send("Incorrect Password")
        else
            res.status(200).json({msg:"Logged In",token:await _ckusr.generateToken()})
    } catch (error) {
        res.send(error)
    }
    
}

const User=async(req,res)=>{
    try {
        const userdata=req.user
        console.log("userdata auth controller "+userdata)
        res.status(200).json({userdata})
    } catch (error) {
        console.log(error)
    }

}

module.exports={home,register,login,User}; 