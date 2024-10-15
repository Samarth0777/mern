const Contact = require("../models/contact")
const User=require("../models/user")
const getalluser=async(req,res)=>{
    try {
        const user=await User.find().select({password:0})
        if(!user)
           return res.status(400).json({msg:"DB is empty"})
        res.status(200).json(user)
    } catch (error) {
        console.log((error))
        next(error)
    }
}

const getallcontacts=async(req,res)=>{
    try {
        const contact=await Contact.find()
        if(!contact)
            return res.status(400).json({msg:"No Contacts available"})
        res.status(200).json(contact)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const deleteuser=async(req,res)=>{
    try {
        await User.deleteOne({username:req.params.username.substring(1)})
        res.status(200).json({msg:"user deleted"})
    } catch (error) {
        console.log("Error: "+error)
    }
}

const getuserbyid=async(req,res)=>{
    try {
        const id=req.params.id
        const found=await User.findOne({_id:id}).select({password:0})
        res.status(200).json(found)
    } catch (error) {
        console.log("Error: "+error)
    }
}

const updateuser=async(req,res)=>{
    try {
        const id=req.params.id
        const data=req.body
        console.log(data)
        // const x=await User.findOne({_id:id})
        // console.log(x) 
        const x=await User.updateOne({_id:id},{$set:{data}})
        return res.status(200).json(data)
    } catch (error) {
        console.log(error) 
    }
}

const deletecontact=async(req,res)=>{
    try {
        const id=req.params.id
        const x=await Contact.deleteOne({message:id})
        res.status(200).json({msg:"deleted successfully"})
    } catch (error) {
        console.log(error)
    }
}

module.exports={getalluser,getallcontacts,deleteuser,getuserbyid,updateuser,deletecontact}