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

  // states
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

  // fetch doctor data
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/admin/get-doctor/${id}`,
          {
            headers: { aToken },
          }
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
  }, [id, aToken]);

  // submit handler
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
        {
          headers: { aToken },
        }
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
    <form
      onSubmit={onSubmitHandler}
      className="m-3 sm:m-5 w-full flex justify-center overflow-y-auto max-h-[90vh]"
    >
      <div className="bg-white w-full max-w-5xl p-6 sm:p-10 rounded-2xl shadow-lg border border-gray-100">
        {/* ---------- HEADER ---------- */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#0B0C60] mb-6 border-b pb-3 flex items-center gap-3">
          <FaUserMd className="text-[#5f6fff] text-2xl sm:text-3xl" />
          Update Doctor
        </h2>

        {/* ---------- Upload Image Section ---------- */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-10">
          <label htmlFor="doc-img" className="cursor-pointer relative">
            <img
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain bg-[#f6f7ff] p-2 rounded-full border-2 border-[#5f6fff] hover:opacity-80 transition"
              src={
                docImg
                  ? docImg instanceof File
                    ? URL.createObjectURL(docImg)
                    : docImg
                  : assets.upload_area
              }
              alt="upload"
            />
            <FaCamera className="absolute bottom-1 right-1 text-white bg-[#5f6fff] p-1 text-lg rounded-full" />
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />
          <p className="text-gray-600 text-sm text-center sm:text-left">
            Click the circle to upload <br /> doctor picture{" "}
            <span className="text-red-500">*</span>
          </p>
        </div>

        {/* ---------- Form Fields ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 text-gray-700">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="font-medium flex items-center gap-2">
                <FaUserMd className="text-[#5f6fff]" /> Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 border rounded-lg w-full px-3 sm:px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-medium flex items-center gap-2">
                <FaEnvelope className="text-[#5f6fff]" /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 border rounded-lg w-full px-3 sm:px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              />
            </div>

            {/* Password */}
            <div>
              <label className="font-medium flex items-center gap-2">
                <FaLock className="text-[#5f6fff]" /> Password (optional)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 border rounded-lg w-full px-3 sm:px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="font-medium flex items-center gap-2">
                <FaFileMedical className="text-[#5f6fff]" /> Experience
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="mt-1 border rounded-lg w-full px-3 sm:px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>
                    {i + 1} Year{i + 1 > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Fees */}
            <div>
              <label className="font-medium flex items-center gap-2">
                <FaMoneyBillWave className="text-[#5f6fff]" /> Consultation Fee
              </label>
              <input
                type="number"
                min={5}
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="mt-1 border rounded-lg w-full px-3 sm:px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {/* Speciality */}
            <div>
              <label className="font-medium flex items-center gap-2">
                <FaUserMd className="text-[#5f6fff]" /> Speciality
              </label>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="mt-1 border rounded-lg w-full px-3 sm:px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            {/* Degree */}
            <div>
              <label className="font-medium flex items-center gap-2">
                <FaGraduationCap className="text-[#5f6fff]" /> Degree
              </label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="mt-1 border rounded-lg w-full px-3 sm:px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              />
            </div>

            {/* Address */}
            <div>
              <label className="font-medium flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#5f6fff]" /> Clinic Address
              </label>
              <input
                type="text"
                placeholder="Address line 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="mt-1 border rounded-lg w-full px-3 sm:px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              />
              <input
                type="text"
                placeholder="Address line 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="mt-3 border rounded-lg w-full px-3 sm:px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        {/* ---------- About Section ---------- */}
        <div className="mt-6">
          <label className="font-medium flex items-center gap-2 text-gray-700">
            <FaFileMedical className="text-[#5f6fff]" /> About Doctor
          </label>
          <textarea
            rows={5}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="mt-2 border rounded-lg w-full px-3 sm:px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm sm:text-base"
          ></textarea>
        </div>

        {/* ---------- Submit Button ---------- */}
        <button
          type="submit"
          className="w-full sm:w-auto mt-8 bg-[#5f6fff] hover:bg-[#4b56e2] text-white px-10 py-3 rounded-full font-semibold transition-all duration-300 shadow-md flex items-center gap-2 justify-center"
        >
          <FaUserMd className="text-white text-lg" /> Update Doctor
        </button>
      </div>
    </form>
  );
};

export default EditDoctor;
