import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaMoneyCheckAlt, FaCheckCircle, FaTimesCircle, FaCalendarAlt } from "react-icons/fa";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [payingId, setPayingId] = useState(null); // per-row loading

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "";
    const [d, m, y] = slotDate.split("_");
    return `${d} ${months[Number(m) - 1] || m} ${y}`;
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
    <div className="py-6 sm:py-10">
      
      {/* Header */}
      <div className="mb-8">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary dark:text-indigo-400 mb-1">
          Patient Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          My Appointments
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5">
          View your upcoming appointments, check payment statuses, or manage scheduling.
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-slate-800 flex items-center justify-center mx-auto text-primary dark:text-indigo-400 text-2xl">
            <FiCalendar />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Appointments Yet</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
              You haven't scheduled any medical visits yet. Choose a specialist to get started.
            </p>
          </div>
          <button
            onClick={() => navigate('/doctors')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-indigo-600 text-white px-7 py-3 rounded-full text-sm font-bold shadow-md hover:shadow-glow transition"
          >
            Find a Doctor
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {appointments.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm rounded-3xl hover:shadow-xl transition-all duration-300 items-start md:items-center justify-between"
            >
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <img
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover object-top rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 shadow-sm flex-shrink-0"
                  src={item.docData?.image}
                  alt={item.docData?.name}
                />

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary dark:text-indigo-400">
                    {item.docData?.speciality}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {item.docData?.name}
                  </h3>
                  
                  {item.docData?.address && (
                    <div className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <FiMapPin className="mt-0.5 text-primary flex-shrink-0" />
                      <span>{item.docData.address.line1}, {item.docData.address.line2}</span>
                    </div>
                  )}

                  <div className="pt-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-primary-50 dark:bg-slate-800 text-primary dark:text-indigo-400 px-3 py-1 rounded-xl text-xs font-bold">
                      <FaCalendarAlt size={10} />
                      {slotDateFormat(item.slotDate)} | {item.slotTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row md:flex-col items-center sm:items-end justify-end gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => appointmentStripe(item._id)}
                    disabled={payingId === item._id}
                    className={`inline-flex items-center justify-center gap-2 w-full sm:w-44 py-2.5 px-5 rounded-full text-xs font-bold text-white shadow-md transition-all duration-200 ${
                      payingId === item._id
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 active:scale-95"
                    }`}
                  >
                    <FaMoneyCheckAlt />
                    <span>{payingId === item._id ? "Processing..." : "Pay Online"}</span>
                  </button>
                )}

                {item.payment && !item.isCompleted && (
                  <span className="inline-flex items-center justify-center gap-1.5 w-full sm:w-44 py-2 px-4 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-xs font-bold">
                    <FaCheckCircle /> Paid Online
                  </span>
                )}

                {item.isCompleted && (
                  <span className="inline-flex items-center justify-center gap-1.5 w-full sm:w-44 py-2 px-4 border border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 rounded-full text-xs font-bold">
                    <FaCheckCircle /> Completed
                  </span>
                )}

                {item.cancelled && (
                  <span className="inline-flex items-center justify-center gap-1.5 w-full sm:w-44 py-2 px-4 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 rounded-full bg-rose-50 dark:bg-rose-950/40 text-xs font-bold">
                    <FaTimesCircle /> Cancelled
                  </span>
                )}

                {!item.cancelled && !item.isCompleted && !item.payment && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="inline-flex items-center justify-center w-full sm:w-44 py-2 px-4 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-full hover:border-rose-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold transition-all duration-200 active:scale-95"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;

