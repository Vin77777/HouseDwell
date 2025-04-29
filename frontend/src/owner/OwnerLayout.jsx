// owner/OwnerLayout.jsx
import { Outlet, NavLink } from "react-router-dom";

const OwnerLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Owner Panel</h2>
        <nav className="flex flex-col gap-3">
          <NavLink to="/owner/dashboard">All Properties</NavLink>
          <NavLink to="/owner/add-property">Add Property</NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerLayout;
