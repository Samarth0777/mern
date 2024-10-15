const joi = require("@hapi/joi")
const contact=require("../models/contact")

const validatecontact=joi.object({
    username:joi.string().min(6),
    email:joi.string(),
    message:joi.string().min(10)
})

const contactForm=async(req,res)=>{
    try {
        const {error}=validatecontact.validate(req.body)
        if(error)
            return res.status(400).json({msg:error.details[0].message})
        const {username,email,message}=req.body
        const _con=await contact.create({username,email,message})
        res.status(200).json({username,email,message})
        
    } catch (error) {
        
    }
}

module.exports=contactForm