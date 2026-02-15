const AdminModel  = require("../models/adminModel")

const mongoose = require("mongoose");


// const AdminLogin=(req,res)=>{
//     console.log("okkk")
//     res.send("ok")
// }



const AdminLogin = async (req, res) => {
  const { adminid, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ adminid }); 

    if (!admin) {
      return res.status(404).send({ msg: "Invalid Adminid" });
    }

    if (admin.password !== password) {
      return res.status(404).send({ msg: "Invalid Password" });
    }

    // return res.status(200).send({ msg: "Login Successfully" });

    return res.status(200).json({
  msg: "Login Successfully",
  adminid: admin.adminid,
});


  } catch (error) {
    return res.status(500).send({ msg: "Server error", error });
  }
};






// const AdminLogin = async (req, res) => {
//   const { adminid, password } = req.body;

//   try {
//     const admin = await AdminModel.findOne({ adminid });

//     console.log("Entered ID:", adminid);
//     console.log("Entered Pass:", password);
//     console.log("Database Name:", mongoose.connection.name);

//     if (!admin) {
//       console.log("Admin not found");
//       return res.status(404).json({ msg: "Invalid Adminid" });
//     }

//     console.log("DB ID:", admin.adminid);
//     console.log("DB Pass:", admin.password);

//     return res.json({
//       enteredPassword: password,
//       dbPassword: admin.password
//     });

//   } catch (error) {
//     console.log("REAL ERROR:", error);
//     return res.status(500).json({ msg: "Server error" });
//   }
// };







module.exports={

    AdminLogin
}