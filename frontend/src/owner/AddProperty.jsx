import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    Address: "",
    Location: "",
    price: "",
    BHK: "",
    Area: "",
    gym: false,
    parking: false,
  });
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.Address ||
      !formData.Location ||
      !formData.price ||
      !formData.BHK ||
      !formData.Area
    ) {
      alert("Please fill in all required fields!");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("Address", formData.Address);
    uploadData.append("Location", formData.Location);
    uploadData.append("price", formData.price);
    uploadData.append("BHK", formData.BHK);
    uploadData.append("Area", formData.Area);
    uploadData.append("gym", formData.gym);
    uploadData.append("parking", formData.parking);

    if (imageFile) {
      uploadData.append("image", imageFile); // Upload the file
    } else if (image) {
      uploadData.append("image", image); // If URL, just append the URL
    } else {
      alert("Please provide an image or image URL!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/owner/property/create",
        uploadData,
        { withCredentials: true }
      );
      alert(response.data.message);
      navigate("/owner/dashboard", { state: { added: true } }); // Navigate to dashboard after success
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Add Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Address</label>
          <input
            type="text"
            name="Address"
            className="border rounded-lg p-2"
            value={formData.Address}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Location</label>
          <input
            type="text"
            name="Location"
            className="border rounded-lg p-2"
            value={formData.Location}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Price</label>
          <input
            type="number"
            name="price"
            className="border rounded-lg p-2"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">BHK</label>
          <input
            type="number"
            name="BHK"
            className="border rounded-lg p-2"
            value={formData.BHK}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Area (sq ft)</label>
          <input
            type="number"
            name="Area"
            className="border rounded-lg p-2"
            value={formData.Area}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Image URL</label>
          <input
            type="text"
            className="border rounded-lg p-2"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter Image URL or Upload Image"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Or Upload Image</label>
          <input
            type="file"
            className="border rounded-lg p-2"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex gap-4">
          <div>
            <label>
              <input
                type="checkbox"
                name="gym"
                checked={formData.gym}
                onChange={handleCheckboxChange}
              />
              Gym
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="parking"
                checked={formData.parking}
                onChange={handleCheckboxChange}
              />
              Parking
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
