import React from "react";
import { assets } from "../assets/assets";
import { FiArrowRight, FiShield, FiStar, FiClock } from "react-icons/fi";

const Header = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl my-6 sm:my-8 bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 dark:from-[#032922] dark:via-[#062621] dark:to-slate-950 shadow-2xl border border-white/10 transition-all duration-300">
      
      {/* Decorative ambient glowing emerald and mint orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-mint/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-400/25 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-center px-6 sm:px-10 md:px-14 lg:px-20 py-10 md:py-16 relative z-10">
        
        {/* --------- Header Left --------- */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-5 text-left">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold tracking-wide border border-white/20 shadow-sm">
            <FiShield className="text-accent-mint text-sm" />
            <span>CarePulse Certified Healthcare</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold leading-[1.15] tracking-tight">
            Book Appointment <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-white">
              With Verified Specialists
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 text-slate-100 text-sm font-normal">
            <img className="w-24 sm:w-28 drop-shadow-md" src={assets.group_profiles} alt="Patient Profiles" />
            <p className="text-slate-100 text-sm leading-relaxed">
              Connect with over 150+ verified clinicians, view live availability, and consult on your schedule.
            </p>
          </div>

          <a
            href="#speciality"
            className="group flex items-center gap-3 bg-white text-slate-900 hover:text-primary dark:bg-slate-900 dark:text-white dark:hover:text-primary-300 px-7 py-3.5 rounded-full text-sm font-bold shadow-xl shadow-black/15 hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 mt-2"
          >
            <span>Find a Doctor</span>
            <FiArrowRight className="text-primary group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>

        {/* --------- Header Right (Shuffled to appointment_img with floating badges) --------- */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end relative">
          <div className="relative">
            {/* Ambient circle glow behind doctor */}
            <div className="absolute inset-0 bg-gradient-to-t from-accent-mint/30 to-transparent rounded-full filter blur-xl"></div>
            
            <img
              className="w-full max-w-sm sm:max-w-md h-auto object-contain rounded-2xl drop-shadow-2xl relative z-10"
              src={assets.appointment_img}
              alt="CarePulse Lead Clinician"
            />

            {/* Floating Live Badge 1 */}
            <div className="absolute top-6 -left-4 sm:-left-8 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-white/20 flex items-center gap-2.5 animate-bounce [animation-duration:4s]">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <FiStar className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 dark:text-white">4.9 / 5.0 Rating</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">1,250+ Verified Reviews</p>
              </div>
            </div>

            {/* Floating Live Badge 2 */}
            <div className="absolute -bottom-4 right-2 sm:-right-4 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-white/20 flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-mint opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 dark:text-white">Same-Day Slots Open</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Instant Online Confirmation</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;
