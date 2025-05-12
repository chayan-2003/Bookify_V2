import mongoose from 'mongoose';
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';
const MONGO_URL = 'mongodb+srv://chayanghosh185:chaya@cluster0.bdiz4vu.mongodb.net/booking?retryWrites=true&w=majority'; // Replace with your MongoDB connection string

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

const hotels = [
    {
      name: "Hotel Sunshine",
      type: "Hotel",
      city: "New York",
      address: "123 Sunshine St",
      distance: "2km",
      photos: ["https://i0.wp.com/midnightoilstudios.org/wp-content/uploads/2022/02/sunshine.jpg?resize=400%2C266&ssl=1", "photo2.jpg"],
      desc: "A beautiful hotel in the heart of New York.",
      rooms: ["101", "102", "103", "104", "105"],
      cheapestPrice: 150,
      featured: true,
      location: {
        type: "Point",
        coordinates: [-74.0060, 40.7128]
      }
    },
    {
      name: "Ocean View Resort",
      type: "Resort",
      city: "Miami",
      address: "456 Ocean Dr",
      distance: "500m",
      photos: ["photo3.jpg", "photo4.jpg"],
      desc: "Enjoy the ocean view from every room.",
      rooms: ["201", "202", "203", "204", "205"],
      cheapestPrice: 200,
      featured: false,
      location: {
        type: "Point",
        coordinates: [-80.1918, 25.7617]
      }
    },
    {
      name: "Mountain Retreat",
      type: "Lodge",
      city: "Denver",
      address: "789 Mountain Rd",
      distance: "10km",
      photos: ["photo5.jpg", "photo6.jpg"],
      desc: "A peaceful retreat in the mountains.",
      rooms: ["301", "302", "303", "304", "305"],
      cheapestPrice: 120,
      featured: true,
      location: {
        type: "Point",
        coordinates: [-104.9903, 39.7392]
      }
    },
    {
      name: "City Center Inn",
      type: "Inn",
      city: "Chicago",
      address: "101 Center St",
      distance: "1km",
      photos: ["photo7.jpg", "photo8.jpg"],
      desc: "Conveniently located in the city center.",
      rooms: ["401", "402", "403", "404", "405"],
      cheapestPrice: 100,
      featured: false,
      location: {
        type: "Point",
        coordinates: [-87.6298, 41.8781]
      }
    },
    {
      name: "Desert Oasis",
      type: "Hotel",
      city: "Las Vegas",
      address: "202 Desert Blvd",
      distance: "3km",
      photos: ["photo9.jpg", "photo10.jpg"],
      desc: "A luxurious oasis in the desert.",
      rooms: ["501", "502", "503", "504", "505"],
      cheapestPrice: 250,
      featured: true,
      location: {
        type: "Point",
        coordinates: [-115.1398, 36.1699]
      }
    },
    {
      name: "Royal Palace",
      type: "Hotel",
      city: "London",
      address: "789 Royal St",
      distance: "2km",
      photos: ["photo11.jpg", "photo12.jpg"],
      desc: "Experience the royal treatment in the heart of London.",
      rooms: ["601", "602", "603", "604", "605"],
      cheapestPrice: 300,
      featured: true,
      location: {
        type: "Point",
        coordinates: [-0.1276, 51.5074]
      }
    },
    {
      name: "Berlin Central",
      type: "Hotel",
      city: "Berlin",
      address: "456 Central Ave",
      distance: "1km",
      photos: ["photo13.jpg", "photo14.jpg"],
      desc: "Stay in the center of Berlin with all amenities.",
      rooms: ["701", "702", "703", "704", "705"],
      cheapestPrice: 180,
      featured: false,
      location: {
        type: "Point",
        coordinates: [13.4050, 52.5200]
      }
    },
    {
      name: "Kolkata Comfort",
      type: "Hotel",
      city: "Kolkata",
      address: "123 Park St",
      distance: "5km",
      photos: ["photo15.jpg", "photo16.jpg"],
      desc: "Comfortable stay in the cultural capital of India.",
      rooms: ["801", "802", "803", "804", "805"],
      cheapestPrice: 90,
      featured: true,
      location: {
        type: "Point",
        coordinates: [88.3639, 22.5726]
      }
    },
    {
      name: "Bihar Bliss",
      type: "Hotel",
      city: "Patna",
      address: "789 Gandhi Maidan",
      distance: "3km",
      photos: ["photo17.jpg", "photo18.jpg"],
      desc: "Enjoy the historical beauty of Bihar.",
      rooms: ["901", "902", "903", "904", "905"],
      cheapestPrice: 80,
      featured: false,
      location: {
        type: "Point",
        coordinates: [85.1376, 25.5941]
      }
    },
    {
      name: "Orissa Oasis",
      type: "Hotel",
      city: "Bhubaneswar",
      address: "456 Temple Rd",
      distance: "4km",
      photos: ["photo19.jpg", "photo20.jpg"],
      desc: "Relax in the serene environment of Orissa.",
      rooms: ["1001", "1002", "1003", "1004", "1005"],
      cheapestPrice: 110,
      featured: true,
      location: {
        type: "Point",
        coordinates: [85.8245, 20.2961]
      }
    },
    {
      name: "Srirampur Stay",
      type: "Hotel",
      city: "Srirampur",
      address: "123 Riverside",
      distance: "2km",
      photos: ["photo21.jpg", "photo22.jpg"],
      desc: "A peaceful stay by the riverside.",
      rooms: ["1101", "1102", "1103", "1104", "1105"],
      cheapestPrice: 70,
      featured: false,
      location: {
        type: "Point",
        coordinates: [88.3456, 22.7528]
      }
    },
    // Additional entries to make up 50 hotels
    {
      name: "Hotel Grand",
      type: "Hotel",
      city: "New York",
      address: "456 Broadway",
      distance: "3km",
      photos: ["photo23.jpg", "photo24.jpg"],
      desc: "Luxury stay in the heart of New York.",
      rooms: ["1201", "1202", "1203", "1204", "1205"],
      cheapestPrice: 250,
      featured: true,
      location: {
        type: "Point",
        coordinates: [-74.0060, 40.7128]
      }
    },
    {
      name: "Miami Beach Resort",
      type: "Resort",
      city: "Miami",
      address: "789 Beach Ave",
      distance: "1km",
      photos: ["photo25.jpg", "photo26.jpg"],
      desc: "Beachfront resort with stunning views.",
      rooms: ["1301", "1302", "1303", "1304", "1305"],
      cheapestPrice: 220,
      featured: false,
      location: {
        type: "Point",
        coordinates: [-80.1918, 25.7617]
      }
    },
    {
      name: "Denver Downtown",
      type: "Hotel",
      city: "Denver",
      address: "123 Main St",
      distance: "2km",
      photos: ["photo27.jpg", "photo28.jpg"],
      desc: "Stay in the vibrant downtown area.",
      rooms: ["1401", "1402", "1403", "1404", "1405"],
      cheapestPrice: 130,
      featured: true,
      location: {
        type: "Point",
        coordinates: [-104.9903, 39.7392]
      }
    },
    {
      name: "Chicago Skyline",
      type: "Hotel",
      city: "Chicago",
      address: "456 Lake Shore Dr",
      distance: "4km",
      photos: ["photo29.jpg", "photo30.jpg"],
      desc: "Enjoy the stunning skyline views.",
      rooms: ["1501", "1502", "1503", "1504", "1505"],
      cheapestPrice: 160,
      featured: false,
      location: {
        type: "Point",
        coordinates: [-87.6298, 41.8781]
      }
    },
    {
      name: "Vegas Luxury",
      type: "Hotel",
      city: "Las Vegas",
      address: "789 Strip Blvd",
      distance: "2km",
      photos: ["photo31.jpg", "photo32.jpg"],
      desc: "Experience luxury on the Las Vegas Strip.",
      rooms: ["1601", "1602", "1603", "1604", "1605"],
      cheapestPrice: 300,
      featured: true,
      location: {
        type: "Point",
        coordinates: [-115.1398, 36.1699]
      }
    },
    {
      name: "London Bridge Hotel",
      type: "Hotel",
      city: "London",
      address: "123 Bridge St",
      distance: "1km",
      photos: ["photo33.jpg", "photo34.jpg"],
      desc: "Stay near the iconic London Bridge.",
      rooms: ["1701", "1702", "1703", "1704", "1705"],
      cheapestPrice: 280,
      featured: false,
      location: {
        type: "Point",
        coordinates: [-0.1276, 51.5074]
      }
    },
    {
      name: "Berlin Wall Inn",
      type: "Hotel",
      city: "Berlin",
      address: "456 Wall St",
      distance: "3km",
      photos: ["photo35.jpg", "photo36.jpg"],
      desc: "Stay near the historic Berlin Wall.",
      rooms: ["1801", "1802", "1803", "1804", "1805"],
      cheapestPrice: 190,
      featured: true,
      location: {
        type: "Point",
        coordinates: [13.4050, 52.5200]
      }
    },
    {
      name: "Kolkata Heritage",
      type: "Hotel",
      city: "Kolkata",
      address: "789 Heritage Rd",
      distance: "6km",
      photos: ["photo37.jpg", "photo38.jpg"],
      desc: "Experience the rich heritage of Kolkata.",
      rooms: ["1901", "1902", "1903", "1904", "1905"],
      cheapestPrice: 100,
      featured: false,
      location: {
        type: "Point",
        coordinates: [88.3639, 22.5726]
      }
    },
    {
      name: "Patna Palace",
      type: "Hotel",
      city: "Patna",
      address: "123 Palace St",
      distance: "4km",
      photos: ["photo39.jpg", "photo40.jpg"],
      desc: "Stay in the heart of Patna.",
      rooms: ["2001", "2002", "2003", "2004", "2005"],
      cheapestPrice: 85,
      featured: true,
      location: {
        type: "Point",
        coordinates: [85.1376, 25.5941]
      }
    },
    {
      name: "Bhubaneswar Bliss",
      type: "Hotel",
      city: "Bhubaneswar",
      address: "456 Bliss Rd",
      distance: "5km",
      photos: ["photo41.jpg", "photo42.jpg"],
      desc: "Relax in the serene environment of Bhubaneswar.",
      rooms: ["2101", "2102", "2103", "2104", "2105"],
      cheapestPrice: 115,
      featured: false,
      location: {
        type: "Point",
        coordinates: [85.8245, 20.2961]
      }
    },
    {
      name: "Srirampur Serenity",
      type: "Hotel",
      city: "Srirampur",
      address: "789 Serenity St",
      distance: "3km",
      photos: ["photo43.jpg", "photo44.jpg"],
      desc: "A peaceful stay in Srirampur.",
      rooms: ["2201", "2202", "2203", "2204", "2205"],
      cheapestPrice: 75,
      featured: true,
      location: {
        type: "Point",
        coordinates: [88.3456, 22.7528]
      }
    },
    {
      name: "Hotel Elite",
      type: "Hotel",
      city: "New York",
      address: "123 Elite St",
      distance: "2km",
      photos: ["photo45.jpg", "photo46.jpg"],
      desc: "Luxury stay in the heart of New York.",
      rooms: ["2301", "2302", "2303", "2304", "2305"],
      cheapestPrice: 260,
      featured: false,
      location: {
        type: "Point",
        coordinates: [-74.0060, 40.7128]
      }
    },
    {
      name: "Miami Paradise",
      type: "Resort",
      city: "Miami",
      address: "456 Paradise Ave",
      distance: "1km",
      photos: ["photo47.jpg", "photo48.jpg"],
      desc: "Beachfront resort with stunning views.",
      rooms: ["2401", "2402", "2403", "2404", "2405"],
      cheapestPrice: 230,
      featured: true,
      location: {
        type: "Point",
        coordinates: [-80.1918, 25.7617]
      }
    },
    {
      name: "Denver Heights",
      type: "Hotel",
      city: "Denver",
      address: "789 Heights Rd",
      distance: "2km",
      photos: ["photo49.jpg", "photo50.jpg"],
      desc: "Stay in the vibrant downtown area.",
      rooms: ["2501", "2502", "2503", "2504", "2505"],
      cheapestPrice: 140,
      featured: false,
      location: {
        type: "Point",
        coordinates: [-104.9903, 39.7392]
      }
    },
    {
      name: "Chicago Central",
      type: "Hotel",
      city: "Chicago",
      address: "123 Central St",
      distance: "4km",
      photos: ["photo51.jpg", "photo52.jpg"],
      desc: "Enjoy the stunning skyline views.",
      rooms: ["2601", "2602", "2603", "2604", "2605"],
      cheapestPrice: 170,
      featured: true,
      location: {
        type: "Point",
        coordinates: [-87.6298, 41.8781]
      }
    },
    {
      name: "Vegas Extravaganza",
      type: "Hotel",
      city: "Las Vegas",
      address: "456 Extravaganza Blvd",
      distance: "2km",
      photos: ["photo53.jpg", "photo54.jpg"],
      desc: "Experience luxury on the Las Vegas Strip.",
      rooms: ["2701", "2702", "2703", "2704", "2705"],
      cheapestPrice: 310,
      featured: false,
      location: {
        type: "Point",
        coordinates: [-115.1398, 36.1699]
      }
    },
    {
      name: "London Luxury",
      type: "Hotel",
      city: "London",
      address: "789 Luxury St",
      distance: "1km",
      photos: ["photo55.jpg", "photo56.jpg"],
      desc: "Stay near the iconic London Bridge.",
      rooms: ["2801", "2802", "2803", "2804", "2805"],
      cheapestPrice: 290,
      featured: true,
      location: {
        type: "Point",
        coordinates: [-0.1276, 51.5074]
      }
    },
    {
      name: "Berlin Comfort",
      type: "Hotel",
      city: "Berlin",
      address: "123 Comfort St",
      distance: "3km",
      photos: ["photo57.jpg", "photo58.jpg"],
      desc: "Stay near the historic Berlin Wall.",
      rooms: ["2901", "2902", "2903", "2904", "2905"],
      cheapestPrice: 200,
      featured: false,
      location: {
        type: "Point",
        coordinates: [13.4050, 52.5200]
      }
    },
    {
      name: "Kolkata Elegance",
      type: "Hotel",
      city: "Kolkata",
      address: "456 Elegance Rd",
      distance: "6km",
      photos: ["photo59.jpg", "photo60.jpg"],
      desc: "Experience the rich heritage of Kolkata.",
      rooms: ["3001", "3002", "3003", "3004", "3005"],
      cheapestPrice: 110,
      featured: true,
      location: {
        type: "Point",
        coordinates: [88.3639, 22.5726]
      }
    },
    {
      name: "Patna Comfort",
      type: "Hotel",
      city: "Patna",
      address: "789 Comfort St",
      distance: "4km",
      photos: ["photo61.jpg", "photo62.jpg"],
      desc: "Stay in the heart of Patna.",
      rooms: ["3101", "3102", "3103", "3104", "3105"],
      cheapestPrice: 90,
      featured: false,
      location: {
        type: "Point",
        coordinates: [85.1376, 25.5941]
      }
    },
    
]
const roomTypes = [
  {
    title: "Single Room",
    room_price: 100,
    maxPerson: 1,
    desc: "A cozy single room.",
    roomNumbers: Array.from({ length: 10 }, (_, i) => ({ number: 100 + i, unavailableDates: [] }))
  },
  {
    title: "Double Room",
    room_price: 150,
    maxPerson: 2,
    desc: "A comfortable double room.",
    roomNumbers: Array.from({ length: 10 }, (_, i) => ({ number: 200 + i, unavailableDates: [] }))
  },
  {
    title: "Suite",
    room_price: 250,
    maxPerson: 4,
    desc: "A luxurious suite.",
    roomNumbers: Array.from({ length: 10 }, (_, i) => ({ number: 300 + i, unavailableDates: [] }))
  }
];
const generateRoomsForHotel = async () => {
  const roomIds = [];
  for (const roomType of roomTypes) {
    const newRoom = new Room(roomType);
    const savedRoom = await newRoom.save();
    roomIds.push(savedRoom._id);
  }
  return roomIds;
};
const insertHotelsAndRooms = async () => {
  try {
    await Hotel.deleteMany({});
    await Room.deleteMany({});

    for (const hotel of hotels) {
      const roomIds = await generateRoomsForHotel();
      hotel.rooms = roomIds;
      const newHotel = new Hotel(hotel);
      await newHotel.save();
    }

    console.log('Hotels and rooms inserted successfully');
  } catch (err) {
    console.error('Error inserting hotels and rooms:', err);
  } finally {
    mongoose.disconnect();
  }
};

insertHotelsAndRooms();
