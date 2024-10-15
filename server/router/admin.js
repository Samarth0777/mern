const express=require("express")
const admin_controller  = require("../controllers/admin_controller")
const router=express.Router()
const auth_middleware = require("../middleware/auth_middleware")
const admin_middleware = require("../middleware/admin_middleware")

router.route("/users").get(auth_middleware,admin_middleware,admin_controller.getalluser)

router.route("/contacts").get(auth_middleware,admin_middleware,admin_controller.getallcontacts)

router.route("/users/:id").get(auth_middleware,admin_middleware,admin_controller.getuserbyid)

router.route("/users/update/:id").patch(admin_controller.updateuser)

router.route("/users/delete/:username").delete(auth_middleware,admin_middleware,admin_controller.deleteuser)

router.route("/contacts/delete/:id").delete(admin_controller.deletecontact)

module.exports=router