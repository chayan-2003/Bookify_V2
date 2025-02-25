import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
    guestName: { type: String, required: false },
    checkIn: { type: Date, required: false },
    checkOut: { type: Date, required: false },
    roomType: { type: String, required: false },
    totalAmount: { type: Number, required: false },
    pdfUrl: { type: String, required: false }, 
    email: { type: String, required: false },
}, { timestamps: false });

const Bill = mongoose.model("Bill", BillSchema);
export default Bill;
