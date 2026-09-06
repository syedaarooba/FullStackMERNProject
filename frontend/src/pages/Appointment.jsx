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
import { FiCheckCircle, FiShield } from "react-icons/fi";

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
          docInfo.slots_booked &&
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
      <div className="py-6 sm:py-10">
        
        {/* ---------- Doctor Details Card ----------- */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start">
          
          {/* Doctor Image */}
          <div className="w-full md:w-72 flex-shrink-0 bg-gradient-to-b from-emerald-50/60 to-slate-100/60 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl overflow-hidden p-2 flex items-center justify-center">
            <img
              className="w-full h-72 object-cover object-top rounded-xl"
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {docInfo.name}
                </h1>
                <img className="w-5" src={assets.verified_icon} alt="Verified" />
              </div>

              <div className="flex flex-wrap items-center gap-2.5 mt-2">
                <span className="text-sm font-semibold text-primary dark:text-accent-mint">
                  {docInfo.speciality}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {docInfo.degree}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-primary-50 dark:bg-slate-800 text-primary dark:text-accent-mint">
                  {docInfo.experience}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                About Specialist
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {docInfo.about}
              </p>
            </div>

            <div className="pt-3 flex items-center gap-3">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Appointment Fee:
              </span>
              <span className="text-lg font-extrabold text-primary dark:text-accent-mint bg-primary-50 dark:bg-slate-800 px-3.5 py-1 rounded-xl">
                {currencySymbol}{docInfo.fees}
              </span>
            </div>
          </div>

        </div>

        {/* ---------- Booking Section ----------- */}
        <div className="mt-12 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white mb-5">
            <FaCalendarAlt className="text-primary dark:text-accent-mint" /> 
            <span>Select Appointment Date</span>
          </h2>

          {/* Date Scroll List */}
          <div className="relative">
            <div
              ref={dateScrollRef}
              className="flex gap-3 overflow-x-auto pb-3 px-1 scroll-smooth hide-scroll"
            >
              {docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime("");
                  }}
                  className={`min-w-[76px] sm:min-w-[85px] text-center rounded-2xl py-4 px-3 cursor-pointer transition-all duration-300 border ${
                    slotIndex === index
                      ? "bg-gradient-to-tr from-primary to-teal-600 text-white border-primary shadow-lg shadow-primary/25 scale-105"
                      : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary-400 dark:hover:border-primary-400"
                  }`}
                >
                  <p className="text-xs font-bold tracking-wider uppercase opacity-80">
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="text-xl font-extrabold mt-1">
                    {item[0] && item[0].datetime.getDate()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Select Time Section ---------- */}
          {slotIndex !== null && (
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-4">
                <FaClock className="text-primary dark:text-accent-mint" /> 
                <span>Select Time Slot</span>
              </h3>

              <div className="relative flex items-center w-full max-w-4xl">
                {/* Left Arrow */}
                <button
                  onClick={() => scrollLeft(timeScrollRef)}
                  className="absolute -left-3 md:-left-5 z-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md rounded-full p-2.5 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-primary transition"
                >
                  <FaChevronLeft size={12} />
                </button>

                {/* Scrollable Time Slots */}
                <div
                  ref={timeScrollRef}
                  className="flex gap-2.5 overflow-x-auto px-6 py-2 scroll-smooth hide-scroll"
                >
                  {docSlots[slotIndex].length === 0 ? (
                    <p className="text-sm text-slate-400 py-2">No slots available for this day.</p>
                  ) : (
                    docSlots[slotIndex].map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setSlotTime(item.time)}
                        className={`px-5 py-2 rounded-full text-xs font-bold cursor-pointer whitespace-nowrap transition-all duration-200 border ${
                          slotTime === item.time
                            ? "bg-gradient-to-r from-primary to-teal-600 text-white border-primary shadow-md shadow-primary/20 scale-105"
                            : "bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                        }`}
                      >
                        {item.time}
                      </button>
                    ))
                  )}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={() => scrollRight(timeScrollRef)}
                  className="absolute -right-3 md:-right-5 z-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md rounded-full p-2.5 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-primary transition"
                >
                  <FaChevronRight size={12} />
                </button>
              </div>
            </div>
          )}

          {/* Book Appointment CTA */}
          <div className="mt-8 pt-4">
            <button
              onClick={bookAppointment}
              disabled={slotIndex === null || !slotTime}
              className={`w-full sm:w-auto px-10 py-3.5 rounded-full text-sm font-bold shadow-lg transition-all duration-200 active:scale-95 ${
                slotIndex !== null && slotTime
                  ? "bg-gradient-to-r from-primary to-teal-600 hover:from-primary-600 hover:to-teal-700 text-white shadow-primary/25 hover:shadow-glow cursor-pointer"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none"
              }`}
            >
              {slotTime ? `Confirm Booking for ${slotTime}` : "Select Slot to Book"}
            </button>
          </div>

        </div>

        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </div>
    )
  );
};

export default Appointment;

