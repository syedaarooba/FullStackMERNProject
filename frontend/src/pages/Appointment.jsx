import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaCalendarAlt,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } =
    useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docInfo, setDocInfo] = useState(false);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(null);
  const [slotTime, setSlotTime] = useState("");

  const timeScrollRef = useRef(null);
  const dateScrollRef = useRef(null);
  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Please login to book an appointment");
      return navigate("/login");
    }

    const date = docSlots[slotIndex][0].datetime;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const slotDate = `${day}_${month}_${year}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctosData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const scrollLeft = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: -250, behavior: "smooth" });
  };
  const scrollRight = (ref) => {
    if (ref.current) ref.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  useEffect(() => {
    if (doctors.length > 0) fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="p-4 md:p-10">
        {/* ---------- Doctor Details ----------- */}
        <div className="flex flex-col sm:flex-row gap-6">
          <img
            className="w-full sm:max-w-72 rounded-2xl shadow-lg object-cover"
            src={docInfo.image}
            alt={docInfo.name}
          />
          <div className="flex-1 border border-gray-100 rounded-2xl p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <p className="flex items-center gap-2 text-3xl font-bold text-gray-800">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <p className="text-gray-600 mt-2">
              {docInfo.degree} • {docInfo.speciality}
              <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                {docInfo.experience}
              </span>
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              {docInfo.about}
            </p>
            <p className="text-gray-700 font-semibold mt-4">
              Fee:{" "}
              <span className="text-gray-900">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* ---------- Booking Section ----------- */}
        <div className="mt-12">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-700 mb-4">
            <FaCalendarAlt className="text-blue-600" /> Select Date
          </h2>

          {/* Date Scroll */}
          <div className="relative">
            <div
              ref={dateScrollRef}
              className="flex gap-3 overflow-x-auto pb-3 px-1 scroll-smooth hide-scroll"
            >
              {docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`min-w-[70px] text-center rounded-2xl py-4 px-3 shadow-sm cursor-pointer transition-all duration-300 ${
                    slotIndex === index
                      ? "bg-blue-600 text-white scale-105 shadow-md"
                      : "bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <p className="font-semibold">
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Select Time Section ---------- */}
          {slotIndex !== null && (
            <>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mt-8 mb-3">
                <FaClock className="text-blue-600" /> Select Time
              </h3>

              <div className="relative flex items-center w-full max-w-4xl mx-auto">
                {/* Left Arrow */}
                <button
                  onClick={() => scrollLeft(timeScrollRef)}
                  className="absolute -left-5 md:-left-8 z-20 bg-white border border-gray-300 shadow-md hover:shadow-lg rounded-full p-2 flex items-center justify-center transition-all duration-200"
                >
                  <FaChevronLeft className="text-gray-600 hover:text-blue-600" />
                </button>

                {/* Fading Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

                {/* Scrollable Time Slots */}
                <div
                  ref={timeScrollRef}
                  className="flex gap-3 overflow-x-auto px-8 py-2 scroll-smooth hide-scroll"
                >
                  {docSlots[slotIndex].map((item, index) => (
                    <p
                      key={index}
                      onClick={() => setSlotTime(item.time)}
                      className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap transition-all duration-200 ${
                        slotTime === item.time
                          ? "bg-blue-600 text-white shadow-md scale-105"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-sm"
                      }`}
                    >
                      {item.time}
                    </p>
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={() => scrollRight(timeScrollRef)}
                  className="absolute -right-5 md:-right-8 z-20 bg-white border border-gray-300 shadow-md hover:shadow-lg rounded-full p-2 flex items-center justify-center transition-all duration-200"
                >
                  <FaChevronRight className="text-gray-600 hover:text-blue-600" />
                </button>
              </div>
            </>
          )}

          <button
            onClick={bookAppointment}
            disabled={slotIndex === null || !slotTime}
            className={`w-full sm:w-auto mt-10 px-10 py-3 rounded-full font-semibold shadow-md transition-all ${
              slotIndex !== null && slotTime
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Book Appointment
          </button>
        </div>

        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </div>
    )
  );
};

export default Appointment;
