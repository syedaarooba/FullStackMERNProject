import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { FiCheck, FiCamera, FiEdit3 } from "react-icons/fi";

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
    <div className="py-6 sm:py-10 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary dark:text-accent-mint mb-1">
            Account Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Personal Profile
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
            Manage your personal data, contact information, and medical preferences.
          </p>
        </div>

        {!isEdit && (
          <button
            onClick={() => setIsEdit(true)}
            className="hidden sm:inline-flex items-center gap-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-accent-mint px-5 py-2.5 rounded-full text-xs font-bold shadow-sm hover:border-primary transition"
          >
            <FiEdit3 /> Edit Profile
          </button>
        )}
      </div>

      {/* Profile Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Profile Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col items-center text-center">
          
          {/* Avatar */}
          <div className="relative group mt-2">
            {isEdit ? (
              <label htmlFor="image" className="relative cursor-pointer block">
                <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl ring-2 ring-primary/40">
                  <img
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition"
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt="profile"
                  />
                </div>

                {/* Upload Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-black/40 text-white transition">
                  <FiCamera size={24} />
                  <span className="text-[11px] font-bold mt-1">Change Photo</span>
                </div>

                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                  accept="image/*"
                />
              </label>
            ) : (
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl ring-2 ring-primary/20">
                <img
                  className="w-full h-full object-cover"
                  src={userData.image}
                  alt="profile"
                />
              </div>
            )}
          </div>

          {/* Name */}
          <div className="mt-5 w-full">
            {isEdit ? (
              <input
                className="w-full text-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-3 py-2 text-xl font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                type="text"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                value={userData.name}
              />
            ) : (
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {userData.name}
              </h2>
            )}
          </div>

          {/* Email */}
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{userData.email}</p>

          {/* Action Button */}
          <div className="mt-6 w-full">
            {isEdit ? (
              <button
                onClick={updateUserProfileData}
                className="w-full bg-gradient-to-r from-primary to-teal-600 text-white py-3 rounded-2xl text-sm font-bold shadow-md shadow-primary/25 hover:shadow-glow hover:scale-102 active:scale-95 transition"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="w-full border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 py-2.5 rounded-2xl text-sm font-bold hover:border-primary hover:text-primary dark:hover:text-accent-mint transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Right Details Section */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Contact Information Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Contact Details
              </h3>
              <span className="inline-flex items-center gap-1 text-[11px] px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800/60">
                <FiCheck /> Verified Patient
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              {/* Email */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Email Address</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium break-words">
                  {userData.email}
                </span>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Phone Number</span>
                {isEdit ? (
                  <input
                    className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
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
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{userData.phone || "Not provided"}</span>
                )}
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1 sm:col-span-2">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Residential Address</span>
                {isEdit ? (
                  <div className="flex flex-col gap-2 mt-1">
                    <input
                      className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
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
                      value={userData.address?.line1 || ""}
                      placeholder="Address line 1"
                    />
                    <input
                      className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
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
                      value={userData.address?.line2 || ""}
                      placeholder="Address line 2"
                    />
                  </div>
                ) : (
                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    {userData.address?.line1 || "No address entered"}
                    {userData.address?.line2 && <><br />{userData.address.line2}</>}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Basic Information Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white pb-4 border-b border-slate-100 dark:border-slate-800">
              Basic Demographics
            </h3>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
              {/* Gender */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Gender</span>
                {isEdit ? (
                  <select
                    className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary max-w-[200px]"
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
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{userData.gender}</span>
                )}
              </div>

              {/* DOB */}
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Date of Birth</span>
                {isEdit ? (
                  <input
                    className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary max-w-[200px]"
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
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{userData.dob || "Not provided"}</span>
                )}
              </div>
            </div>

            {/* Bottom Edit Actions */}
            {isEdit && (
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={updateUserProfileData}
                  className="flex-1 bg-gradient-to-r from-primary to-teal-600 text-white py-3 rounded-2xl font-bold shadow-md hover:shadow-glow transition"
                >
                  Save Information
                </button>
                <button
                  onClick={() => {
                    setIsEdit(false);
                    setImage(false);
                    loadUserProfileData();
                  }}
                  className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-3 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
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

