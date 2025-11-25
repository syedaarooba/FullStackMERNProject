import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  // ✅ SAME updateProfile FUNCTION (NO CHANGE)
  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available, // same as before
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }

      setIsEdit(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // ✅ NEW: availability instantly update on toggle
  const toggleAvailability = async () => {
    const newAvailability = !profileData.available;

    // instant UI change (optimistic)
    setProfileData((prev) => ({
      ...prev,
      available: newAvailability,
    }));

    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        { available: newAvailability }, // only availability update
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(
          newAvailability ? "Dr is now Available" : "Dr is now Unavailable"
        );
        getProfileData();
      } else {
        toast.error(data.message);
        // revert if backend fails
        setProfileData((prev) => ({
          ...prev,
          available: !newAvailability,
        }));
      }
    } catch (error) {
      toast.error(error.message);
      // revert if error
      setProfileData((prev) => ({
        ...prev,
        available: !newAvailability,
      }));
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Card (Image + Quick Info) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
            {/* Doctor Image */}
            <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-md bg-primary/10">
              <img
                className="w-full h-full object-cover"
                src={profileData.image}
                alt="doctor"
              />
            </div>

            {/* Name */}
            <p className="mt-4 text-2xl sm:text-3xl font-semibold text-gray-900">
              {profileData.name}
            </p>

            {/* Degree + Speciality */}
            <p className="mt-1 text-sm text-gray-600">
              {profileData.degree} • {profileData.speciality}
            </p>

            {/* Experience Pill */}
            <span className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600">
              {profileData.experience} Experience
            </span>

            {/* ✅ Available Toggle (ONLY CHANGE HERE) */}
            <div className="mt-5 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                onChange={toggleAvailability}  // ✅ now updates instantly
                checked={profileData.available}
                className="w-4 h-4 accent-[#5f6fff] cursor-pointer"
              />
              <label className="text-gray-700 font-medium">
                Available for appointments
              </label>
            </div>

            {/* Action Button (SAME AS BEFORE) */}
            <div className="mt-6 w-full">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="w-full bg-[#5f6fff] text-white py-2.5 rounded-xl font-medium hover:bg-[#4e5ae3] transition"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit((prev) => !prev)}
                  className="w-full border border-[#5f6fff] text-[#5f6fff] py-2.5 rounded-xl font-medium hover:bg-[#5f6fff] hover:text-white transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* About Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900">About</h2>

              {isEdit ? (
                <textarea
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                  className="mt-3 w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                  rows={7}
                  value={profileData.about}
                />
              ) : (
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {profileData.about}
                </p>
              )}
            </div>

            {/* Fees + Address Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Clinic Details
              </h2>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {/* Fees */}
                <div className="flex flex-col gap-1">
                  <p className="text-gray-500">Appointment Fee</p>
                  <div className="text-gray-900 font-medium flex items-center gap-2">
                    {currency}
                    {isEdit ? (
                      <input
                        type="number"
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            fees: e.target.value,
                          }))
                        }
                        value={profileData.fees}
                        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 w-32 focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                      />
                    ) : (
                      <span>{profileData.fees}</span>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <p className="text-gray-500">Address</p>

                  {isEdit ? (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            address: {
                              ...prev.address,
                              line1: e.target.value,
                            },
                          }))
                        }
                        value={profileData.address.line1}
                        placeholder="Address Line 1"
                        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                      />
                      <input
                        type="text"
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            address: {
                              ...prev.address,
                              line2: e.target.value,
                            },
                          }))
                        }
                        value={profileData.address.line2}
                        placeholder="Address Line 2"
                        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5f6fff]"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      {profileData.address.line1}
                      <br />
                      {profileData.address.line2}
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Buttons (SAME AS BEFORE) */}
              {isEdit && (
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={updateProfile}
                    className="flex-1 bg-[#5f6fff] text-white py-2.5 rounded-xl font-medium hover:bg-[#4e5ae3] transition"
                  >
                    Save Information
                  </button>
                  <button
                    onClick={() => {
                      setIsEdit(false);
                      getProfileData();
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
    )
  );
};

export default DoctorProfile;
