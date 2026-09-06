import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-slate-100/70 dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-300 mt-20 transition-colors duration-200">
      {/* ---------- Main Content ---------- */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-8 md:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* ---------- Left Section ---------- */}
        <div className="space-y-4">
          <Logo onClick={() => handleNavigate("/")} />

          <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm max-w-sm pt-2">
            <span className="font-semibold text-primary dark:text-indigo-400">Prescripto</span>{" "}
            makes healthcare simple, fast, and accessible. Book certified doctors,
            manage appointments, and consult with total confidence.
          </p>

          {/* ---------- Social Icons ---------- */}
          <div className="flex gap-3 pt-2">
            {[
              { icon: FaFacebookF, link: "https://facebook.com" },
              { icon: FaTwitter, link: "https://twitter.com" },
              { icon: FaLinkedinIn, link: "https://linkedin.com" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-full text-primary dark:text-indigo-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white hover:scale-110 transition-all duration-200"
              >
                <item.icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* ---------- Company Links ---------- */}
        <div>
          <h3 className="font-bold text-base sm:text-lg mb-4 text-slate-900 dark:text-white tracking-tight">
            Company
          </h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Our Doctors", path: "/doctors" },
              { name: "Contact", path: "/contact" },
            ].map((item, index) => (
              <li
                key={index}
                onClick={() => handleNavigate(item.path)}
                className="hover:text-primary dark:hover:text-indigo-400 cursor-pointer transition-colors duration-200 font-medium"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Services Links ---------- */}
        <div>
          <h3 className="font-bold text-base sm:text-lg mb-4 text-slate-900 dark:text-white tracking-tight">
            Our Services
          </h3>
          <ul className="space-y-2.5 text-sm">
            {[
              "Online Consultation",
              "Appointment Scheduling",
              "Health Checkups",
              "Medical Records",
            ].map((service, index) => (
              <li
                key={index}
                onClick={() => handleNavigate("/doctors")}
                className="hover:text-primary dark:hover:text-indigo-400 cursor-pointer transition-colors duration-200 font-medium"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Contact Info ---------- */}
        <div>
          <h3 className="font-bold text-base sm:text-lg mb-4 text-slate-900 dark:text-white tracking-tight">
            Get in Touch
          </h3>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-center gap-3 font-medium hover:text-primary dark:hover:text-indigo-400 transition-colors duration-200">
              <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-indigo-400">
                <FaPhoneAlt size={12} />
              </div>
              <span>+1 (555) 987-6543</span>
            </li>

            <li className="flex items-center gap-3 font-medium hover:text-primary dark:hover:text-indigo-400 transition-colors duration-200">
              <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-indigo-400">
                <FaEnvelope size={12} />
              </div>
              <a href="mailto:support@prescripto.com" className="hover:underline">
                support@prescripto.com
              </a>
            </li>

            <li className="flex items-start gap-3 hover:text-primary dark:hover:text-indigo-400 transition-colors duration-200">
              <div className="w-8 h-8 rounded-full bg-primary-50 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-indigo-400 mt-0.5">
                <FaMapMarkerAlt size={13} />
              </div>
              <span className="leading-relaxed">
                456 Wellness Avenue, <br /> San Francisco, CA, USA
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* ---------- Bottom Section ---------- */}
      <div className="w-full bg-slate-200/80 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 text-center py-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-bold text-slate-800 dark:text-slate-200">Prescripto</span> — Empowering better health, one click at a time.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

