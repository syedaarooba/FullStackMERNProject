import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaMoneyCheckAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [payingId, setPayingId] = useState(null); // per-row loading

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const slotDateFormat = (slotDate) => {
    const [d, m, y] = slotDate.split("_");
    return `${d} ${months[Number(m)]} ${y}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) setAppointments(data.appointments.reverse());
    } catch {
      toast.error("Failed to fetch appointments.");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Appointment cancelled.");
        getUserAppointments();
      } else toast.error(data.message);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const appointmentStripe = async (appointmentId) => {
    try {
      setPayingId(appointmentId);
      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-stripe`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success && data.session_url) {
        window.location.href = data.session_url; // Stripe Checkout
      } else {
        toast.error(data.message || "Payment initialization failed.");
        setPayingId(null);
      }
    } catch (e) {
      toast.error("Stripe payment error: " + e.message);
      setPayingId(null);
    }
  };

  // Handle Stripe redirect: verify that single appointment, then refresh
  useEffect(() => {
    const qp = new URLSearchParams(window.location.search);
    const success = qp.get("success");
    const appointmentId = qp.get("appointmentId");

    const verify = async () => {
      try {
        if (!appointmentId) return;
        const { data } = await axios.post(
          `${backendUrl}/api/user/verify-stripe`,
          { appointmentId, success },
          { headers: { token } }
        );
        if (data.success) {
          toast.success("Payment Successful ✅");
        } else {
          toast.error(data.message || "Payment Failed ❌");
        }
      } catch (e) {
        toast.error(e.message);
      } finally {
        await getUserAppointments();
        navigate("/my-appointments", { replace: true });
      }
    };

    if (success) verify();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backendUrl, token, navigate]);

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="p-4 sm:p-8">
      <p className="pb-3 mt-8 text-2xl font-semibold text-gray-800 border-b">
        My Appointments
      </p>

      <div className="mt-6 space-y-6">
        {appointments.map((item) => (
          <div
            key={item._id}  // use stable key
            className="flex flex-col sm:flex-row gap-6 p-5 bg-white border border-gray-200 shadow-md rounded-2xl hover:shadow-lg transition-all duration-300"
          >
            <div>
              <img
                className="w-36 h-36 object-cover rounded-xl border border-gray-100 shadow-sm"
                src={item.docData.image}
                alt={item.docData.name}
              />
            </div>

            <div className="flex-1 text-gray-700 text-sm">
              <p className="text-xl font-semibold text-[#1a1a40]">
                {item.docData.name}
              </p>
              <p className="text-gray-500 mb-2">{item.docData.speciality}</p>
              <p className="font-medium text-gray-600">Address:</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>
              <p className="mt-2">
                <span className="font-semibold text-gray-800">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            <div className="flex flex-col justify-center items-center gap-3 text-sm font-medium">
              {!item.cancelled && !item.payment && !item.isCompleted && (
                <button
                  onClick={() => appointmentStripe(item._id)}
                  disabled={payingId === item._id}
                  className={`flex items-center justify-center gap-2 sm:min-w-44 py-2.5 px-4 rounded-full text-white shadow-md transition-all duration-300 ${
                    payingId === item._id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  <FaMoneyCheckAlt className="text-white" />
                  {payingId === item._id ? "Processing..." : "Pay Online"}
                </button>
              )}

              {item.payment && !item.isCompleted && (
                <button className="flex items-center justify-center gap-2 sm:min-w-44 py-2 px-4 border border-green-500 text-green-600 rounded-full bg-green-50 font-medium">
                  <FaCheckCircle /> Paid
                </button>
              )}

              {item.isCompleted && (
                <button className="flex items-center justify-center gap-2 sm:min-w-44 py-2 px-4 border border-green-500 text-green-700 bg-green-50 rounded-full">
                  <FaCheckCircle /> Completed
                </button>
              )}

              {item.cancelled && (
                <button className="flex items-center justify-center gap-2 sm:min-w-44 py-2 px-4 border border-red-400 text-red-500 rounded-full bg-red-50">
                  <FaTimesCircle /> Cancelled
                </button>
              )}

              {!item.cancelled && !item.isCompleted && !item.payment && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="sm:min-w-44 py-2 px-4 border border-red-500 text-red-500 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
