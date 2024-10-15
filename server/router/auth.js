const express=require("express")
const router=express.Router()
const controller=require("../controllers/auth_controller")
const authmiddleware = require("../middleware/auth_middleware")

// router.get("/",(req,res)=>{
//     res.send("Started using Router")
// })
router.route("/").get(controller.home)

router.route("/register").post(controller.register)

router.route("/login").post(controller.login)

router.route("/user").get(authmiddleware, controller.User)
module.exports=router