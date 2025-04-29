import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const tabs = ["Description", "Amenities", "Map"];

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");

  useEffect(() => {
    // Dummy static data – replace with API later
    setProperty({
      id,
      title: "Modern 3BHK Apartment",
      location: "Mumbai, India",
      image: "data:image/jpeg;base64,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",
      description:
        "This is a beautifully designed modern apartment located in the heart of Mumbai with 3 bedrooms, 2 bathrooms, and a spacious living area.",
      amenities: [
        "Gym",
        "Covered Parking",
      ],
      mapEmbedUrl: "https://maps.google.com/maps?q=thane&t=&z=13&ie=UTF8&iwloc=&output=embed",
    });
  }, [id]);

  if (!property) return null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Link to="/listings" className="text-sm text-gray-500 hover:text-black mb-4 inline-block">
        ← Back to listings
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <img
            src={property.image}
            alt="Property"
            className="rounded-xl w-full h-auto object-cover border"
          />

          {/* Tabs */}
          <div className="mt-6">
            <div className="border-b flex gap-6 text-sm font-medium">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 border-b-2 transition-all ${
                    activeTab === tab
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-black"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-4 text-sm text-gray-700">
              {activeTab === "Description" && <p>{property.description}</p>}

              {activeTab === "Amenities" && (
                <ul className="list-disc pl-5 space-y-1">
                  {property.amenities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}

              {activeTab === "Map" && (
                <div className="w-full h-64">
                  <iframe
                    src={property.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Agent Sidebar */}
        <div className="w-full md:w-[350px] border rounded-xl p-6 shadow-sm">
          <div className="flex justify-end gap-2 mb-4">
            <button className="border px-3 py-1 rounded-md text-sm hover:bg-gray-100">♡ Save</button>
            <button className="border px-3 py-1 rounded-md text-sm hover:bg-gray-100">🔗 Share</button>
          </div>

          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full mr-3" />
            <div>
              <h3 className="font-semibold">Jane Smith</h3>
              <p className="text-sm text-gray-500">Property Agent</p>
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-4 space-y-1">
            <p>📞 (123) 456-7890</p>
            <p>📧 jane.smith@example.com</p>
          </div>

          <form className="space-y-3">
            <input type="text" placeholder="Your Name" className="w-full border rounded-md px-3 py-2 text-sm" />
            <input type="email" placeholder="Your Email" className="w-full border rounded-md px-3 py-2 text-sm" />
            <input type="text" placeholder="Your Phone" className="w-full border rounded-md px-3 py-2 text-sm" />
            <textarea placeholder="Message (Optional)" rows="3" className="w-full border rounded-md px-3 py-2 text-sm" />
            <button type="submit" className="bg-black text-white w-full py-2 rounded-md hover:bg-gray-800">
              Contact Agent
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
