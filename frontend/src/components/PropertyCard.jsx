import { FiMapPin, FiHome } from "react-icons/fi";

const PropertyCard = () => {
  return (
    <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Image Placeholder */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">📷</span>
      </div>

      {/* Property Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">Modern Apartment in Downtown</h3>
        <p className="text-gray-600 flex items-center gap-1">
          <FiMapPin size={14} /> Downtown, City Center
        </p>

        <p className="text-lg font-bold text-gray-900 mt-2">₹500/month</p>

        <div className="flex justify-between text-gray-700 mt-3">
          <span className="flex items-center gap-1"><FiHome size={16} /> 1 BHK</span>
          <span>1 Baths</span>
          <span>300 sqft</span>
        </div>

        {/* Button */}
        <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
