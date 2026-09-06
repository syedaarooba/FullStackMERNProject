import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { FiLoader, FiShield } from 'react-icons/fi';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const appointmentId = searchParams.get("appointmentId");

    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();

    // Function to verify stripe payment
    const verifyStripe = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/user/verifyStripe",
                { success, appointmentId },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
            navigate("/my-appointments");
        } catch (error) {
            toast.error(error.message);
            console.log(error);
            navigate("/my-appointments");
        }
    };

    useEffect(() => {
        if (token && appointmentId && success) {
            verifyStripe();
        }
    }, [token]);

    return (
        <div className="min-h-[65vh] flex items-center justify-center px-4">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl max-w-sm w-full text-center flex flex-col items-center">
                <div className="relative mb-6">
                    <div className="w-20 h-20 border-4 border-slate-200 dark:border-slate-800 border-t-primary dark:border-t-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-primary">
                        <FiShield className="w-8 h-8" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Verifying Payment
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Please wait while we secure and verify your appointment transaction with Stripe...
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500">
                    <FiLoader className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing securely</span>
                </div>
            </div>
        </div>
    );
};

export default Verify;