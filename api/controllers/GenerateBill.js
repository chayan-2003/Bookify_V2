import PDFDocument from "pdfkit";
import { PassThrough } from "stream";
import s3 from "../config/awsConfig.js"; 
import Bill from "../models/Bills.js";

const generateBillAndUpload = async (bookingDetails) => {
    const AWS_S3_BUCKET='baidyabatibookings';
    try {
        const doc = new PDFDocument();
        const passThrough = new PassThrough();
        doc.pipe(passThrough);

        doc.fontSize(20).text("Hotel Booking Invoice", { align: "center" });
        doc.moveDown();

        doc.fontSize(14).text(`Booking ID: ${bookingDetails._id}`);
        doc.text(`Guest Name: ${bookingDetails.guestName}`);
        doc.text(`Check-in Date: ${bookingDetails.checkIn}`);
        doc.text(`Check-out Date: ${bookingDetails.checkOut}`);
        doc.text(`Room Type: ${bookingDetails.roomType}`);
        doc.text(`Total Amount: $${bookingDetails.totalAmount}`);
        doc.moveDown();

        doc.text("Thank you for choosing our hotel!", { align: "center" });

        doc.end();

        const AWS_S3_BUCKET = 'baidyabatibookings';
        const params = {
            Bucket: AWS_S3_BUCKET,
            Key: `invoices/invoice_${bookingDetails.bookingId}.pdf`,
            Body: passThrough,
            ContentType: "application/pdf",
            ACL: "public-read",
        };

        const uploadResult = await s3.upload(params).promise();
        const fileUrl = uploadResult.Location;

        const bill = new Bill({ ...bookingDetails, pdfUrl: fileUrl });
        await bill.save();

        return fileUrl;

    } catch (error) {
        console.error("Error generating bill:", error);
        throw new Error("Bill generation failed");
    }
};

export default generateBillAndUpload;