const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');

// POST request for inquiry
router.post('/send-inquiry', inquiryController.createInquiry);
router.get('/get-all', inquiryController.getAllInquiries);
router.delete('/delete/:id', inquiryController.deleteInquiry);
router.put("/update-status/:id",inquiryController.updateInquiryStatus);
module.exports = router;