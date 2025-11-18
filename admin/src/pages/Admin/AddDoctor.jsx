import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
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

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
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

  const { backendUrl } = useContext(AppContext);
  const { aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (
        !docImg ||
        !name ||
        !email ||
        !password ||
        !degree ||
        !fees ||
        !address1 ||
        !about
      ) {
        return toast.error("Please fill all required fields properly.");
      }

      const formData = new FormData();
      formData.append("image", docImg);
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

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success("Doctor Added Successfully!");
        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    // ✅ Added scroll container for small screens
    <div className="max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#c5c8ff] scrollbar-track-gray-100 rounded-xl">
      <form
        onSubmit={onSubmitHandler}
        className="m-5 w-full flex justify-center"
      >
        <div className="bg-white w-full max-w-5xl p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-[#0B0C60] mb-6 border-b pb-3 flex items-center gap-3">
            <FaUserMd className="text-[#5f6fff] text-3xl" />
            Add New Doctor
          </h2>

          {/* Upload Section */}
          <div className="flex items-center gap-5 mb-10">
            <label htmlFor="doc-img" className="cursor-pointer relative">
              <img
                className="w-20 h-20 object-cover rounded-full border-2 border-[#5f6fff] hover:opacity-80 transition"
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
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
            <p className="text-gray-600 text-sm">
              Click the circle to upload doctor picture{" "}
              <span className="text-red-600 font-bold">*</span>{" "}
              {/* ✅ Added star */}
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-700">
            {/* Left Side */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="font-medium flex items-center gap-2">
                  <FaUserMd className="text-[#5f6fff]" /> Full Name{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 border rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="font-medium flex items-center gap-2">
                  <FaEnvelope className="text-[#5f6fff]" /> Email{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  placeholder="doctor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 border rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="font-medium flex items-center gap-2">
                  <FaLock className="text-[#5f6fff]" /> Password{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 border rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="font-medium flex items-center gap-2">
                  <FaFileMedical className="text-[#5f6fff]" /> Experience
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mt-1 border rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={`${i + 1} Year`}>
                      {i + 1} Year{i + 1 > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-medium flex items-center gap-2">
                  <FaMoneyBillWave className="text-[#5f6fff]" /> Consultation
                  Fee
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1000"
                  min={5}
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  className="mt-1 border rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="font-medium flex items-center gap-2">
                  <FaUserMd className="text-[#5f6fff]" /> Speciality
                </label>
                <select
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  className="mt-1 border rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>

              <div>
                <label className="font-medium flex items-center gap-2">
                  <FaGraduationCap className="text-[#5f6fff]" /> Degree{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. MBBS, MD"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="mt-1 border rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="font-medium flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#5f6fff]" /> Clinic Address{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Street, Building"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  className="mt-1 border rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="City, State"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className="mt-3 border rounded-lg w-full px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-6">
            <label className="font-medium flex items-center gap-2 text-gray-700">
              <FaFileMedical className="text-[#5f6fff]" /> About Doctor{" "}
              <span className="text-red-600">*</span>
            </label>
            <textarea
              rows={5}
              placeholder="Write about the doctor's experience, skills, and achievements..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="mt-2 border rounded-lg w-full px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto mt-8 bg-[#5f6fff] hover:bg-[#4b56e2] text-white px-10 py-3 rounded-full font-semibold transition-all duration-300 shadow-md flex items-center gap-2 justify-center"
          >
            <FaUserMd className="text-white text-lg" /> Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
