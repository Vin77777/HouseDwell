import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const tabs = ["Description", "Amenities", "Map"];

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeTab, setActiveTab] = useState("Description");

  // Contact form state
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/property/${id}`,
          { withCredentials: true }
        );
        setProperty(response.data.property);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) return <div className="text-center mt-10">Loading...</div>;

  const {
    Address,
    Location,
    price,
    BHK,
    Area,
    gym,
    parking,
    Image,
    ownerName,
    ownerEmail,
  } = property;
  
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(Location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  

  const amenities = [];
  if (gym) amenities.push("Gym");
  if (parking) amenities.push("Parking");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/inquiry/create/${id}`,
        {
          contactInfo: phone,
          message,
        },
        { withCredentials: true }
      );
      alert(res.data.message || "Inquiry sent successfully!");
      setPhone("");
      setMessage("");
    } catch (err) {
      console.error("Error sending inquiry:", err);
      alert(
        err.response?.data?.message ||
          "Failed to send inquiry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Link
        to="/listings"
        className="text-sm text-gray-500 hover:text-black mb-4 inline-block"
      >
        ← Back to listings
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Section */}
        <div className="flex-1">
          <img
            src={
              Image.startsWith("https")
              ? Image
              : `http://localhost:3000${Image}`
          }
            alt="Property"
            className="rounded-xl w-full h-150 object-cover border"
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
              {activeTab === "Description" && (
                <div className="space-y-1">
                  <p>
                    <strong>Address:</strong> {Address}
                  </p>
                  <p>
                    <strong>Location:</strong> {Location}
                  </p>
                  <p>
                    <strong>BHK:</strong> {BHK}
                  </p>
                  <p>
                    <strong>Area:</strong> {Area} sqft
                  </p>
                  <p>
                    <strong>Price:</strong> ₹ {price}
                  </p>
                </div>
              )}

              {activeTab === "Amenities" && (
                <ul className="list-disc pl-5 space-y-1">
                  {amenities.length > 0 ? (
                    amenities.map((item, index) => <li key={index}>{item}</li>)
                  ) : (
                    <li>No amenities listed.</li>
                  )}
                </ul>
              )}

              {activeTab === "Map" && mapEmbedUrl && (
                <div className="w-full h-64">
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Property Location"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Agent Sidebar & Contact Form */}
        <div className="w-full md:w-[350px] border rounded-xl p-6 shadow-sm">
          <div className="flex justify-end gap-2 mb-4">
            <button className="border px-3 py-1 rounded-md text-sm hover:bg-gray-100">
              ♡ Save
            </button>
            <button className="border px-3 py-1 rounded-md text-sm hover:bg-gray-100">
              🔗 Share
            </button>
          </div>

          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full mr-3" />
            <div>
              <h3 className="font-semibold">{ownerName || "Agent"}</h3>
              <p className="text-sm text-gray-500">Property Owner</p>
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-4 space-y-1">
            <p>📧 {ownerEmail || "Not Available"}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Your Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
            <textarea
              placeholder="Message (Optional)"
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-black text-white w-full py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Contact Owner"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
