import { faBed, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
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
    const token = localStorage.getItem('token');

    const handleOption = (name, operation) => {
        setOptions(prev => ({
            ...prev,
            [name]: operation === "i" ? options[name] + 1 : Math.max(options[name] - 1, 0),
        }));
    };

    const handleSearch = () => {
        setSearch({ city: destination, date, options });
        navigate("/hotels");
    };

    return (
        <div className="header px-4 md:px-12 pt-8 pb-10 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
            <div className="headerContainer max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-center sm:text-left">Find Your Perfect Stay</h1>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-center sm:text-left">Book hotels, flights, and more with ease and security.</p>

                <div className="mt-6 flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-4">
                    {!token && (
                        <button
                            className="px-5 py-2 bg-yellow-500 rounded-full shadow-md hover:bg-yellow-400 transition font-medium w-full sm:w-auto"
                            onClick={() => navigate("/login")}
                        >
                            Sign in
                        </button>
                    )}
                    <button
                        className="px-5 py-2 bg-yellow-500 rounded-full shadow-md hover:bg-yellow-400 transition font-medium w-full sm:w-auto"
                        onClick={() => navigate("/search")}
                    >
                        GeoSearch
                    </button>
                </div>

                <div className="headerSearch mt-6 bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row md:items-center gap-4 text-black">
                    <div className="flex items-center w-full md:w-1/4 relative">
                        <FontAwesomeIcon icon={faBed} />
                        <input
                            type="text"
                            placeholder="Where are you going?"
                            className="ml-3 p-2 w-full outline-none"
                            onChange={e => setDestination(e.target.value)}
                        />
                    </div>

                    <div className="w-full md:w-1/3 relative">
                        <div className="flex items-center cursor-pointer" onClick={() => setOpenDate(!openDate)}>
                            <FontAwesomeIcon icon={faCalendarDays} />
                            <span className="ml-3">
                                {format(date[0].startDate, "dd/MM/yyyy")} - {format(date[0].endDate, "dd/MM/yyyy")}
                            </span>
                        </div>
                        {openDate && (
                            <div className="absolute z-20 mt-2 left-0 min-w-full">
                                <DateRange
                                    onChange={item => setDate([item.selection])}
                                    ranges={date}
                                    minDate={new Date()}
                                    className="rounded-lg shadow-lg border p-2 text-black"
                                />
                            </div>
                        )}
                    </div>

                    <div className="w-full md:w-1/3 relative">
                        <div className="flex items-center cursor-pointer" onClick={() => setOpenOptions(!openOptions)}>
                            <FontAwesomeIcon icon={faPerson} />
                            <span className="ml-3">{options.adult} Adult · {options.children} Children · {options.room} Room</span>
                        </div>
                        {openOptions && (
                            <div className="absolute bg-white text-black shadow-md rounded-lg p-4 mt-2 z-20 w-full">
                                {["adult", "children", "room"].map((type, idx) => (
                                    <div key={idx} className="flex justify-between items-center mb-2">
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

                    <div className="w-full md:w-auto">
                        <button
                            onClick={handleSearch}
                            className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
