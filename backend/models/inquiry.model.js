import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;








