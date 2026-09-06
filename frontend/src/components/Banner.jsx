import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className='relative overflow-hidden bg-gradient-to-br from-primary-600 via-indigo-700 to-slate-900 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-950 rounded-3xl px-6 sm:px-12 md:px-14 lg:px-16 my-16 shadow-2xl border border-white/10'>
            
            {/* Ambient decorative blurs */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-accent-cyan/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-10 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className='flex flex-col md:flex-row items-center justify-between relative z-10'>
                {/* ------- Left Side ------- */}
                <div className='flex-1 py-10 sm:py-14 md:py-16 text-left'>
                    <span className="inline-block text-accent-cyan text-xs font-bold uppercase tracking-widest mb-3">
                        Seamless Healthcare
                    </span>
                    <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight'>
                        <p>Book Appointment</p>
                        <p className='mt-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-white'>
                            With 100+ Trusted Doctors
                        </p>
                    </div>
                    <p className="mt-4 text-slate-200 text-sm sm:text-base max-w-md">
                        Get instant access to top certified doctors in your area with zero wait time.
                    </p>
                    <button
                        onClick={() => { navigate('/login'); window.scrollTo(0, 0); }}
                        className='group inline-flex items-center gap-3 bg-white text-slate-900 hover:text-primary dark:bg-slate-900 dark:text-white dark:hover:text-indigo-300 text-sm sm:text-base font-bold px-8 py-3.5 rounded-full mt-7 shadow-xl hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-300'
                    >
                        <span>Create Account</span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* ------- Right Side ------- */}
                <div className='hidden md:block md:w-1/2 lg:w-[380px] relative self-end'>
                    <img
                        className='w-full max-w-sm ml-auto drop-shadow-2xl'
                        src={assets.appointment_img}
                        alt="Appointment Doctor"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;