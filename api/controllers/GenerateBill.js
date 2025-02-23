import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../config/awsConfig.js";
import Bill from "../models/Bills.js";

const generateBillAndUpload = async (req, res) => {
    const { bookingId, guestName, checkIn, checkOut, roomType, totalAmount } = req.body;
    const AWS_S3_BUCKET = 'baidyabatibookings';

    try {
        // Generate a pre-signed URL for the S3 upload
        const params = {
            Bucket: AWS_S3_BUCKET,
            Key: `invoices/invoice_${bookingId}.pdf`,
            ContentType: "application/pdf",
        };

        const command = new PutObjectCommand(params);
        const preSignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        // Save the bill details in the database
        const bill = new Bill({

            guestName,
            checkIn,
            checkOut,
            roomType,
            totalAmount,
            pdfUrl: `https://${params.Bucket}.s3.${s3.config.region}.amazonaws.com/${params.Key}`
        });
        await bill.save();

        // Return the pre-signed URL to the frontend
        res.json({ preSignedUrl });
    } catch (error) {
        console.error("Error generating pre-signed URL:", error);
        res.status(500).json({ message: "Bill generation failed" });
    }
};

export default generateBillAndUpload;