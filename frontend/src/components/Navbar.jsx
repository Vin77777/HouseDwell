import { FiSearch, FiUser } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
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
            to=""
            className={({ isActive }) =>
              ` duration-200 ${
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
              ` duration-200 ${
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
              ` duration-200 ${
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
              ` duration-200 ${
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
              ` duration-200 ${
                isActive ? "text-gray-900 font-bold underline" : "text-gray-600"
              } hover:text-grey-700`
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Search Icon & Sign-in Button */}
      <div className="flex items-center gap-4">
        <FiSearch
          className="text-gray-600 cursor-pointer hover:text-gray-900"
          size={20}
        />
        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 ">
          <FiUser size={18} />
          <span><Link to="/Login">Sign-in</Link></span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
