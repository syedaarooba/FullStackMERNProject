import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Logo = ({ className = "h-9 w-auto", onClick }) => {
  const { theme } = useContext(AppContext);

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 cursor-pointer select-none group ${className}`}
    >
      {/* Medical Icon */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 via-primary-500 to-accent-mint shadow-md shadow-primary/20 group-hover:shadow-glow transition-all duration-300">
        <div className="absolute inset-0 rounded-xl border border-white/25"></div>
        {/* Plus mark */}
        <div className="w-1 h-5 bg-white rounded-full"></div>
        <div className="w-5 h-1 bg-white rounded-full absolute"></div>
        {/* Pulse center */}
        <div className="w-2.5 h-2.5 rounded-full bg-accent-mint absolute ring-2 ring-white"></div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-200">
            CarePulse
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-mint animate-pulse"></span>
        </div>
        <span className="text-[9px] font-bold tracking-[0.22em] text-primary-600 dark:text-primary-400 uppercase -mt-0.5">
          Healthcare
        </span>
      </div>
    </div>
  );
};

export default Logo;
