import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import {
  FaTrashAlt,
  FaEdit,
  FaUserMd,
  FaEnvelope,
  FaBriefcase,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } =
    useContext(AdminContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ✅ Delete Doctor
  const deleteDoctor = async (docId) => {
    try {
      if (!window.confirm("Are you sure you want to delete this doctor?"))
        return;

      const { data } = await axios.delete(
        `${backendUrl}/api/admin/delete-doctor/${docId}`,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success("Doctor deleted successfully!");
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // ✅ Update Doctor
  const updateDoctor = async (docId) => {
    const newName = prompt("Enter updated doctor name:");
    if (!newName) return toast.info("Update cancelled.");

    try {
      const { data } = await axios.put(
        `${backendUrl}/api/admin/update-doctor/${docId}`,
        { name: newName },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success("Doctor updated successfully!");
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#c5c8ff] scrollbar-track-gray-100">
      <h1 className="text-3xl font-bold text-[#0B0C60] flex items-center gap-3 mb-8">
        <FaUserMd className="text-[#5f6fff]" /> Doctor Management
      </h1>

      <div className="w-full flex flex-wrap justify-start gap-8">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-full sm:w-[300px] lg:w-[260px]"
          >
            {/* Image Section */}
            <div className="relative">
              <img
                className="w-full h-48 object-contain bg-[#f6f7ff] p-2 transition-transform duration-500 group-hover:scale-105"
                src={item.image}
                alt={item.name}
              />
              <span
                className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${
                  item.available
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {item.available ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Doctor Info */}
            <div className="p-5 text-gray-700 flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-[#0B0C60] flex items-center gap-2">
                <FaUserMd className="text-[#5f6fff]" /> {item.name}
              </h2>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <FaBriefcase className="text-[#5f6fff]" /> {item.speciality}
              </p>
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <FaEnvelope className="text-[#5f6fff]" /> {item.email}
              </p>

              {/* Availability Toggle */}
              <div className="mt-2 flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={() => changeAvailability(item._id)}
                    className="w-4 h-4 accent-[#5f6fff] cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">
                    Toggle Availability
                  </span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/edit-doctor/${item._id}`)}
                  className="flex items-center gap-2 bg-[#5f6fff] hover:bg-[#4b56e2] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-300 hover:shadow-lg"
                  title="Edit Doctor"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => deleteDoctor(item._id)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-300 hover:shadow-lg"
                  title="Delete Doctor"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
