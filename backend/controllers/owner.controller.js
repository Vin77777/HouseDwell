import Property from "../models/property.model.js";

// 📍 Get All Properties - only for Owner
const getAllProperties = async (req, res) => {
    try {
      const properties = await Property.find({ owner: req.user.id }); // 🌟 Only fetch owner's properties
  
      res.status(200).json({
        success: true,
        properties,
      });
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({
        success: false,
        message: "Server error while fetching properties",
      });
    }
  };
  

// 📍 Add a New Property
const addProperty = async (req, res) => {
    const { Address, Location, price, BHK, Area, Image, gym, parking } = req.body;
  
    if (!Address || !Location || !price || !BHK || !Area) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled, including Image",
      });
    }
  
    try {
      const newProperty = await Property.create({
        Address,
        Location,
        price,
        BHK,
        Area,
        Image,        // 📸 set the image
        gym,
        parking,
        owner: req.user.id, // ⭐ Attach owner automatically
      });
      
      console.log(newProperty)

      res.status(201).json({
        success: true,
        message: "Property added successfully",
        property: newProperty,
      });
    } catch (error) {
      console.error("Error adding property:", error);
      res.status(500).json({
        success: false,
        message: "Server error while adding property",
      });
    }
  };

//Update Property
const updateProperty = async (req, res) => {
    const { id } = req.params;
  
    try {
      const property = await Property.findOne({ _id: id, owner: req.user.id });
  
      if (!property) {
        return res.status(404).json({
          success: false,
          message: "Property not found or unauthorized",
        });
      }
  
      // Update fields including Image
      const updatedData = {
        ...req.body,
      };
  
      const updatedProperty = await Property.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
      });
  
      res.status(200).json({
        success: true,
        message: "Property updated successfully",
        property: updatedProperty,
      });
    } catch (error) {
      console.error("Error updating property:", error);
      res.status(500).json({
        success: false,
        message: "Server error while updating property",
      });
    }
};
  

//Delete Property (optional)
const deleteProperty = async (req, res) => {
    const { id } = req.params;
  
    try {
      const property = await Property.findOneAndDelete({ _id: id, owner: req.user.id }); // 🌟 Owner should match
  
      if (!property) {
        return res.status(404).json({
          success: false,
          message: "Property not found or unauthorized",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Property deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting property:", error);
      res.status(500).json({
        success: false,
        message: "Server error while deleting property",
      });
    }
  };

// Upload property image (Owner only)
const uploadPropertyImage = async (req, res) => {
  try {
    const { propertyId } = req.params; // Get propertyId from URL params

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    const property = await Property.findOne({ _id: propertyId, ownerId: req.user.id });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found or you are not the owner",
      });
    }

    // Update the image field
    property.Image = req.file.path; // (Field should match your Property schema field 'Image')

    await property.save();

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      property,
    });

  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
  

export { getAllProperties, addProperty, updateProperty, deleteProperty,uploadPropertyImage };
