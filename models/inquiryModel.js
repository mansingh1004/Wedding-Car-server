const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  carSelection: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('inquiry', inquirySchema);

// import mongoose from "mongoose";

// const inquirySchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   date: String,
//   carSelection: String,
//   message: String,
// }, { timestamps: true });

// export default mongoose.model("Inquiry", inquirySchema);
