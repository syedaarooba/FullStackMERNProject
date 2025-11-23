import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);

  // Function to update user profile data using API
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData ? (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Wrapper */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
          {/* Avatar */}
          {isEdit ? (
            <label htmlFor="image" className="relative cursor-pointer group">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-70 transition"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="profile"
                />
              </div>

              {/* Upload Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div className="bg-black/60 p-3 rounded-full">
                  <img
                    className="w-6 h-6"
                    src={assets.upload_icon}
                    alt="upload"
                  />
                </div>
              </div>

              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                className="w-full h-full object-cover"
                src={userData.image}
                alt="profile"
              />
            </div>
          )}

          {/* Name */}
          <div className="mt-4 w-full">
            {isEdit ? (
              <input
                className="w-full text-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xl sm:text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                value={userData.name}
              />
            ) : (
              <p className="text-2xl sm:text-3xl font-semibold text-gray-900">
                {userData.name}
              </p>
            )}
          </div>

          {/* Email */}
          <p className="mt-2 text-sm text-gray-500">{userData.email}</p>

          {/* Action Button */}
          <div className="mt-6 w-full">
            {isEdit ? (
              <button
                onClick={updateUserProfileData}
                className="w-full bg-[#5f6fff] text-white py-2.5 rounded-xl font-medium hover:bg-[#4e5ae3] transition"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="w-full border border-[#5f6fff] text-[#5f6fff] py-2.5 rounded-xl font-medium hover:bg-[#5f6fff] hover:text-white transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Right Details Section */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Contact Information Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Contact Information
              </h2>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
                Verified
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {/* Email */}
              <div className="flex flex-col gap-1">
                <p className="text-gray-500">Email</p>
                <p className="text-gray-900 font-medium break-words">
                  {userData.email}
                </p>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <p className="text-gray-500">Phone</p>
                {isEdit ? (
                  <input
                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                    type="text"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    value={userData.phone}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{userData.phone}</p>
                )}
              </div>

              {/* Address line 1 */}
              <div className="flex flex-col gap-1 sm:col-span-2">
                <p className="text-gray-500">Address</p>

                {isEdit ? (
                  <div className="flex flex-col gap-2">
                    <input
                      className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                      type="text"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line1: e.target.value,
                          },
                        }))
                      }
                      value={userData.address.line1}
                      placeholder="Address line 1"
                    />
                    <input
                      className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                      type="text"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            line2: e.target.value,
                          },
                        }))
                      }
                      value={userData.address.line2}
                      placeholder="Address line 2"
                    />
                  </div>
                ) : (
                  <p className="text-gray-700">
                    {userData.address.line1}
                    <br />
                    {userData.address.line2}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Basic Information Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h2>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {/* Gender */}
              <div className="flex flex-col gap-1">
                <p className="text-gray-500">Gender</p>
                {isEdit ? (
                  <select
                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 max-w-[180px] focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    value={userData.gender}
                  >
                    <option value="Not Selected">Not Selected</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className="text-gray-900 font-medium">{userData.gender}</p>
                )}
              </div>

              {/* DOB */}
              <div className="flex flex-col gap-1">
                <p className="text-gray-500">Birthday</p>
                {isEdit ? (
                  <input
                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 max-w-[180px] focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                    type="date"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        dob: e.target.value,
                      }))
                    }
                    value={userData.dob}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{userData.dob}</p>
                )}
              </div>
            </div>

            {/* Bottom Action Buttons (mobile friendly) */}
            {isEdit && (
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={updateUserProfileData}
                  className="flex-1 bg-[#5f6fff] text-white py-2.5 rounded-xl font-medium hover:bg-[#4e5ae3] transition"
                >
                  Save Information
                </button>
                <button
                  onClick={() => {
                    setIsEdit(false);
                    setImage(false);
                    loadUserProfileData();
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default MyProfile;
