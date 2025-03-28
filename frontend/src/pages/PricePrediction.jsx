import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const PricePrediction = () => {
  const [formData, setFormData] = useState({
    location: "",
    propertyType: "",
    area: "",
    BHK: "",
    bathrooms: "",
  });

  const [predictedPrice, setPredictedPrice] = useState(null);


//   const amenitiesList = [
//     "Air Conditioning",
//     "Parking",
//     "Swimming Pool",
//     "Gym",
//     "Balcony",
//     "Furnished",
//     "Garden",
//     "Security System",
//     "Elevator",
//   ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

//   const handleAmenityToggle = (amenity) => {
//     setFormData((prev) => ({
//       ...prev,
//       amenities: prev.amenities.includes(amenity)
//         ? prev.amenities.filter((item) => item !== amenity)
//         : [...prev.amenities, amenity],
//     }));
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Data:", formData);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if(result.sucess){
        // setPredictedPrice(result.price)
      }else{
        alert("error in predicting the price")
      }
    
    } catch (error) {
      console.error("Prediction Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Predict House Price
        </h1>
        <p className="text-gray-600 mb-6">
          Use our machine learning algorithm to estimate your property value.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Location */}
          <label htmlFor="location">Location</label>
          <div className="flex items-center border rounded-md p-2">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter Location ...."
              className="w-full outline-none"
            />
          </div>

          {/* Property Type */}
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
          >
            <option value="">Select property type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Studio">Studio</option>
            <option value="Penthouse">Penthouse</option>
          </select>

          {/* Area, Bedrooms, Bathrooms */}
          <div className="grid grid-cols-1 gap-4">
            <label htmlFor="area">Area</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              placeholder="Area in sqft"
              className="border p-2 rounded-md"
            />

            <label htmlFor="BHK"> BHK</label>
            <select
              name="BHK"
              value={formData.bedrooms}
              onChange={handleInputChange}
              className="border p-2 rounded-md cursor-pointer"
            >
              <option className="text-gray-600 mb-6" value="">No. of BHK</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5+ BHK</option>
            </select>

            <label htmlFor="bathrooms">Bathrooms</label>
            <select
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              className="border p-2 rounded-md cursor-pointer"
            >
              <option value="">No.of Bathrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
            </select>
          </div>

          {/* Amenities */}
          {/* <div>
            <h3 className="font-semibold mb-2">Amenities</h3>
            <div className="grid grid-cols-3 gap-2">
              {amenitiesList.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 cursor-pointer"
          >
            Predict Price →
          </button>
        </form>
      </div>

      {/* Estimated Price Section (Visible after clicking Predict) */}
      {predictedPrice && (
        <div className="mt-6 bg-white p-6 rounded-md shadow-md text-center">
          <h2 className="text-xl font-semibold">Estimated Price</h2>
          <p className="text-3xl font-bold text-black">₹{predictedPrice.toLocaleString()}</p>
          <p className="text-gray-500 text-sm mt-2">
            This estimate is based on recent sales of similar properties in your area and the details you provided.
          </p>

          {/* Low, Avg, High Estimate */}
          <div className="flex justify-center space-x-6 mt-4 text-gray-700">
            <div>
              <p className="font-semibold">₹330,000</p>
              <p className="text-sm">Low Estimate</p>
            </div>
            <div>
              <p className="font-semibold">₹{predictedPrice.toLocaleString()}</p>
              <p className="text-sm">Average</p>
            </div>
            <div>
              <p className="font-semibold">₹370,000</p>
              <p className="text-sm">High Estimate</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            <button className="bg-black text-white px-4 py-2 rounded cursor-pointer">View Similar Properties</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricePrediction;
