import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
const API_URL=process.env.NODE_ENV==='production'?'https://bookify-v2-2.onrender.com':'http://localhost:8080';
const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`${API_URL}/api/hotels/room/${hotelId}`);
  const { date } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(date[0]?.startDate, date[0]?.endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`${API_URL}/api/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="reserve  fixed bottom-10 left-96 ml-32 bg-slate-100 pl-20 pr-40 py-8  shadow-slate-700 shadow-xl">
      <div className="rContainer ">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose relative left-72 ml-28  "
          onClick={() => setOpen(false)}
        />
        <span className="font-bold text-xl flex justify-start mb-10 ml-20 ">Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle mt-2 font-bold">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax text-sm">
                Max people: <b>{item.maxPerson}</b>
              </div>
              <div className="rPrice font-extrabold">{item.room_price}</div>
            </div>
            <div className="rSelectRooms   relative  left-64 ml-7 ">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room relative  bottom-20 ml-2  ">
                  <label className="text-xs font-bold   ">{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                    className= "ml-1 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton  bg-blue-500 rounded-md px-8 py-2 text-white font-bold ml-24 cursor-pointer">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;