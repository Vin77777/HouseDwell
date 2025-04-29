// components/PropertyCard.jsx
import { FiMapPin, FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";
const PropertyCard = ({ property, view }) => {
  const { title, location, price, bhk, baths, sqft, amenities } = property;

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg ${
        view === "list" ? "flex flex-col md:flex-row gap-4" : ""
      }`}
    >
      <div
        className={`${
          view === "list" ? "w-full md:w-1/3 h-48 md:h-auto" : "h-48"
        } bg-gray-200 flex items-center justify-center`}
      >
        <span className="text-3xl text-gray-400">📷</span>
      </div>

      <div className="p-4 flex flex-col justify-between w-full">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 flex items-center gap-1 mt-1">
            <FiMapPin size={16} /> {location}
          </p>
          <p className="text-lg font-bold text-gray-900 mt-2">₹ {price}</p>
        </div>

        <div className="flex flex-wrap justify-between text-sm text-gray-700 mt-4 gap-2">
          <span className="flex items-center gap-1">
            <FiHome size={16} /> {bhk}
          </span>
          <span>{baths} Baths</span>
          <span>{sqft} sqft</span>
          <span>{amenities[0]}</span>
        </div>

        <Link to={`/property/${property.id}`}>
          <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
