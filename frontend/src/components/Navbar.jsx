import { useEffect, useState, useRef } from "react";
import { FiSearch, FiUser } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    if (userData) {
      setUser(userData); // Update state with user data from localStorage
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async() => {
    localStorage.removeItem("userInfo");

    setUser(null); // Clear user state
    try {
        await axios.post("http://localhost:3000/api/v1/users/logout", {}, { withCredentials: true });
        navigate("/login");
      } catch (err) {
        console.error("Logout error", err);
      }
  };

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Save user data to localStorage
    setUser(userData); // Update state with user data
  };

  // Do not render navbar if owner is logged in
  if (localStorage.getItem("owner")) return null;

  return (
    <div className="flex justify-between items-center px-6 py-3 shadow-md bg-white">
      {/* Logo */}
      <div>
        <span className="text-2xl font-semibold text-gray-900">
          <Link to="/" className="flex items-center font-medium">
            HouseDwell
          </Link>
        </span>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center gap-6 text-gray-600">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `duration-200 ${
                isActive ? "text-gray-900 font-bold underline" : "text-gray-600"
              } hover:text-grey-700`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/listings"
            className={({ isActive }) =>
              `duration-200 ${
                isActive ? "text-gray-900 font-bold underline" : "text-gray-600"
              } hover:text-grey-700`
            }
          >
            Listings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/predict"
            className={({ isActive }) =>
              `duration-200 ${
                isActive ? "text-gray-900 font-bold underline" : "text-gray-600"
              } hover:text-grey-700 `
            }
          >
            Price Prediction
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `duration-200 ${
                isActive ? "text-gray-900 font-bold underline" : "text-gray-600"
              } hover:text-grey-700`
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `duration-200 ${
                isActive ? "text-gray-900 font-bold underline" : "text-gray-600"
              } hover:text-grey-700`
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Search & User Area */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <FiSearch
          className="text-gray-600 cursor-pointer hover:text-gray-900"
          size={20}
        />

        {!user ? (
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100">
            <FiUser size={18} />
            <Link to="/login">Sign-in</Link>
          </button>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <FiUser size={18} />
              <span>Profile</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                <div className="px-4 py-2 text-sm text-gray-800 border-b">
                  {user.name}
                </div>
                <Link
                  to="/user/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Get Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
