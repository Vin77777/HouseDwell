import express from "express";
import { getAllProperties, addProperty, updateProperty, deleteProperty } from "../controllers/owner.controller.js";
import { isLoggedIn, authorizeRoles } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/properties", isLoggedIn, authorizeRoles("owner"), getAllProperties);
router.put("/property/edit/:id", isLoggedIn, authorizeRoles("owner"), updateProperty);
router.delete("/property/delete/:id", isLoggedIn, authorizeRoles("owner"), deleteProperty);
// Owner uploading image to a specific property
router.post(
  "/property/create",
  isLoggedIn,
  authorizeRoles("owner"),
  upload.single("image"), // handles file upload
  addProperty
);


export default router;
