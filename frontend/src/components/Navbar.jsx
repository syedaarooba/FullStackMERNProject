import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white">
      <div className="max-w-[1300px] mx-auto flex items-center justify-between py-3 px-5 sm:px-10">
        {/* -------- Logo -------- */}
        <img
          onClick={() => navigate("/")}
          className=" cursor-pointer"
          src={assets.logo}
          alt="Medico Logo"
        />

        {/* -------- Desktop Menu -------- */}
        <ul className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-700">
          {[
            { name: "HOME", path: "/" },
            { name: "ALL DOCTORS", path: "/doctors" },
            { name: "ABOUT", path: "/about" },
            { name: "CONTACT", path: "/contact" },
          ].map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                `relative py-2 hover:text-[#5f6fff] transition ${
                  isActive ? "text-[#5f6fff]" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#5f6fff] rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* ⭐ Admin Panel Button (Desktop) ⭐ */}
          <a
            href="https://admin-two-murex.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="border px-5 py-1.5 rounded-full text-xs font-medium hover:bg-[#5f6fff] hover:text-white transition"
          >
            Admin Panel
          </a>
        </ul>

        {/* -------- Right Section -------- */}
        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  className="w-9 h-9 object-cover rounded-full border border-gray-200"
                  src={userData.image}
                  alt="Profile"
                />
                <img
                  className="w-3 transition-transform group-hover:rotate-180"
                  src={assets.dropdown_icon}
                  alt="Dropdown"
                />
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 rounded-xl shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                <ul className="flex flex-col gap-3 p-4 text-sm text-gray-600">
                  <li
                    onClick={() => navigate("/my-profile")}
                    className="cursor-pointer hover:text-[#5f6fff]"
                  >
                    My Profile
                  </li>
                  <li
                    onClick={() => navigate("/my-appointments")}
                    className="cursor-pointer hover:text-[#5f6fff]"
                  >
                    My Appointments
                  </li>
                  <li
                    onClick={logout}
                    className="cursor-pointer hover:text-red-500"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block bg-[#5f6fff] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#4e5ae3] transition"
            >
              Create Account
            </button>
          )}

          {/* -------- Mobile Menu Icon -------- */}
          <img
            onClick={() => setShowMenu(true)}
            className="w-6 md:hidden cursor-pointer"
            src={assets.menu_icon}
            alt="Menu"
          />
        </div>

        {/* -------- Mobile Drawer -------- */}
        <div
          className={`fixed top-0 right-0 h-full w-3/4 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
            showMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b">
            <img src={assets.logo} className="w-32" alt="Logo" />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              className="w-7 cursor-pointer"
              alt="Close"
            />
          </div>

          <ul className="flex flex-col items-center gap-5 mt-8 text-lg font-medium text-gray-700">
            {[
              { name: "HOME", path: "/" },
              { name: "ALL DOCTORS", path: "/doctors" },
              { name: "ABOUT", path: "/about" },
              { name: "CONTACT", path: "/contact" },
            ].map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setShowMenu(false)}
                className="hover:text-[#5f6fff] transition"
              >
                {item.name}
              </NavLink>
            ))}

            {/* Admin Panel Button (Mobile) */}
            <a
              href="https://admin-two-murex.vercel.app/"
              target="_blank"
              rel="noreferrer"
              onClick={() => setShowMenu(false)}
              className="border px-5 py-2 rounded-full text-sm font-medium hover:bg-[#5f6fff] hover:text-white transition"
            >
              Admin Panel
            </a>
          </ul>

          {!token && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => {
                  navigate("/login");
                  setShowMenu(false);
                }}
                className="bg-[#5f6fff] text-white px-8 py-3 rounded-full text-base font-medium hover:bg-[#4e5ae3] transition"
              >
                Create Account
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
