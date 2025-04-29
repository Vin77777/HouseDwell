import express from "express";
import { getAllProperties, addProperty, updateProperty, deleteProperty,uploadPropertyImage } from "../controllers/owner.controller.js";
import { isLoggedIn, authorizeRoles } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/properties", isLoggedIn, authorizeRoles("owner"), getAllProperties);
router.post("/property", isLoggedIn, authorizeRoles("owner"), addProperty);
router.put("/property/:id", isLoggedIn, authorizeRoles("owner"), updateProperty);
router.delete("/property/:id", isLoggedIn, authorizeRoles("owner"), deleteProperty);
// Owner uploading image to a specific property
router.post(
    "/property/:propertyId/upload-image",
    isLoggedIn,
    authorizeRoles('owner'), // only owner allowed
    upload.single("image"), // key name should be "image" in FormData
    uploadPropertyImage
  );


export default router;
