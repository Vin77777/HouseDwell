import Property from "../models/property.model.js";

import dotenv from "dotenv";
dotenv.config()

// Fetch all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({success:true,properties});
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
};

// Fetch a single property by ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({success:false, error: "Property not found" });
    }
    res.status(200).json({success:true,property});
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    res.status(500).json({ error: "Failed to fetch property" });
  }
};











