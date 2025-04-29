import express from "express";
import { createInquiry, getOwnerInquiries } from "../controllers/inquiry.controller.js";
import { isLoggedIn, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

// User creates inquiry
router.post("/create/:propertyId", isLoggedIn, authorizeRoles("user"), createInquiry);

// Owner views inquiries
router.get("/owner/inquiries", isLoggedIn, authorizeRoles("owner"), getOwnerInquiries);

export default router;






