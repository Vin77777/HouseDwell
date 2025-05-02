import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const location = useLocation();

  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/owner/properties",
        {
          withCredentials: true,
        }
      );
      setProperties(response.data.properties || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
      alert("Failed to load properties.");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (location.state?.added || location.state?.updated) {
      fetchProperties();
    }
  }, [location]);

  const handleInquiry = (id) => {
    navigate(`/owner/inquiry/${id}`);
  };


  const handleDelete = async (id) => {
    if (window.confirm("Do you want to remove this property?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/v1/owner/property/delete/${id}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          alert(response.data.message);
          // Refresh the property list without reloading the page
          fetchProperties();
        }
      } catch (error) {
        console.error("Error deleting property:", error);
        alert("Failed to remove property.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">Dashboard</h1>
        <Link
          to="/owner/add-property"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + Add Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <p className="text-gray-500 text-center">No properties added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <div
              key={prop._id}
              className="border rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={
                  prop.Image.startsWith("http")
                    ? prop.Image
                    : `http://localhost:3000${prop.Image}`
                }
                alt={prop.Address}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold text-indigo-700">{prop.Address}</h2>
                <p className="text-gray-600">{prop.Location}</p>
                <p className="text-gray-800 font-medium">₹{prop.price}</p>
                <div className="text-sm text-gray-500">BHK: {prop.BHK}, Area: {prop.Area} sqft</div>
                <div className="flex justify-around gap-3 mt-3">
                  
                  <button
                    onClick={() => handleDelete(prop._id)}
                    className="text-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleInquiry(prop._id)}
                    className="text-green-600 font-medium underline hover:text-green-800"
                  >
                    View Inquiries
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
