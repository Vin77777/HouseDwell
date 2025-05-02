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
    // Find the property and populate owner.name and owner.email
    const property = await Property.findById(req.params.id)
      .populate("owner", "name email");

    if (!property) {
      return res
        .status(404)
        .json({ success: false, error: "Property not found" });
    }

    // Attach ownerName and ownerEmail to the response object
    const responsePayload = {
      ...property.toObject(),
      ownerName:  property.owner.name,
      ownerEmail: property.owner.email,
    };

    res.status(200).json({ success: true, property: responsePayload });
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    res.status(500).json({ success: false, error: "Failed to fetch property" });
  }
};

