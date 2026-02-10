const express=require("express")
const route=express.Router()
const AdminController=require("../controllers/adminController")



route.post("/adminlogin",AdminController.AdminLogin)


module.exports=route