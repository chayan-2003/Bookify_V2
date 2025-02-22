import mongoose from 'mongoose';
const { Schema } = mongoose;

const RoomSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    room_price:{
        type: Number,
        required: true
    },
    maxPerson:{
        type: Number,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    roomNumbers:[{number:Number,unavailableDates: { type : [Date] } }],
    },

    {timestamps:true}
);

export default mongoose.model("Room",RoomSchema)