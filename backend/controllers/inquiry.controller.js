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
      const { propertyId } = req.params;
  
      // Step 1: Check if the property 
      const property = await Property.findOne({ _id: propertyId });
  
      if (!property) {
        return res.status(403).json({
          success: false,
          message: "You do not have access to this property or it does not exist.",
        });
      }
  
      // Step 2: Find inquiries for that specific property
      const inquiries = await Inquiry.find({ property: propertyId })
        .populate("property", "Address Location price")
        .populate("user", "username email");
  
      res.status(200).json({
        success: true,
        inquiries,
      });
    } catch (error) {
      console.error("Error fetching property inquiries:", error.message);
      res.status(500).json({
        success: false,
        message: "Server error while fetching inquiries",
      });
    }
  };
  
  export {createInquiry,getOwnerInquiries}


  