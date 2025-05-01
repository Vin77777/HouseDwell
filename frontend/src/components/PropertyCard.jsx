import { FiMapPin, FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";

const PropertyCard = ({ property, view }) => {
  // Mapping backend schema fields to frontend UI
  const {
    _id,
    Address,
    Location,
    price,
    BHK,
    Area,
    gym,
    parking,
    Image,
  } = property;

  // Generate amenities array based on boolean fields
  const amenities = [];
  if (gym) amenities.push("Gym");
  if (parking) amenities.push("Parking");

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg ${
        view === "list" ? "flex flex-col md:flex-row gap-4" : ""
      }`}
    >
      {/* Image section */}
      <div
        className={`${
          view === "list" ? "w-full md:w-1/3 h-48 md:h-auto" : "h-48"
        }`}
      >
        <img
          src={
              Image.startsWith("http")
              ? Image
              : `http://localhost:3000${Image}`
          }
          alt={Address}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Property Info */}
      <div className="p-4 flex flex-col justify-between w-full">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{Address}</h3>
          <p className="text-gray-600 flex items-center gap-1 mt-1">
            <FiMapPin size={16} /> {Location}
          </p>
          <p className="text-lg font-bold text-gray-900 mt-2">₹ {price}</p>
        </div>

        <div className="flex flex-wrap justify-between text-sm text-gray-700 mt-4 gap-2">
          <span className="flex items-center gap-1">
            <FiHome size={16} /> {BHK} BHK
          </span>
          <span>{Area} sqft</span>
          <span>{amenities.length > 0 ? amenities.join(", ") : "No amenities"}</span>
        </div>

        <Link to={`/property/${_id}`}>
          <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
