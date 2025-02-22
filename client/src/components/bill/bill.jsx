import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar.jsx';
import { FaDownload } from 'react-icons/fa';

const BookingDetails = () => {
    const [search, setSearchDetails] = useState(null);
    const [user, setUserDetails] = useState(null);
    const [hotel, setHotelDetails] = useState(null);
    const [room, setRoomDetails] = useState(null);
    const { hotelId, roomId } = useParams();
    const [noofdays, setNoofdays] = useState(0);
    useEffect(() => {
        const fetchSearchDetails = () => {
            const savedSearchDetails = localStorage.getItem('searchState');
            if (savedSearchDetails) {
                const parsedDetails = JSON.parse(savedSearchDetails);
                setSearchDetails(parsedDetails);
                const startDate = new Date(parsedDetails.date[0]?.startDate);
                const endDate = new Date(parsedDetails.date[0]?.endDate);
                const days = (endDate - startDate) / (1000 * 3600 * 24);
                setNoofdays(days);
            }
        };

        const fetchUserDetails = () => {
            const savedUserDetails = localStorage.getItem('userInfo');
            if (savedUserDetails) {
                const parsedUserDetails = JSON.parse(savedUserDetails);
                setUserDetails(parsedUserDetails);
            }
        };

        const fetchHotelDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/hotels/${hotelId}`);
                const data = await response.json();
                setHotelDetails(data);
            } catch (error) {
                console.error("Error fetching hotel details:", error);
            }
        };

        const fetchRoomDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/rooms/${roomId}`);
                const data = await response.json();
                setRoomDetails(data);
            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };

        fetchSearchDetails();
        fetchUserDetails();
        fetchHotelDetails();
        fetchRoomDetails();
    }, [hotelId, roomId, search]);

    const handleDownloadReceipt = () => {
        alert('Downloading bill receipt...');
    };

    if (!search || !user || !hotel || !room) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-xl text-gray-500">Loading booking details...</p>
            </div>
        );
    }
    
   

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Hotel Booking Invoice</h1>
                    <div className="space-y-4">
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-xl font-bold">Hotel Details</h2>
                            <p><b>Hotel Name:</b> {hotel.name || ""}</p>
                            <p><b>Address:</b> {hotel.address || ""}</p>
                            <p><b>City:</b> {hotel.city || ""}</p>
                            <p><b>Check-in Date:</b> {new Date(search.date[0]?.startDate).toLocaleDateString() || ""}</p>
                            <p><b>Check-out Date:</b> {new Date(search.date[0]?.endDate).toLocaleDateString() || ""}</p>
                            <p><b>Invoice Number:</b> {search.invoiceNumber || ""}</p>
                        </div>
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-xl font-bold">Bill To</h2>
                            <p><b>Name:</b> {user.name || ""}</p>
                            <p><b>Email:</b> {user.email || ""}</p>
                            <p><b>Phone:</b> {user.phone || ""}</p>
                            <p><b>Address:</b> {user.address || ""}</p>
                        </div>
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-xl font-bold">Room Details</h2>
                            <p><b>Room Type:</b> {room.title || ""}</p>
                            <p><b>Adults:</b> {search.options?.adult || ""}</p>
                            <p><b>Children:</b> {search.options?.children || ""}</p>
                            <p><b>Rooms:</b> {search.options?.room || ""}</p>
                        </div>
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-xl font-bold">Total Amount</h2>
                            <p><b>Amount:</b> ${room.room_price || ""}</p>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <button
                            onClick={handleDownloadReceipt}
                            className="bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-indigo-700 transition"
                        >
                            <FaDownload className="inline mr-2" /> Download Bill Receipt
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;