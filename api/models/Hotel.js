import mongoose from 'mongoose';
const { Schema } = mongoose;
const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    /* rating:{type:Number,
     min:0,max:5},*/

    rooms: { type: [String] },

    photos: {
        type: [String],
        required: true
    },

    cheapestPrice: {
        type: Number,
        required: true
    },

    featured: {
        type: Boolean,
        default: false
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }



})
HotelSchema.index({ location: '2dsphere' });
export default mongoose.model("Hotel", HotelSchema)