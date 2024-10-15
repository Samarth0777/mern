const { required } = require("@hapi/joi")
const mongoose=require("mongoose")

const contact=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Contact",contact)