import { format } from 'date-fns';
import React, { useState, useContext, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import Navbar from '../../components/navbar/Navbar';
import SearchItem from '../../components/searchItem/SearchItem';
import { SearchContext } from '../../context/SearchContext';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const List = () => {
  const { city, date, options, setSearch } = useContext(SearchContext);
  const [destination, setDestination] = useState(city);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://bookify-v2-2.onrender.com'
    : 'http://localhost:8080';

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/hotels?city=${city}&min=${min || 1}&max=${max || 40000}`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    getData();
  }, [city, min, max]);

  const handleClick = () => {
    setSearch({ city: destination, date, options });
    const getData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/hotels/search?city=${destination}&min=${min || 1}&max=${max || 40000}`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    getData();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Containerized Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
     

      <div className="ListContainer mx-auto max-w-screen-xl p-6">
        <div className="ListWrapper flex flex-col md:flex-row gap-8">

          {/* Search Section */}
          <div className="ListSearch bg-white rounded-lg shadow-xl p-6 w-full md:w-[320px]">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Search</h1>

            {/* Destination Input */}
            <div className="mb-6">
              <label className="block text-gray-600 font-semibold">Destination</label>
              <input
                value={destination}
                onChange={e => setDestination(e.target.value)}
                placeholder={city}
                type="text"
                className="w-full mt-2 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            {/* Date Picker */}
            <div className="mb-6">
              <label className="block text-gray-600 font-semibold">Check-in Date</label>
              <span
                onClick={() => setOpenDate(!openDate)}
                className="w-full mt-2 p-3 bg-white border border-gray-300 rounded-md cursor-pointer text-gray-600 flex justify-between items-center"
              >
                {date.length > 0 &&
                  `${format(new Date(date[0].startDate), "dd/MM/yyyy")} to ${format(new Date(date[0].endDate), "dd/MM/yyyy")}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setSearch({ city: destination, date: [item.selection], options })}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <div className="flex justify-between mb-3">
                <span className="text-gray-600 font-semibold">Min price</span>
                <input
                  type="number"
                  onChange={e => setMin(e.target.value)}
                  className="w-20 p-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-gray-600 font-semibold">Max price</span>
                <input
                  type="number"
                  onChange={e => setMax(e.target.value)}
                  className="w-20 p-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
            </div>

            <button
              onClick={handleClick}
              className="w-full py-3 bg-blue-600 text-white rounded-md text-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </div>

          {/* Results Section */}
          <div className="ListResult w-full md:flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <FaSpinner className="animate-spin text-indigo-600 text-2xl" />
              </div>
            ) : (
              data?.map(item => (
                <SearchItem item={item} key={item._id} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default List;
