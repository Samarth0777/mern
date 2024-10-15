const express=require("express")
const contactForm = require("../controllers/contact_controller")
const router=express.Router()


router.route("/contact").post(contactForm)

module.exports=router
