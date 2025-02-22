import express from 'express';
import {
    createHotel,
    updatedHotel,
    deleteHotel,
    getHotel,
    getAllHotel,
    countByCity,
    countByType,
    getHotelRooms,
    getNearbyHotels
} from '../controllers/hotel.js';

const router = express.Router();
router.get('/nearby', getNearbyHotels);
router.get('/countByCity', countByCity);
router.post('/', createHotel);
router.put('/:id', updatedHotel);
router.delete('/:id', deleteHotel);
router.get('/:id', getHotel);
router.get('/', getAllHotel); 

router.get('/countByType', countByType);
router.get('/rooms/:id', getHotelRooms);


export default router;
