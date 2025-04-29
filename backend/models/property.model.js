import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  Address: { type: String, required: true },
  Location: { type: String, required: true },
  price: { type: Number, required: true },
  BHK: { type: Number, required: true },
  Area: { type: Number, required: true },
  Image: { type: String, required: true },
  gym: { type: Boolean, default: false },
  parking: { type: Boolean, default: false },
  Image: { type: String, required: true, default: "" },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming your user model is named "User"
    required: true,
  },
}, { timestamps: true });

const Property = mongoose.model("Property", propertySchema);
export default Property