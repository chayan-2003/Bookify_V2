import React from 'react';
import useFetch from '../../hooks/useFetch';

const FeaturedProperties = () => {
    const { data, loading } = useFetch("http://localhost:8080/api/hotels");
    const images = [
        "https://media-cdn.tripadvisor.com/media/vr-splice-j/02/fd/34/58.jpg",
        "https://www.hotelscombined.in/himg/72/65/11/leonardo-67120291-Tower_178558_O-359871.jpg",
        "https://assets.simpleviewinc.com/simpleview/image/upload/c_fit,w_1000,h_800/crm/cooperstownny/13090501_27_0_a0f2590b-5056-a36a-076e7c5cf8418ac0.jpg",
        "https://ak-d.tripcdn.com/images/200t10000000og9nd2120_R_960_660_R5_D.jpg"
    ];

    return (
        <div className="fp grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10 py-8">
            {loading ? (
                <div className="flex justify-center items-center w-full">
                    <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
                </div>
            ) : (
                data && images.map((img, i) => (
                    <div key={i} className="fpItem bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4" 
                        onClick={() => window.location.href = `/hotel/${data[i]?._id}`}>
                        <img src={img} alt={`Property ${i}`} className="fpImg rounded-md h-52 w-full object-cover mb-4" />
                        <h1 className="fpName font-bold text-lg mb-2">{data[i]?.name}</h1>
                        <span className="fpCity text-gray-600 block">{data[i]?.city}</span>
                        <span className="fpPrice text-gray-800 font-semibold block mt-2">
                            Starting from ${data[i]?.cheapestPrice}
                        </span>
                        {data[i]?.rating && (
                            <div className="fpRating flex items-center mt-2">
                                <button className="fpbutton bg-blue-500 text-white px-2 py-1 rounded-sm mr-2">
                                    {data[i]?.rating}
                                </button>
                                <span className="text-gray-500">Excellent</span>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default FeaturedProperties;
