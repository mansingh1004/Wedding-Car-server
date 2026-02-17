const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const adminRoute=require("./routes/adminRoute");
const inquiryRoute = require('./routes/inquiryRoute');
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// middleware
app.use(cors());

// app.use(cors({
//   origin: [
//     'https://wedding-car-client.vercel.app',
//     'http://localhost:5173'
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.use("/admin", adminRoute)
app.use('/inquiry', inquiryRoute);

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
