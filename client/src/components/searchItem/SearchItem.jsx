import React from 'react'
import { Link } from 'react-router-dom'

const SearchItem = ({item}) => {
    return (
        <div className="searchItem flex border-4 mt-4 ">
            <img src={item?.photos[0]} alt="" className="siImg mr-3 mt-5 h-44 w-40 ml-2" />
            <div className="siDesc flex-col ">
                <h1 className="siTitle mt-4 text-2xl font-bold text-blue-600">{item?.name}</h1>
                <h1 className="siDistance mb-4">{item?.distance}m</h1>
                <span className="siTaxiOp bg-green-600 text-white border-2 border-blue-950 rounded px-2 py-1 ">Free airport taxi</span>
                <h1 className="siSubtitle font-bold mt-2">
                    Studio Apartment with Air conditioning
                </h1>
                <div class="flex-col">
                <div className="siFeatures mt-2">
                    {item?.desc}
                </div>
                <div className="siCancelOp text-green-800 font-bold mt-2">Free cancellation </div>
                <div className="siCancelOpSubtitle text-green-600 font-semibold mt-2 mb-4">
                    You can cancel later, so lock in this great price today!
                </div>
                </div>
            </div>
            <div className="siDetails mr-2 ml-8 ">
                {item?.rating && <div className="siRating mt-4">
                    <span className="mr-20 text-lg font-bold ">Excellent </span>
                    <button className="bg-blue-900 text-white p-1">{item?.rating}</button>
                </div>}
                <div className="siDetailTexts flex-col mt-20 ml-10 ">
                    <div className="siPrice flex justify-end text-2xl  relative bottom-10 font-bold">${item?.cheapestPrice}</div>
                    < div className="siTaxOp text-gray-500 text-sm relative bottom-7">Includes taxes and fees</div>
                    <Link to={`/hotels/${item._id}`}>
                    <button className="siCheckButton bg-blue-700 text-white border-2 rounded p-2 px-4 border-gray-600 mb-4">See availability</button>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default SearchItem