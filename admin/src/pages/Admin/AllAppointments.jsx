import React, { useEffect, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import {
  FaUser,
  FaUserMd,
  FaCalendarAlt,
  FaMoneyBill,
  FaTimes,
} from "react-icons/fa";
import { MdCheckCircle, MdCancel } from "react-icons/md";

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } =
    useContext(AdminContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl mx-auto m-5 text-gray-700">
      <h1 className="text-2xl font-semibold text-[#0B0C60] mb-5 flex items-center gap-3">
        <FaCalendarAlt className="text-[#5f6fff]" /> All Appointments
      </h1>

      <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[0.4fr_2fr_1fr_2fr_2fr_1fr_1fr] px-6 py-3 bg-[#f7f8ff] font-semibold text-[#0B0C60] text-sm border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointment Rows */}
        <div className="max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#b7bbff] scrollbar-track-gray-100">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="grid md:grid-cols-[0.4fr_2fr_1fr_2fr_2fr_1fr_1fr] items-center px-6 py-4 border-b text-sm hover:bg-[#f9f9ff] transition-all duration-200"
            >
              {/* Index */}
              <p className="hidden md:block font-medium text-gray-500">
                {index + 1}
              </p>

              {/* Patient */}
              <div className="flex items-center gap-3">
                <img
                  src={item.userData.image}
                  alt={item.userData.name}
                  className="w-10 h-10 rounded-full border border-[#d5d9ff]"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {item.userData.name}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <FaUser className="text-[#5f6fff]" /> Patient
                  </p>
                </div>
              </div>

              {/* Age */}
              <p className="hidden md:block text-gray-600">
                {calculateAge(item.userData.dob)}
              </p>

              {/* Date & Time */}
              <div className="text-gray-600">
                <p className="font-medium">{slotDateFormat(item.slotDate)}</p>
                <p className="text-xs text-gray-500">{item.slotTime}</p>
              </div>

              {/* Doctor */}
              <div className="flex items-center gap-3">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-10 h-10 rounded-full border border-[#d5d9ff]"
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {item.docData.name}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <FaUserMd className="text-[#5f6fff]" />{" "}
                    {item.docData.speciality}
                  </p>
                </div>
              </div>

              {/* Fees */}
              <p className="font-semibold text-[#0B0C60] flex items-center gap-2">
                <FaMoneyBill className="text-green-500" /> {currency}
                {item.amount}
              </p>

              {/* Actions */}
              <div className="flex justify-center items-center gap-3">
                {item.cancelled ? (
                  <span className="flex items-center gap-1 text-red-500 font-medium text-xs">
                    <MdCancel /> Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="flex items-center gap-1 text-green-600 font-medium text-xs">
                    <MdCheckCircle /> Completed
                  </span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-600 font-medium text-xs rounded-full transition-all"
                  >
                    <FaTimes className="text-sm" /> Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
