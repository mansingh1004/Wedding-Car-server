// const mongoose = require('mongoose');

// const inquirySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   date: { type: Date, required: true },
//   carSelection: { type: String, required: true },
//   message: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('inquiry', inquirySchema);



const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: Date, // Wedding Date
    required: true,
  },
  carSelection: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  // --- NEW FIELD ---
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed", "Cancelled"], // Sirf ye values allow hongi
    default: "Pending", // By default 'Pending' rahega
  },
}, { timestamps: true }); // CreatedAt aur UpdatedAt auto-generate honge

module.exports = mongoose.model("inquiry", inquirySchema);