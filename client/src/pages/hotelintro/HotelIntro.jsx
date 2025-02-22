import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
const HotelIntro = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchHotelData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/hotels/${id}`);
                setHotel(response.data);
                console.log(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHotelData();
    }, [id]);
    if (loading) return (
        <div className="flex justify-center items-center h-full">
            <FaSpinner className="animate-spin text-indigo-600 text-2xl" />
        </div>
    )
    if (error) return <div className="text-center mt-20 text-xl text-red-500">Error loading data</div>;

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 mx-auto">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6 flex justify-center">
                        Welcome To {hotel?.name}</h2>
                    <div className="text-gray-600 mb-4">
                        <p className="mb-2"><b>Address:</b> {hotel?.address}</p>
                        <p className="mb-2"><b>City:</b> {hotel?.city}</p>
                        <p className="mb-2"><b>Description:</b> {hotel?.desc}</p>
                        <p className="mb-2"><b>Price per Night:</b> ${hotel?.cheapestPrice}</p>

                    </div>
                    <div className="flex justify-end">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300" onClick={() => navigate(`/hotel/${id}`)}>
                            Explore Rooms
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelIntro;