import React from "react";
import { assets } from "../assets/assets";
import { FiArrowRight, FiShield } from "react-icons/fi";

const Header = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl my-6 sm:my-8 bg-gradient-to-br from-primary-600 via-indigo-700 to-slate-900 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-950 shadow-2xl border border-white/10 transition-all duration-300">
      
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-cyan/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-primary-400/20 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-center px-6 sm:px-10 md:px-14 lg:px-20 py-10 md:py-16 relative z-10">
        
        {/* --------- Header Left --------- */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-5 text-left">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold tracking-wide border border-white/20 shadow-sm">
            <FiShield className="text-accent-cyan text-sm" />
            <span>Verified Healthcare Network</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold leading-[1.15] tracking-tight">
            Book Appointment <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-cyan-200 to-white">
              With Trusted Doctors
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 text-slate-100 text-sm font-normal">
            <img className="w-24 sm:w-28 drop-shadow-md" src={assets.group_profiles} alt="Patient Profiles" />
            <p className="text-slate-200 text-sm leading-relaxed">
              Explore 100+ top-rated specialists, read patient reviews, and schedule seamlessly online.
            </p>
          </div>

          <a
            href="#speciality"
            className="group flex items-center gap-3 bg-white text-slate-900 hover:text-primary dark:bg-slate-900 dark:text-white dark:hover:text-indigo-300 px-7 py-3.5 rounded-full text-sm font-bold shadow-xl shadow-black/15 hover:shadow-glow hover:scale-105 active:scale-95 transition-all duration-300 mt-2"
          >
            <span>Book Appointment</span>
            <FiArrowRight className="text-primary dark:text-indigo-400 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
        </div>

        {/* --------- Header Right --------- */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end relative">
          <div className="relative">
            {/* Ambient circle highlight behind doctor */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-full filter blur-xl"></div>
            <img
              className="w-full max-w-md sm:max-w-lg h-auto object-contain rounded-2xl drop-shadow-2xl relative z-10"
              src={assets.header_img}
              alt="Medical Team"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;

