// owner/PropertyDetails.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    axios.get(`/api/owner/properties/${id}`).then((res) => {
      setProperty(res.data.property);
    });

    axios.get(`/api/inquiries/property/${id}`).then((res) => {
      setInquiries(res.data.inquiries);
    });
  }, [id]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">{property?.Address}</h1>
      <p>{property?.Location}</p>
      <h2 className="mt-4 text-lg font-semibold">Inquiries</h2>
      {inquiries.length === 0 ? (
        <p>No inquiries yet.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {inquiries.map((inq) => (
            <li key={inq._id} className="border p-3 rounded">
              <p><strong>User:</strong> {inq.user?.username}</p>
              <p><strong>Message:</strong> {inq.message}</p>
              <p><strong>Date:</strong> {new Date(inq.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PropertyDetails;
