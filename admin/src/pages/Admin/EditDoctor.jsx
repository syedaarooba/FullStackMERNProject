import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaEnvelope,
  FaLock,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaFileMedical,
  FaMoneyBillWave,
  FaCamera,
} from "react-icons/fa";

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const { aToken, getAllDoctors } = useContext(AdminContext);

  // states (same)
  const [docImg, setDocImg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  // fetch doctor data (same)
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/admin/get-doctor/${id}`,
          { headers: { aToken } }
        );

        if (data.success) {
          const doc = data.doctor;
          setName(doc.name);
          setEmail(doc.email);
          setExperience(doc.experience);
          setFees(doc.fees);
          setAbout(doc.about);
          setSpeciality(doc.speciality);
          setDegree(doc.degree);
          setAddress1(doc.address.line1 || "");
          setAddress2(doc.address.line2 || "");
          setDocImg(doc.image);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to fetch doctor details");
        console.log(error);
      }
    };

    if (aToken) fetchDoctor();
  }, [id, aToken, backendUrl]);

  // submit handler (same)
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      if (docImg instanceof File) {
        formData.append("image", docImg);
      }
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.put(
        `${backendUrl}/api/admin/update-doctor/${id}`,
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success("Doctor Updated Successfully!");
        getAllDoctors();
        navigate("/doctor-list");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="w-full px-3 sm:px-6 md:px-10 py-4 sm:py-6">
      <form onSubmit={onSubmitHandler} className="w-full max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* HEADER */}
          <div className="flex items-center gap-3 px-4 sm:px-6 md:px-8 py-4 sm:py-5 border-b bg-gradient-to-r from-blue-50 to-white">
            <div className="p-2 sm:p-3 rounded-xl bg-blue-100 text-blue-600">
              <FaUserMd className="text-xl sm:text-2xl" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-[#0B0C60]">
                Update Doctor
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Edit doctor profile and clinic details
              </p>
            </div>
          </div>

          {/* BODY */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* Upload Image Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-8">
              <label
                htmlFor="doc-img"
                className="cursor-pointer relative group"
              >
                <img
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover bg-[#f6f7ff] rounded-full border-4 border-white shadow-md ring-2 ring-[#5f6fff] group-hover:opacity-90 transition"
                  src={
                    docImg
                      ? docImg instanceof File
                        ? URL.createObjectURL(docImg)
                        : docImg
                      : assets.upload_area
                  }
                  alt="upload"
                />
                <div className="absolute bottom-1 right-1 bg-[#5f6fff] p-2 rounded-full shadow-md">
                  <FaCamera className="text-white text-sm sm:text-base" />
                </div>
                <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition" />
              </label>

              <input
                type="file"
                id="doc-img"
                hidden
                onChange={(e) => setDocImg(e.target.files[0])}
              />

              <div className="text-center sm:text-left">
                <p className="text-gray-700 font-medium">
                  Doctor Photo <span className="text-red-500">*</span>
                </p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Click the photo to upload a new image
                </p>
              </div>
            </div>

            {/* Form grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7">
              {/* LEFT */}
              <div className="space-y-4 sm:space-y-5">
                {/* Name */}
                <div className="space-y-1">
                  <label className="font-medium flex items-center gap-2 text-gray-700">
                    <FaUserMd className="text-[#5f6fff]" /> Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 text-sm sm:text-base
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="font-medium flex items-center gap-2 text-gray-700">
                    <FaEnvelope className="text-[#5f6fff]" /> Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 text-sm sm:text-base
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <label className="font-medium flex items-center gap-2 text-gray-700">
                    <FaLock className="text-[#5f6fff]" /> Password (optional)
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 text-sm sm:text-base
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                  />
                </div>

                {/* Experience */}
                <div className="space-y-1">
                  <label className="font-medium flex items-center gap-2 text-gray-700">
                    <FaFileMedical className="text-[#5f6fff]" /> Experience
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 text-sm sm:text-base
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={`${i + 1} Year`}>
                        {i + 1} Year{i + 1 > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fees */}
                <div className="space-y-1">
                  <label className="font-medium flex items-center gap-2 text-gray-700">
                    <FaMoneyBillWave className="text-[#5f6fff]" /> Consultation
                    Fee
                  </label>
                  <input
                    type="number"
                    min={5}
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 text-sm sm:text-base
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                  />
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-4 sm:space-y-5">
                {/* Speciality */}
                <div className="space-y-1">
                  <label className="font-medium flex items-center gap-2 text-gray-700">
                    <FaUserMd className="text-[#5f6fff]" /> Speciality
                  </label>
                  <select
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 text-sm sm:text-base
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                  >
                    <option value="General physician">General physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatricians">Pediatricians</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">
                      Gastroenterologist
                    </option>
                  </select>
                </div>

                {/* Degree */}
                <div className="space-y-1">
                  <label className="font-medium flex items-center gap-2 text-gray-700">
                    <FaGraduationCap className="text-[#5f6fff]" /> Degree
                  </label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 text-sm sm:text-base
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="font-medium flex items-center gap-2 text-gray-700">
                    <FaMapMarkerAlt className="text-[#5f6fff]" /> Clinic Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address line 1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 text-sm sm:text-base
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Address line 2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 text-sm sm:text-base
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="mt-6 sm:mt-7 space-y-2">
              <label className="font-medium flex items-center gap-2 text-gray-700">
                <FaFileMedical className="text-[#5f6fff]" /> About Doctor
              </label>
              <textarea
                rows={5}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-3 text-sm sm:text-base
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white resize-none"
                placeholder="Write about doctor..."
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#5f6fff] hover:bg-[#4b56e2] text-white px-8 sm:px-10 py-3 rounded-full font-semibold
                           transition-all duration-300 shadow-md flex items-center gap-2 justify-center"
              >
                <FaUserMd className="text-white text-lg" /> Update Doctor
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto border border-gray-200 hover:border-gray-300 text-gray-700 px-8 sm:px-10 py-3 rounded-full font-semibold
                           transition-all duration-300 flex items-center gap-2 justify-center bg-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditDoctor;
