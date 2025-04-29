import axios from "axios";

const predictPrice = async (req, res) => {
  try {
    const data = {
      Location: req.body.location,
      BHK: parseInt(req.body.BHK),
      Area: parseFloat(req.body.area),
      Gym_Available: req.body.amenities.includes("Gym"),
      Parking_Available: req.body.amenities.includes("Parking"),
    };
    const response = await axios.post("http://localhost:8000/predict", data);
    console.log("data from fast api")
    console.log("response.data",response.data)
  
    res.json( response.data );
  } catch (error) {
    console.error("Error connecting to FastAPI:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { predictPrice };
