import { useState } from "react";
import propertyCard from "../components/PropertyCard";
import { Link, NavLink, useNavigate } from "react-router-dom";

import feature1 from "../assets/featurelisting1.avif";
import feature2 from "../assets/featurelisting2.avif";
import feature3 from "../assets/featurelisting3.avif";
import feature4 from "../assets/featurelisting4.avif";


const Home = () => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState(5000);
  const [bhk, setBhk] = useState("");

  // All available listings
  const allListings = [
    {
      title: "Modern Apartment in Downtown",
      location: "Downtown, City Center",
      price: 1200,
      bhk: "2 BHK",
      baths: "1 Bath",
      size: "850 sqft",
      image: feature1,
    },
    {
      title: "Spacious Family Home",
      location: "Suburban Area, North Side",
      price: 1800,
      bhk: "3 BHK",
      baths: "2 Baths",
      size: "1200 sqft",
      image: feature2,
    },
    {
      title: "Cozy Studio Apartment",
      location: "University District",
      price: 800,
      bhk: "1 BHK",
      baths: "1 Bath",
      size: "500 sqft",
      image: feature3,
    },
    {
      title: "Luxury Penthouse with View",
      location: "Riverside, East End",
      price: 2500,
      bhk: "3 BHK",
      baths: "2 Baths",
      size: "1500 sqft",
      image: feature4,
    },
  ];

  // Function to filter listings based on search criteria
  const filteredListings = allListings.filter((listing) => {
    const locationMatch = listing.location
      .toLowerCase()
      .includes(location.toLowerCase());
    const priceMatch = listing.price <= priceRange;
    const bhkMatch = bhk ? listing.bhk === bhk : true;

    return locationMatch && priceMatch && bhkMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="relative text-center bg-gradient-to-r from-blue-50 to-indigo-100 py-16 rounded-xl shadow-md">
        <h1 className="text-4xl font-extrabold text-gray-900">Find Your Perfect Home</h1>
        <p className="text-gray-600 mt-3 text-lg">
          Discover thousands of rental properties in your area.
        </p>

        {/* Modern Search Bar */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-white px-6 py-4 rounded-lg shadow-md max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="flex flex-col items-start">
            <label className="text-sm text-gray-600">Max Price: ₹{priceRange}</label>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full mt-1"
            />
          </div>

          <select
            value={bhk}
            onChange={(e) => setBhk(e.target.value)}
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select BHK</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
          </select>

          <button className="bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-indigo-700 transition w-full">
            Search
          </button>
        </div>
      </div>

      {/* Featured Listings */}
      <section className="mt-14">
        <h2 className="text-3xl font-semibold mb-6">Featured Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="h-40 w-full object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{listing.title}</h3>
                <p className="text-sm text-gray-500">{listing.location}</p>
                <p className="text-zinc-900 font-bold mt-3">₹{listing.price}/month</p>
                <p className="text-sm text-gray-500 mt-1">
                  {listing.bhk} • {listing.baths} • {listing.size}
                </p>
                <button className="mt-4 w-full bg-zinc-900 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-500">
              No listings found for your search criteria.
            </p>
          )}
        </div>
      </section>

      {/* Predict House Price */}
      <section className="mt-16 text-center bg-gradient-to-br from-gray-100 to-gray-200 p-10 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">Predict Your House Price</h2>
        <p className="text-gray-600 mt-3 text-md">
          Use our AI-powered tool to get an estimate of your property’s value.
        </p>
        <Link to="/predict">
        <button className="mt-6 bg-zinc-900 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition">
          Predict House Price
        </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;