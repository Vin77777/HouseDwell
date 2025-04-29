import Inquiry from "../models/inquiry.model.js";
import Property from "../models/property.model.js";

const createInquiry = async (req, res) => {
    const { message, contactInfo } = req.body;
    const { propertyId } = req.params;  // Access propertyId from URL parameter
  
    if (!propertyId || !message || !contactInfo) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
  
    try {
      const inquiry = await Inquiry.create({
        property: propertyId,  // From req.params
        user: req.user.id,     // User making the inquiry (logged in user)
        message,
        contactInfo,
      });
  
      res.status(201).json({
        success: true,
        message: "Inquiry submitted successfully",
        inquiry,
      });
    } catch (error) {
      console.error("Error creating inquiry:", error);
      res.status(500).json({
        success: false,
        message: "Server error while creating inquiry",
      });
    }
  };
  

  const getOwnerInquiries = async (req, res) => {
    try {
      // Step 1: Find all properties of this owner
      const ownerProperties = await Property.find({ owner: req.user.id }).select("_id");
  
      const propertyIds = ownerProperties.map(p => p._id);
  
      // Step 2: Find all inquiries related to those properties
      const inquiries = await Inquiry.find({ property: { $in: propertyIds } })
        .populate("property", "Address Location price") // Property basic info
        .populate("user", "username email"); // User basic info
  
      res.status(200).json({
        success: true,
        inquiries,
      });
    } catch (error) {
      console.error("Error fetching owner inquiries:", error);
      res.status(500).json({
        success: false,
        message: "Server error while fetching inquiries",
      });
    }
  };
  
  export {createInquiry,getOwnerInquiries}


  