import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Logo from "./Logo";
import { FiSun, FiMoon, FiUser, FiCalendar, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData, theme, toggleTheme } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "ALL DOCTORS", path: "/doctors" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/70 dark:border-slate-800/80 transition-colors duration-200">
      <div className="max-w-[1300px] mx-auto flex items-center justify-between py-3.5 px-4 sm:px-8 md:px-10">
        
        {/* -------- Logo -------- */}
        <Logo onClick={() => navigate("/")} />

        {/* -------- Desktop Menu -------- */}
        <ul className="hidden md:flex items-center gap-7 text-[14px] font-semibold tracking-wide text-slate-600 dark:text-slate-300">
          {navItems.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                `relative py-1.5 transition-colors duration-200 hover:text-primary-600 dark:hover:text-indigo-400 ${
                  isActive ? "text-primary-600 dark:text-indigo-400" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <span className="absolute left-0 bottom-0 w-full h-[2.5px] bg-gradient-to-r from-primary to-accent-cyan rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* ⭐ Admin Panel Link ⭐ */}
          <a
            href="https://admin-two-murex.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="border border-slate-200 dark:border-slate-700 px-4 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-indigo-400 hover:bg-primary-50/50 dark:hover:bg-slate-800 transition-all duration-200"
          >
            Admin Panel
          </a>
        </ul>

        {/* -------- Right Section -------- */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200/80 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? (
              <FiSun className="w-5 h-5 text-amber-400 rotate-0 transition-transform duration-300" />
            ) : (
              <FiMoon className="w-5 h-5 text-indigo-600 rotate-0 transition-transform duration-300" />
            )}
          </button>

          {token && userData ? (
            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <img
                  className="w-9 h-9 object-cover rounded-full ring-2 ring-primary-500/30"
                  src={userData.image}
                  alt="Profile"
                />
                <img
                  className="w-3 transition-transform duration-200 group-hover:rotate-180 dark:invert"
                  src={assets.dropdown_icon}
                  alt="Dropdown"
                />
              </div>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-12 w-52 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 p-2 z-50">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Signed in as</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{userData.name}</p>
                </div>
                <ul className="flex flex-col text-sm font-medium text-slate-700 dark:text-slate-300">
                  <li
                    onClick={() => navigate("/my-profile")}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-primary transition"
                  >
                    <FiUser className="text-slate-400" /> My Profile
                  </li>
                  <li
                    onClick={() => navigate("/my-appointments")}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-primary transition"
                  >
                    <FiCalendar className="text-slate-400" /> My Appointments
                  </li>
                  <li
                    onClick={logout}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition mt-1 border-t border-slate-100 dark:border-slate-800"
                  >
                    <FiLogOut /> Logout
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:inline-flex items-center justify-center bg-gradient-to-r from-primary to-indigo-600 hover:from-primary-600 hover:to-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-primary/20 hover:shadow-glow transition-all duration-200 active:scale-95"
            >
              Create Account
            </button>
          )}

          {/* -------- Mobile Menu Icon -------- */}
          <button
            onClick={() => setShowMenu(true)}
            aria-label="Open mobile menu"
            className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <img className="w-6 dark:invert" src={assets.menu_icon} alt="Menu" />
          </button>
        </div>

        {/* -------- Mobile Drawer -------- */}
        {showMenu && (
          <div
            onClick={() => setShowMenu(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 md:hidden"
          />
        )}
        <div
          className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-slate-900 z-50 shadow-2xl border-l border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between p-6 ${
            showMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <Logo onClick={() => { navigate("/"); setShowMenu(false); }} />
              <button
                onClick={() => setShowMenu(false)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <img src={assets.cross_icon} className="w-5 dark:invert" alt="Close" />
              </button>
            </div>

            <ul className="flex flex-col gap-2 mt-6 text-base font-semibold text-slate-700 dark:text-slate-200">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() => setShowMenu(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl transition ${
                      isActive
                        ? "bg-primary-50 dark:bg-slate-800 text-primary dark:text-indigo-400"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <a
                href="https://admin-two-murex.vercel.app/"
                target="_blank"
                rel="noreferrer"
                onClick={() => setShowMenu(false)}
                className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 mt-2"
              >
                Admin Panel ↗
              </a>
            </ul>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between px-2 text-sm text-slate-600 dark:text-slate-400">
              <span>Theme</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-semibold bg-slate-50 dark:bg-slate-800"
              >
                {theme === "dark" ? <FiSun className="text-amber-400" /> : <FiMoon className="text-primary" />}
                {theme === "dark" ? "Dark Mode" : "Light Mode"}
              </button>
            </div>

            {!token ? (
              <button
                onClick={() => {
                  navigate("/login");
                  setShowMenu(false);
                }}
                className="w-full bg-gradient-to-r from-primary to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md"
              >
                Create Account
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setShowMenu(false);
                }}
                className="w-full border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 py-2.5 rounded-xl font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/30"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

