const admin_middleware=async(req,res,next)=>{
    try {
        console.log(req.user)
        if(req.user.isAdmin==='false'){
            console.log("access denied")
           return res.status(400).json({msg:"Access Denied"})
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports=admin_middleware 