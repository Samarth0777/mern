const mongoose=require("mongoose")

const uri=process.env.DB_URI
const connectdb=async()=>{
    try{
        await mongoose.connect(uri)
        console.log("Connected to db")
    }catch(err){
        console.log(err)
    }
}

module.exports=connectdb 