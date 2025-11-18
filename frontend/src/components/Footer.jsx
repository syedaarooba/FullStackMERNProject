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
import { assets } from "../assets/assets";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-gradient-to-b from-white to-[#eef1ff] text-gray-800 border-t border-gray-200 mt-20">
      {/* ---------- Main Content ---------- */}
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-16 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* ---------- Left Section ---------- */}
        <div>
          <div
            onClick={() => handleNavigate("/")}
            className="flex items-center gap-2 mb-5 cursor-pointer"
          >
            <img
              src={assets.logo}
              alt="Medico Logo"
              className="w-40 sm:w-48 drop-shadow-md"
            />
          </div>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base max-w-sm">
            <span className="font-semibold text-[#5f6fff]">Prescripto</span>{" "}
            makes healthcare simple. Book trusted doctors, manage appointments,
            and consult online from the comfort of your home. Your well-being,
            simplified with technology.
          </p>

          {/* ---------- Social Icons ---------- */}
          <div className="flex gap-4 mt-6">
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
                className="p-3 bg-white shadow-md rounded-full text-[#5f6fff] hover:bg-[#5f6fff] hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                <item.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* ---------- Company Links ---------- */}
        <div>
          <h3 className="font-semibold text-lg sm:text-xl mb-5 text-gray-900">
            Company
          </h3>
          <ul className="space-y-3 text-gray-600 text-sm sm:text-base">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Our Doctors", path: "/doctors" },
              { name: "Contact", path: "/contact" },
            ].map((item, index) => (
              <li
                key={index}
                onClick={() => handleNavigate(item.path)}
                className="hover:text-[#5f6fff] cursor-pointer transition-colors duration-200"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Services Links ---------- */}
        <div>
          <h3 className="font-semibold text-lg sm:text-xl mb-5 text-gray-900">
            Our Services
          </h3>
          <ul className="space-y-3 text-gray-600 text-sm sm:text-base">
            {[
              "Online Consultation",
              "Appointment Scheduling",
              "Health Checkups",
              "Medical Records",
            ].map((service, index) => (
              <li
                key={index}
                className="hover:text-[#5f6fff] cursor-pointer transition-colors duration-200"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Contact Info ---------- */}
        <div>
          <h3 className="font-semibold text-lg sm:text-xl mb-5 text-gray-900">
            Get in Touch
          </h3>
          <ul className="space-y-5 text-gray-600 text-sm sm:text-base">
            <li className="flex items-center gap-3 hover:text-[#5f6fff] transition-colors duration-200">
              <FaPhoneAlt className="text-[#5f6fff] text-lg" />
              <span className="font-medium">+1 (555) 987-6543</span>
            </li>

            {/* 💌 Email with Icon */}
            <li className="flex items-center gap-3 hover:text-[#5f6fff] transition-colors duration-200">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#5f6fff]/10 text-[#5f6fff]">
                <FaEnvelope className="text-lg" />
              </div>
              <a
                href="mailto:support@medicohealth.com"
                className="font-medium hover:underline"
              >
                support@prescripto.com
              </a>
            </li>

            <li className="flex items-start gap-3 hover:text-[#5f6fff] transition-colors duration-200">
              <FaMapMarkerAlt className="text-[#5f6fff] text-lg mt-1" />
              <span className="leading-snug">
                456 Wellness Avenue, <br /> San Francisco, CA, USA
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* ---------- Divider ---------- */}
      <div className="border-t border-gray-300 w-full"></div>

      {/* ---------- Bottom Section ---------- */}
      <div className="w-full bg-[#5f6fff] text-white text-center py-5 text-sm sm:text-base">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">Prescripto</span> — Empowering better
          health, one click at a time.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
