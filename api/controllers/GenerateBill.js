import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Bill from "../models/Bills.js";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
    signatureVersion: 'v4',
});

const generateBillAndUpload = async (req, res) => {
    const { guestName, checkIn, checkOut, roomType, totalAmount, email } = req.body;
    const AWS_S3_BUCKET = 'baidyabatibookings';
    console.log(req.body);

    try {
        const invoiceId = new Date().getTime(); // Generate a unique invoice ID using the current timestamp

        const params = {
            Bucket: AWS_S3_BUCKET,
            Key: `Social_Media/invoice_${invoiceId}.pdf`,
            ContentType: "application/pdf",
        };

        const command = new PutObjectCommand(params);
        const preSignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        const bill = new Bill({
            guestName,
            checkIn,
            checkOut,
            roomType,
            totalAmount,
            email,
            pdfUrl: `https://${params.Bucket}.s3.${s3.config.region}.amazonaws.com/${params.Key}`
        });
        await bill.save();
        res.json({ preSignedUrl });
        console.log(preSignedUrl);
    } catch (error) {
        console.error("Error generating pre-signed URL:", error);
        res.status(500).json({ message: "Bill generation failed" });
    }
};

export default generateBillAndUpload;