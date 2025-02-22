import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
const Hotel = () => {
  const url = new URL(window.location.href);
  const hotelId = url.pathname.split('/').pop();

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hotelData, setHotelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/hotels/${hotelId}`);
        setHotelData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [hotelId]);



    
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("INSIDE TRY BLOCK");
        const response = await axios.get(`http://localhost:8080/api/hotels/rooms/${hotelId}`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [hotelId]);

  if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-xl text-red-500">Error loading data</div>;

  return (
    <div>
      <Navbar />
      <div className="hotelRoomspx-4 bg-gradient-to-r from-blue-600 to-purple-700 min-h-screen px-4 ">
     
        <h2 className="text-3xl font-bold text-white text-center mb-8 pt-10">{
          hotelData.name}</h2>
        <div className="roomsList grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((room, i) => (
            <div
              key={i}
              className="roomItem p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              onClick={() => navigate(`/room/${hotelId}/${room._id}`)}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{room.title}</h3>
              <p className="text-gray-600 mb-4">{room.desc}</p>
              <p className="text-gray-800 mb-2"><b>Price:</b> ${room.room_price}</p>
              <p className="text-gray-800"><b>Max Persons:</b> {room.maxPerson}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hotel;