import { faBed, faCalendarDays,faPerson } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';

const Header = () => {
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
    const navigate = useNavigate();
    const { setSearch } = useContext(SearchContext);

    const handleOption = (name, operation) => {
        setOptions(prev => ({
            ...prev,
            [name]: operation === "i" ? options[name] + 1 : Math.max(options[name] - 1, 0),
        }));
    };

    const handleSearch = () => {
        setSearch({
            city: destination,
            date,
            options,
        });
        navigate("/hotels");
    };

    return (
        <div className="header pl-12 pt-8 pb-10 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <div className="headerContainer">
                <h1 className="text-4xl font-bold mt-10">Find Your Perfect Stay</h1>
                <p className="mt-4 text-lg">Book hotels, flights, and more with ease and security.</p>
                <button className="mt-6 px-6 py-2 bg-yellow-500 rounded-full shadow-md hover:bg-yellow-400 transition font-medium" 
                    onClick={() => navigate("/login")}>
                    Sign in 
                </button>
                <button className="mt-6 px-6 py-2 ml-7 bg-yellow-500 rounded-full shadow-md hover:bg-yellow-400 transition font-medium"
                    onClick={() => navigate("/search")}>
                    GeoSearch
                </button>
                <div className="headerSearch mt-8 flex items-center bg-white rounded-lg shadow-lg p-4 mr-10">
                    <div className="flex-1">
                        <FontAwesomeIcon icon={faBed} />
                        <input type="text" placeholder="Where are you going?" className="ml-4 p-2 outline-none w-full text-black" onChange={e => setDestination(e.target.value)} />
                    </div>
                    <div className="flex-1 text-black relative">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <span
                            className="ml-4 cursor-pointer"
                            onClick={() => setOpenDate(!openDate)}
                        >
                            {format(date[0].startDate, "dd/MM/yyyy")} - {format(date[0].endDate, "dd/MM/yyyy")}
                        </span>
                        {openDate && (
                            <div className="absolute top-full mt-2 left-0 z-10">
                                <DateRange
                                    onChange={item => setDate([item.selection])}
                                    ranges={date}
                                    minDate={new Date()}
                                    className="rounded-lg shadow-lg border p-2 text-black"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 text-black">
                        <FontAwesomeIcon icon={faPerson} />
                        <span className="ml-4 cursor-pointer" onClick={() => setOpenOptions(!openOptions)}>
                            {options.adult} Adult · {options.children} Children · {options.room}
                        </span>
                        {openOptions && (
                            <div className="absolute bg-white shadow-md rounded-lg p-4">
                                {["adult", "children", "room"].map((type, idx) => (
                                    <div key={idx} className="flex justify-between mb-2">
                                        <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                                        <div>
                                            <button onClick={() => handleOption(type, "d")} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                                            <span className="mx-2">{options[type]}</span>
                                            <button onClick={() => handleOption(type, "i")} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button onClick={handleSearch} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;