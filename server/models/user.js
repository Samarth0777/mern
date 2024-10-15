const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const { boolean } = require("@hapi/joi")


const user=mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:String,
        require:true,
        default:false
    } 
})

user.methods.generateToken=async function(){
    try {
        return jwt.sign(
            {
                userId:this._id.toString(),
                email:this.email,
                isAdmin:this.isAdmin
            },
            process.env.SECRET_KEY,
            {
                expiresIn:"1d"
            }
        )
    } catch (error) {
        console.log(error)
    }
}

module.exports=mongoose.model('User',user)