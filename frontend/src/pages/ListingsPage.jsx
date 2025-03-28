import { useState } from "react";
import { FiSearch, FiList, FiGrid } from "react-icons/fi";
import PropertyCard from "../components/PropertyCard"; 

// Mock data (20 properties)
const properties = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Property ${i + 1}`,
  location: `Location ${i + 1}`,
  price: `$${(i + 1) * 100}/month`,
  bhk: `${(i % 4) + 1} BHK`,
  baths: `${(i % 3) + 1}`,
  sqft: `${(i + 1) * 100} sqft`,
}));

const ListingsPage = () => {
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  // Get properties for current page
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProperties = properties.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Property Listings</h1>

      {/* Search & Sort */}
      <div className="flex justify-between items-center gap-4 mb-6 border rounded-md p-2">
        <input type="text" placeholder="Search by location, property name..." className="flex-1 p-2 outline-none" />
        <select className="border p-2 rounded-md">
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
        <button className="border p-2 rounded-md">Filters</button>
      </div>

      <div className="flex">
        {/* Sidebar Filters */}
        <div className="w-1/4 p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">Filters</h2>

          <div className="mb-4">
            <label className="block font-medium">Price Range</label>
            <div className="flex gap-2">
              <input type="text" placeholder="Min" className="border p-2 rounded-md w-1/2" />
              <input type="text" placeholder="Max" className="border p-2 rounded-md w-1/2" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium">Property Type</label>
            {["Apartment", "House", "Villa", "Studio", "Penthouse"].map((type) => (
              <div key={type} className="flex items-center gap-2">
                <input type="checkbox" />
                <span>{type}</span>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label className="block font-medium">Bedrooms</label>
            <div className="flex gap-2">
              {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"].map((bhk) => (
                <button key={bhk} className="border p-2 py-1 mt-1 rounded-md">{bhk}</button>        
              ))}
            </div>
          </div>
        </div>

        {/* Listings Section */}
        <div className="w-3/4 px-6">
          <div className="flex justify-between items-center mb-4">
            <p>Showing {currentProperties.length} properties</p>
            <div className="flex gap-2">
              <FiList className={`cursor-pointer ${view === "list" && "text-gray-400"}`} size={20} onClick={() => setView("list")} />
              <FiGrid className={`cursor-pointer ${view === "grid" && "text-gray-400"}`} size={20} onClick={() => setView("grid")} />
            </div>
          </div>

          {/* Property Listings */}
          <div className={`${view === "grid" ? "grid grid-cols-3 gap-6" : "flex flex-col gap-4"}`}>
            {currentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-2 border rounded-md ${currentPage === i + 1 ? "bg-gray-500 text-white" : ""}`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsPage
