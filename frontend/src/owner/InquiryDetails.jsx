import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const InquiryDetails = () => {
  const { id } = useParams(); // Corrected: useParams is a function
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/inquiry/owner/inquiries/${id}`,
          { withCredentials: true }
        );
        setInquiries(res.data.inquiries);
      } catch (error) {
        console.error("Failed to fetch inquiries:", error);
        setError("Error fetching inquiries");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [id]);

  const property = inquiries[0]?.property;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Property Inquiries</h1>

      {loading && <p className="text-gray-600">Loading inquiries...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {property && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold text-indigo-700">{property.Address}</h2>
          <p className="text-gray-600">{property.Location}</p>
          <p className="text-gray-800">Price: rupe {property.price}</p>
        </div>
      )}

      <h2 className="text-lg font-semibold mb-2">Inquiries</h2>

      {!loading && inquiries.length === 0 ? (
        <p className="text-gray-500">No inquiries found for this property.</p>
      ) : (
        <ul className="space-y-4">
          {inquiries.map((inq) => (
            <li key={inq._id} className="border p-4 rounded shadow-sm bg-white">
              <p><strong>User:</strong> {inq.user?.username || "N/A"}</p>
              <p><strong>Email:</strong> {inq.user?.email || "N/A"}</p>
              <p><strong>Contact Info:</strong> {inq.contactInfo}</p>
              <p><strong>Message:</strong> {inq.message}</p>
              <p><strong>Date:</strong> {new Date(inq.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InquiryDetails;
