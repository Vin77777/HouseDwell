// owner/OwnerLayout.jsx
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const OwnerLayout = () => {
  const [ownerName, setOwnerName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const ownerData = JSON.parse(localStorage.getItem("ownerInfo"));
    if (ownerData && ownerData.name) {
      setOwnerName(ownerData.name);
    }
  }, []);

  const handleLogout = async () => {
    if (window.confirm("Do you want to log out?")) {
      localStorage.removeItem("ownerInfo");
      try {
        await axios.post("http://localhost:3000/api/v1/users/logout", {}, { withCredentials: true });
        navigate("/login");
      } catch (err) {
        console.error("Logout error", err);
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 border-r flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-2">Owner Panel</h2>
          <p className="text-sm text-gray-700 mb-4">
            Welcome, <span className="font-medium">@{ownerName}</span>
          </p>

          <nav className="flex flex-col gap-3">
            <NavLink to="/owner/dashboard">All Properties</NavLink>
            <NavLink to="/owner/add-property">Add Property</NavLink>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerLayout;
