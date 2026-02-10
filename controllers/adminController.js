const AdminModel  = require("../models/adminModel")



// const AdminLogin=(req,res)=>{
//     console.log("okkk")
//     res.send("ok")
// }




const AdminLogin=async(req,res)=>{
    const { adminid, password } =req.body;
    try {
        const admin=await AdminModel.findOne({adminid:adminid});
        if(!admin){
            res.status(404).send({msg:"Invalid Adminid"})
        }
        if(admin.password!==password)
        {
            res.status(404).send({msg:"Invalid Password"})

        }
        res.status(200).send({msg:"Login Successfully"})
    } catch (error) {
        res.status(500).send({ msg: "Server error", error });
    }
   
}











module.exports={

    AdminLogin
}