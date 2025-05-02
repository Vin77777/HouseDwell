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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(""); // Clear URL if file is selected
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Address, Location, price, BHK, Area, gym, parking } = formData;

    if (!Address || !Location || !price || !BHK || !Area) {
      alert("Please fill in all required fields!");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("Address", Address);
    uploadData.append("Location", Location);
    uploadData.append("price", price);
    uploadData.append("BHK", BHK);
    uploadData.append("Area", Area);
    uploadData.append("gym", gym);
    uploadData.append("parking", parking);

    if (imageFile) {
      uploadData.append("Image", imageFile); // for backend req.file
    } else if (image) {
      uploadData.append("Image", image); // for backend req.body.Image
    } else {
      alert("Please provide an image URL or upload a file.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/owner/property/create",
        uploadData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(response.data.message);
      navigate("/owner/dashboard", { state: { added: true } });
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Failed to add property.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Add Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["Address", "Location", "price", "BHK", "Area"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-lg font-semibold">{field}</label>
            <input
              type={field === "price" || field === "BHK" || field === "Area" ? "number" : "text"}
              name={field}
              className="border rounded-lg p-2"
              value={formData[field]}
              onChange={handleInputChange}
            />
          </div>
        ))}

        <div className="flex flex-col">
          <label className="text-lg font-semibold">Image URL</label>
          <input
            type="text"
            className="border rounded-lg p-2"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
              setImageFile(null); // clear file input if URL used
            }}
            placeholder="Enter Image URL or Upload Image"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-semibold">Or Upload Image</label>
          <input type="file" className="border rounded-lg p-2" onChange={handleImageChange} />
        </div>

        {(image || imageFile) && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Image Preview:</p>
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : image}
              alt="Preview"
              className="h-40 w-auto object-cover mt-1 rounded border"
            />
          </div>
        )}

        <div className="flex gap-4 mt-2">
          <label>
            <input
              type="checkbox"
              name="gym"
              checked={formData.gym}
              onChange={handleCheckboxChange}
              className="mr-1"
            />
            Gym
          </label>
          <label>
            <input
              type="checkbox"
              name="parking"
              checked={formData.parking}
              onChange={handleCheckboxChange}
              className="mr-1"
            />
            Parking
          </label>
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
