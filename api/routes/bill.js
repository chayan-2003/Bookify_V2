import express from 'express';
import generateBillAndUpload from '../controllers/GenerateBill.js';

const router = express.Router();

router.post('/generate', generateBillAndUpload);
export default router;