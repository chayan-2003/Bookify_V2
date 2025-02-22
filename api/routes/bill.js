import express from 'express';
import generateBillAndUpload from '../controllers/GenerateBill.js';

const router = express.Router();

router.post('/generate', async (req, res) => {
    try {
        const bookingDetails = req.body;
        const fileUrl = await generateBillAndUpload(bookingDetails);
        res.status(200).json({ success: true, fileUrl });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;