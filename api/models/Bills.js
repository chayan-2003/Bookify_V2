import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
    guestName: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    roomType: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    pdfUrl: { type: String, required: true }, 
}, { timestamps: true });

const Bill = mongoose.model("Bill", BillSchema);
export default Bill;
