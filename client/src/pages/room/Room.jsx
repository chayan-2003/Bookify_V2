import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';

const Room = () => {
    const { hotelId,roomId } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [roomNumbers, setRoomNumbers] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [bookingDates, setBookingDates] = useState([]);
    const [searchDetails, setSearchDetails] = useState(null);

    useEffect(() => {
        const fetchSearchDetails = () => {
            const savedSearchDetails = localStorage.getItem('searchState');
            if (savedSearchDetails) {
                const parsedDetails = JSON.parse(savedSearchDetails);
                setSearchDetails(parsedDetails);

                if (parsedDetails.date.length > 0) {
                    const startDate = new Date(parsedDetails.date[0].startDate);
                    const endDate = new Date(parsedDetails.date[0].endDate);
                    const tempDates = [];
                    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                        tempDates.push(new Date(d).toISOString().split('T')[0]);
                    }
                    setBookingDates(tempDates);
                }
            }
        };

        const fetchData = async () => {
            try {
                const API_URL=process.env.NODE_ENV==='production'?'https://bookify-v2-2.onrender.com':'http://localhost:8080';
                const response = await axios.get(`${API_URL}/api/rooms/${roomId}`);
                setRoom(response.data);
                setRoomNumbers(response.data.roomNumbers);
       
                setSearchDetails(prevDetails => {
                    const updatedDetails = { ...prevDetails, price: response.data.room_price };
                    localStorage.setItem('searchState', JSON.stringify(updatedDetails));
                    return updatedDetails;
                });
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchDetails();
        fetchData();
    }, [roomId]);

    if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;
    if (error) return <div className="text-center mt-20 text-xl text-red-500">Error loading data</div>;

    const handleRoomClick = (room) => {
        setSelectedRoom(room);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRoom(null);
    };

    const handleBookRoom = async () => {
        const API_URL="https://bookify-v2-2.onrender.com";
        if (!selectedRoom || bookingDates.length === 0) return;
        setShowModal(false);

        try {
            await axios.put(`${API_URL}/api/rooms/availability/${selectedRoom._id}`, {
                dates: bookingDates,
            });
            navigate(`/bookings/${hotelId}/${roomId}/invoice`);
        } catch (err) {
            console.error(err);
            alert('Failed to book the room.');
        }
    };

    const formatDate = (date) => {
        return date ? new Date(date).toLocaleDateString() : 'N/A';
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">{room?.title}</h2>
                    <p className="text-gray-600 mb-4">{room?.desc}</p>
                    <p className="text-gray-800 mb-2"><b>Price:</b> ${room?.room_price}</p>
                    <p className="text-gray-800 mb-2"><b>Max Persons:</b> {room?.maxPerson}</p>
                    <p className="text-gray-800 mb-2"><b>Created At:</b> {new Date(room?.createdAt).toLocaleDateString()}</p>
                    <p className="text-gray-800 mb-2"><b>Updated At:</b> {new Date(room?.updatedAt).toLocaleDateString()}</p>
                    <div className="roomNumbers mt-4">
                        <label className="text-gray-800"><b>Available Room Numbers:</b></label>
                        <div className="flex flex-wrap gap-4 mt-2">
                            {roomNumbers.map((room, i) => {
                                const unavailableDates = room.unavailableDates.map(date => new Date(date).toISOString().split('T')[0]);
                                const isAvailable = bookingDates.every(date => !unavailableDates.includes(date));
                                return (
                                    <div
                                        key={i}
                                        className={`p-4 border rounded shadow-md cursor-pointer ${isAvailable ? 'bg-green-100' : 'bg-red-100'}`}
                                        onClick={() => isAvailable && handleRoomClick(room)}
                                    >
                                        <p className="text-gray-800"><b>Room {room.number}</b></p>
                                        <p className="text-gray-600">{isAvailable ? 'Available' : 'Booked'}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {searchDetails && (
                    <div className="searchDetails mt-8 bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Search Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-gray-800"><b>City:</b> {searchDetails.city}</div>
                            <div className="text-gray-800"><b>Check-in:</b> {formatDate(searchDetails.date[0]?.startDate)}</div>
                            <div className="text-gray-800"><b>Check-out:</b> {formatDate(searchDetails.date[0]?.endDate)}</div>
                            <div className="text-gray-800"><b>Adults:</b> {searchDetails.options.adult}</div>
                            <div className="text-gray-800"><b>Children:</b> {searchDetails.options.children}</div>
                            <div className="text-gray-800"><b>Rooms:</b> {searchDetails.options.room}</div>
                        </div>
                    </div>
                )}
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Book Room</h2>
                        <p className="mb-4">Do you want to book room number {selectedRoom?.number}?</p>
                        <div className="flex justify-end">
                            <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2" onClick={handleCloseModal}>Cancel</button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleBookRoom}>Book</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Room;