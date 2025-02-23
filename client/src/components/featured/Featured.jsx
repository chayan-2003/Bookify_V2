import React, { useEffect } from 'react';
import {useState }from 'react';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
const Featured = () => {
    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {  date, options, setSearch } = useContext(SearchContext);
    
    function clicked(city) {
        console.log(date, options);
        return () => {
            navigate('/hotels');
            setSearch({ city, date, options });
           
        };

    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const API_URL="https://bookify-v2-2.onrender.com";
                const response = await axios.get(`${API_URL}/api/hotels/countByCity`,
                    {
                        params: {
                            cities: "Berlin,New York,London"
                        }
                    });
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
   

    return (
        <div className="  featured grid grid-cols-1 md:grid-cols-3 gap-20 px-8 py-6  ">
            {loading ? (
              
                      <div className="flex justify-center items-center h-full">
                        <FaSpinner className="animate-spin text-indigo-600 text-2xl" />
                      </div>
                    )
            : (
                data && data.length >= 3 && (
                    <>
                        {["Berlin", "New York", "London"].map((city, i) => (
                            <div key={city} className="featuredItem relative" onClick={clicked(city)}>
                                <img 
                                    src={
                                        [
                                            "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/526000/526877-dublin.jpg",
                                            "https://hips.hearstapps.com/hmg-prod/images/gettyimages-688899881-1519413300.jpg?resize=1200:*",
                                            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/02/57/44/0c/filename-img-1097-jpg.jpg?w=700&h=-1&s=1"
                                        ][i]
                                    }
                                    alt={`${city}`}
                                    className="featuredImage rounded-xl shadow-lg border h-60 w-full object-cover"
                                />
                                <div className="featuredTitle absolute bottom-4 left-6 text-white">
                                    <h1 className="text-2xl font-serif font-bold">{city}</h1>
                                    <h2 className="text-lg">{data[i]} properties</h2>
                                </div>
                            </div>
                        ))}
                    </>
                )
            )}
        </div>
    );
};

export default Featured;
