

import { json } from "express";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import axios from 'axios';
import expressAsyncHandler from "express-async-handler";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(201).json(savedHotel);
    } catch (err) {
        next(err);
    }
};


export const updatedHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedHotel) {
            return res.status(404).json({ message: "Hotel not found." });
        }
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
};


export const deleteHotel = async (req, res, next) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!deletedHotel) {
            return res.status(404).json({ message: "Hotel not found." });
        }
        res.status(200).json({ message: "Hotel has been deleted!" });
    } catch (err) {
        next(err);
    }
};

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found." });
        }
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
};


export const getAllHotel= async(req,res,next)=>{
    const {min,max,city}=req.query;
    try{
        if(!city)
        {
            const hotels=await Hotel.find();
            return res.status(200).json(hotels);
            
        }
        const hotels=await Hotel.find({city:city , cheapestPrice: {$gte:min || 1,$lte:max || 40000}});
        res.status(200).json(hotels);
    }catch(err){
        next(err);
    }
}

// Count hotels by cities
export const countByCity = async (req, res, next) => {
    try {
        if (!req.query.cities) {
            return res.status(400).json({ message: "Missing 'cities' query parameter." });
        }

        const cities = req.query.cities.split(",").map(
            (city) =>
                city.trim()
        );
        console.log(cities);
        let hotelCount = [];
        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];
            hotelCount.push(await Hotel.countDocuments({ city: city }));
        }
        res.status(200).json(hotelCount);
    } catch (err) {
        next(err);
    }
};

// Count hotels by type
export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const cottageCount = await Hotel.countDocuments({ type: "cottage" });
        const farmhouseCount = await Hotel.countDocuments({ type: "farmhouse" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "cottage", count: cottageCount },
            { type: "farmhouse", count: farmhouseCount },
        ]);
    } catch (err) {
        next(err);
    }
};

// Get all rooms for a specific hotel
export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found." });
        }

        const list = await Promise.all(
            hotel.rooms.map(room => Room.findById(room))
        );

        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};
export const getNearbyHotels = expressAsyncHandler(async (req, res) => {
    const { lat, lng, radius } = req.query;
    console.log(req.query);

    if (!lat || !lng || !radius) {
        return res.status(400).json({ error: 'Please provide lat, lng, and radius' });
    }


    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const searchRadius = parseFloat(radius);


    if (isNaN(latitude) || isNaN(longitude) || isNaN(searchRadius)) {
        return res.status(400).json({ error: 'Invalid latitude, longitude, or radius' });
    }

    const hotels = await Hotel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[longitude, latitude], searchRadius / 6378.1]
            }
        }
    });

    res.json(hotels);
});
