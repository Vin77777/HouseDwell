// owner/Dashboard.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get("/api/owner/properties").then((res) => {
      setProperties(res.data.properties);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((prop) => (
          <div key={prop._id} className="border p-4 rounded shadow">
            <img src={prop.Image} className="w-full h-48 object-cover rounded" alt="" />
            <h2 className="text-lg font-semibold">{prop.Address}</h2>
            <p>{prop.Location}</p>
            <p>₹{prop.price}</p>
            <div className="flex gap-2 mt-2">
              <Link to={`/owner/edit/${prop._id}`} className="text-blue-600 underline">Edit</Link>
              <button className="text-red-600" onClick={() => handleDelete(prop._id)}>Delete</button>
              <Link to={`/owner/property/${prop._id}`} className="text-green-600 underline">View Inquiries</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
