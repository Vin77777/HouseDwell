import { useState } from "react";
import propertyCard from "../components/PropertyCard"
const Home = () => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState(5000);
  const [bhk, setBhk] = useState("");

  const featuredListings = [
    {
      title: "Modern Apartment in Downtown",
      location: "Downtown, City Center",
      price: "₹1200/month",
      bhk: "2 BHK",
      baths: "1 Baths",
      size: "850 sqft",
    },
    {
      title: "Spacious Family Home",
      location: "Suburban Area, North Side",
      price: "₹1800/month",
      bhk: "3 BHK",
      baths: "2 Baths",
      size: "1200 sqft",
    },
    {
      title: "Cozy Studio Apartment",
      location: "University District",
      price: "₹800/month",
      bhk: "1 BHK",
      baths: "1 Baths",
      size: "500 sqft",
    },
    {
      title: "Luxury Penthouse with View",
      location: "Riverside, East End",
      price: "₹2500/month",
      bhk: "3 BHK",
      baths: "2 Baths",
      size: "1500 sqft",
    },
  ];

  return (
    <div className="-w-6xl mx-auto p-6">
      {/* Hero Section */}
      <div className="relative text-center bg-gray-200 py-20 rounded-md">
        <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Home</h1>
        <p className="text-gray-600 mt-2">Discover thousands of rental properties in your area.</p>

        {/* Search Bar */}
        {/* <div className="mt-6 flex items-center bg-white p-4 rounded-lg shadow-md space-x-4">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 flex-grow rounded-md"
          />
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="cursor-pointer"
          />
          <select
            className="border p-2 rounded-md"
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
          >
            <option value="">BHK</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
          </select>
          <button className="bg-black text-white px-4 py-2 rounded-md">Search</button>
        </div> */}
      </div>

      {/* Featured Listings */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Featured Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredListings.map((listing, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="bg-gray-200 h-32 rounded-md mb-4"></div>
              <h3 className="font-semibold">{listing.title}</h3>
              <p className="text-gray-500 text-sm">{listing.location}</p>
              <p className="font-bold mt-2">{listing.price}</p>
              <p className="text-gray-500 text-sm">
                {listing.bhk} • {listing.baths} • {listing.size}
              </p>
              <button className="bg-black text-white px-4 py-2 mt-3 rounded-md w-full">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Predict House Price */}
      <section className="mt-10 text-center bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-bold">Predict Your House Price</h2>
        <p className="text-gray-600 mt-2">
          Use our AI-powered tool to get an estimate of your property’s value.
        </p>
        <button className="mt-4 bg-black text-white px-6 py-2 rounded-md">
          Predict House Price
        </button>
      </section>
    </div>
  );
};

export default Home;
