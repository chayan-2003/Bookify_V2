import React from 'react';
import { Link } from 'react-router-dom';

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem flex flex-col sm:flex-row border-2 mt-4 p-4 rounded-md shadow-md bg-white gap-4">
      <img
        src={item?.photos[0]}
        alt=""
        className="h-48 w-full sm:w-40 object-cover rounded-md"
      />

      <div className="flex flex-col justify-between flex-grow sm:w-2/3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-blue-600">{item?.name}</h1>
          <p className="text-gray-600">{item?.distance}m from center</p>
          <span className="inline-block mt-2 bg-green-600 text-white text-sm rounded px-2 py-1">
            Free airport taxi
          </span>
          <h2 className="mt-3 font-semibold text-gray-800">
            Studio Apartment with Air conditioning
          </h2>
          <p className="text-sm text-gray-700 mt-1">{item?.desc}</p>
          <p className="text-green-700 font-semibold mt-2">Free cancellation</p>
          <p className="text-green-600 text-sm mt-1">
            You can cancel later, so lock in this great price today!
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between sm:w-1/4 text-right">
        {item?.rating && (
          <div className="flex items-center justify-between w-full sm:justify-end mt-2 sm:mt-0">
            <span className="font-semibold mr-2">Excellent</span>
            <button className="bg-blue-900 text-white px-2 py-1 rounded">
              {item?.rating}
            </button>
          </div>
        )}

        <div className="mt-4 sm:mt-12">
          <p className="text-2xl font-bold text-gray-800">${item?.cheapestPrice}</p>
          <p className="text-gray-500 text-sm">Includes taxes and fees</p>
          <Link to={`/hotels/${item._id}`}>
            <button className="mt-3 bg-blue-700 hover:bg-blue-800 transition text-white rounded px-4 py-2 text-sm">
              See availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
