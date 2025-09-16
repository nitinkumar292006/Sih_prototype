import { NavLink, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { FaRobot, FaMusic, FaPaintBrush, FaUsers } from "react-icons/fa";
import { GiHamburgerMenu, GiGamepad } from "react-icons/gi";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import { MdPsychology } from "react-icons/md";
import { useContext, useState, useRef, useEffect } from "react";
import { dataContext } from "../context/UserContext";
import Logo from "../assets/Logo.webp";
import defaultAvatar from "../assets/dp.webp";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const { user, setUser, serverUrl } = useContext(dataContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const menuItems = [
    { icon: <IoMdHome />, label: "Home", path: "/" },
    { icon: <BsGrid1X2Fill />, label: "Dashboard", path: "/dashboard" },
    { icon: <CiHeart />, label: "MoodEnhancer", path: "/moodtracker" },
    { icon: <FaRobot />, label: "ChatBot", path: "/chatbot" },
    { icon: <FaMusic />, label: "Music Treat", path: "/music" },
    { icon: <FiPhoneCall />, label: "Consult", path: "/consult" },
    { icon: <GiGamepad />, label: "Game & Fun", path: "/gamefun" },
    { icon: <FaPaintBrush />, label: "Drawing Canvas", path: "/drawing" },
    { icon: <FaUsers />, label: "Support Groups", path: "/support-groups" },
    { icon: <MdPsychology />, label: "Mental Health Test", path: "/mental-test" },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(serverUrl + "/api/logout", {}, { withCredentials: true });
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.log("Logout error:", err.message);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Disable background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Top Header */}
      <div className="flex items-center justify-between w-full bg-gradient-to-r from-blue-500/90 to-green-400/90 backdrop-blur-lg px-6 py-3 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-10 w-10 rounded-xl shadow-md" />
          <h1 className="font-extrabold text-xl text-white tracking-wide">MindCare</h1>
        </div>

        {/* Desktop Auth + Avatar */}
        <div className="hidden sm:flex gap-4 items-center relative">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-sm rounded-lg border border-white/40 text-white hover:bg-white/20 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 text-sm rounded-lg bg-white text-blue-600 font-semibold shadow-md hover:scale-105 transition"
              >
                Get Started
              </button>
            </>
          ) : (
            <div ref={dropdownRef} className="relative">
              <img
                src={user.profileImage || defaultAvatar}
                alt="avatar"
                className="w-11 h-11 rounded-full cursor-pointer border-2 border-white shadow-md hover:scale-105 transition"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-xl border border-gray-200 z-50 overflow-hidden animate-fadeIn">
                  <div className="p-4 bg-gradient-to-r from-blue-100 to-green-100">
                    <p className="font-bold text-gray-700">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-500 font-medium transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-3xl text-white"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Desktop Menu Row */}
      <div className="hidden sm:flex flex-wrap justify-center gap-3 bg-white/70 backdrop-blur-md shadow px-4 py-1 sticky top-[64px] z-40">
        {menuItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? "text-blue-600 bg-blue-100 shadow"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-md shadow-2xl z-50 transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } sm:hidden overflow-y-auto`}
      >
        <div className="p-6 flex flex-col gap-5 min-h-full justify-between">
          {/* Menu Items */}
          <div className="flex flex-col gap-5">
            {menuItems.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-700 font-medium hover:bg-blue-100 transition"
              >
                <span className="text-xl text-blue-500">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold shadow-md hover:scale-105 transition"
              >
                Get Started
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="py-2 px-4 mt-4 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Header;
