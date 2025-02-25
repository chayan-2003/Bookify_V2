import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar.jsx';
import { FaDownload, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import jsPDF from 'jspdf';

const BookingDetails = () => {
    const [search, setSearchDetails] = useState(null);
    const [user, setUserDetails] = useState(null);
    const [hotel, setHotelDetails] = useState(null);
    const [room, setRoomDetails] = useState(null);
    const { hotelId, roomId } = useParams();
    const [noofdays, setNoofdays] = useState(0);
    const [loading, setLoading] = useState(false);
    const API_URL = process.env.NODE_ENV === 'production' ? 'https://bookify-v2-2.onrender.com' : 'http://localhost:8080';

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

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/auth/profile`, {
                    headers: {
                        Authorization: ` ${localStorage.getItem('token')}`,
                    },
                });
                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        const fetchHotelDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/hotels/${hotelId}`, { withCredentials: true });
                setHotelDetails(response.data);
            } catch (error) {
                console.error("Error fetching hotel details:", error);
            }
        };

        const fetchRoomDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/rooms/${roomId}`, { withCredentials: true });
                setRoomDetails(response.data);
            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };

        fetchSearchDetails();
        fetchUserDetails();
        fetchHotelDetails();
        fetchRoomDetails();
    }, [hotelId, roomId]);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Hotel Booking Invoice', 20, 20);
        doc.setFontSize(12);

        doc.text(`Hotel Name: ${hotel.name}`, 20, 40);
        doc.text(`Address: ${hotel.address}`, 20, 50);
        doc.text(`City: ${hotel.city}`, 20, 60);
        doc.text(`Check-in Date: ${new Date(search.date[0]?.startDate).toLocaleDateString()}`, 20, 70);
        doc.text(`Check-out Date: ${new Date(search.date[0]?.endDate).toLocaleDateString()}`, 20, 80);
        doc.text(`Invoice Number: ${search.invoiceNumber}`, 20, 90);

        doc.text(`Name: ${user.username}`, 20, 110);
        doc.text(`Email: ${user.email}`, 20, 120);
        doc.text(`Phone: ${user.phone}`, 20, 130);
        doc.text(`Room Type: ${room.title}`, 20, 150);
        doc.text(`No of Days: ${noofdays}`, 20, 160);
        doc.text(`Total Amount: $${room.room_price * noofdays}`, 20, 170);

        return doc;
    };

    const handleDownloadReceipt = async () => {
        setLoading(true);
        const doc = generatePDF();
        const pdfBlob = doc.output('blob');

        try {
            const response = await axios.post(`${API_URL}/api/generate`, {
                guestName: user.username,
                checkIn: new Date(search.date[0]?.startDate).toLocaleDateString(),
                checkOut: new Date(search.date[0]?.endDate).toLocaleDateString(),
                roomType: room.title,
                totalAmount: room.room_price * noofdays,
                email: user.email
            }, {
                headers: {
                    Authorization: ` ${localStorage.getItem('token')}`,
                },
            });

            const { preSignedUrl } = response.data;

            await axios.put(preSignedUrl, pdfBlob, {
                headers: {
                    'Content-Type': 'application/pdf',
                },
            });

            doc.save(`invoice_${search.invoiceNumber}.pdf`);
        } catch (error) {
            console.error("Error generating and uploading bill:", error);
        } finally {
            setLoading(false);
        }
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
                            <p><b>Hotel Name:</b> {hotel.name}</p>
                            <p><b>Address:</b> {hotel.address}</p>
                            <p><b>City:</b> {hotel.city}</p>
                            <p><b>Check-in Date:</b> {new Date(search.date[0]?.startDate).toLocaleDateString()}</p>
                            <p><b>Check-out Date:</b> {new Date(search.date[0]?.endDate).toLocaleDateString()}</p>
                            <p><b>Invoice Number:</b> {search.invoiceNumber}</p>
                        </div>
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-xl font-bold">Bill To</h2>
                            <p><b>Name:</b> {user.username}</p>
                            <p><b>Email:</b> {user.email}</p>
                            <p><b>Phone:</b> {user.phone}</p>
                        </div>
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-xl font-bold">Room Details</h2>
                            <p><b>Room Type:</b> {room.title}</p>
                            <p><b>No of Days:</b> {noofdays}</p>
                            <p><b>Total Amount:</b> ${room.room_price * noofdays}</p>
                        </div>
                    </div>
                    <div className="mt-6 text-center flex justify-center ">
                        <button
                            onClick={handleDownloadReceipt}
                            disabled={loading}
                            className={`flex items-center justify-center ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-semibold py-2 px-4 rounded transition duration-200 ease-in-out`}
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <FaDownload className="mr-2" />
                                       Download Bill
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;