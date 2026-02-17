// // const InquiryModel=require("../models/inquiryModel")
// const InquiryModel=require("../models/inquiryModel")
// const createInquiry = async (req, res) => {
//   try {
//     const { name, email, phone, date, carSelection, message } = req.body;

//     // Database mein naya record banana
//     const newInquiry = await InquiryModel.create({  
//       name:name,
//       email: email,
//       phone:phone,
//       date: date, 
//       carSelection:carSelection,
//       message: message
//     });
// //  console.log( newInquiry );
//     // await newInquiry.save();
    
//     res.status(201).json({ success: true, message: "Inquiry saved successfully!" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }




// // console.log(req.body);
// // res.send("okk")

// };




// // 1. Saari Inquiries fetch karna

// const getAllInquiries = async (req, res) => {
//   try {
//     const inquiries = await InquiryModel.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       data: inquiries,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch inquiries",
//     });
//   }
// };









// // 2. Inquiry Delete karna
//  const   deleteInquiry = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const inquiry = await InquiryModel.findByIdAndDelete(id);

//     if (!inquiry) {
//       return res.status(404).json({ success: false, message: "Inquiry nahi mili" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Inquiry successfully delete ho gayi"
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Delete error",
//       error: error.message
//     });
//   }
// };



// module.exports={
//     createInquiry,
// getAllInquiries,
//  deleteInquiry
// }


















const InquiryModel = require("../models/inquiryModel");
const nodemailer = require("nodemailer"); // 1. Nodemailer import karein

const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, date, carSelection, message } = req.body;

    // Database mein naya record banana
    const newInquiry = await InquiryModel.create({
      name: name,
      email: email,
      phone: phone,
      date: date,
      carSelection: carSelection,
      message: message
    });

    // --- EMAIL SENDING LOGIC ---
    
    // 2. Transporter setup (Gmail ke liye)
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL_USER, // Aapka Gmail address
    //     pass: process.env.EMAIL_PASS  // Aapka Gmail App Password
    //   }
    // });



// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true, // true for 465, false for other  ports  
//   auth: {
//     user: process.env.EMAIL_USER, 
//     pass: process.env.EMAIL_PASS  
//   }
// });


// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });





const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

    

    // 3. Email Template (Royal Theme)
    const mailOptions = {
      from: `"Royal Wedding Cars" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL, // Jiss email par aap inquiry receive karna chahte hain
      subject: `👑 New Car Inquiry: ${carSelection} by ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #d4af37; padding: 20px; border-radius: 10px;">
          <h2 style="color: #4A2016; text-align: center;">Royal Wedding Cars Inquiry</h2>
          <hr style="border: 0.5px solid #A6715B;" />
          <p><strong>Customer Name:</strong> ${name}</p>
          <p><strong>Customer Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Wedding Date:</strong> ${new Date(date).toDateString()}</p>
          <p><strong>Selected Car:</strong> <span style="color: #A6715B; font-weight: bold;">${carSelection}</span></p>
          <p><strong>Message:</strong></p>
          <div style="background: #fdf8f5; padding: 10px; border-left: 4px solid #4A2016;">
            ${message}
          </div>
          <p style="font-size: 10px; color: #888; margin-top: 20px; text-align: center;">
            This inquiry was sent from the Royal Wedding Cars Admin Panel.
          </p>
        </div>
      `
    };

    // 4. Email bhejein (Isse await karein taaki database save aur email dono confirm ho jayein)
    await transporter.sendMail(mailOptions);

    res.status(201).json({ 
      success: true, 
      message: "Inquiry saved and Email sent to admin!" 
    });

  } catch (error) {
    console.error("Error in createInquiry:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error", 
      error: error.message 
    });
  }
};

// 1. Saari Inquiries fetch karna
const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await InquiryModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: inquiries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch inquiries",
    });
  }
};

// 2. Inquiry Delete karna
const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await InquiryModel.findByIdAndDelete(id);

    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry nahi mili" });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry successfully delete ho gayi"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete error",
      error: error.message
    });
  }
};

module.exports = {
  createInquiry,
  getAllInquiries,
  deleteInquiry
};