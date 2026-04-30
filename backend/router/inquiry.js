const express = require('express');
const router = express.Router();
const Inquiry = require('../models/inquiry');
const expressasynhandler = require('express-async-handler');
const { adminmiddleware } = require('../middleware/authmiddleware');

router.post('/', expressasynhandler(async (req, res) => {
    const { name, phone, email, message } = req.body;
    const newInquiry = await Inquiry.create({ name, phone, email, message });
    res.status(201).json(newInquiry);
}));

router.get('/', adminmiddleware, expressasynhandler(async (req, res) => {
    const inquiries = await Inquiry.find().sort({ date: -1 });
    res.status(200).json(inquiries);
}));

module.exports = router;
