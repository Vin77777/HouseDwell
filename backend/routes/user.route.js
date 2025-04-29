import express from "express";
import { registerUser, login, userProfile, logout, userUpdate } from "../controllers/user.controller.js";
import { isLoggedIn, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

//Public Routes
router.post("/register", registerUser);       
router.post("/login", login);                  

//Protected Routes
router.get("/profile", isLoggedIn, userProfile);         
router.put("/update", isLoggedIn, userUpdate);           
router.post("/logout", isLoggedIn, logout);               

//Admin Specific Routes (Future expansion)
// router.get("/admin/profile", isLoggedIn, authorizeRoles("admin"), adminProfile);
// router.get("/admin/dashboard", isLoggedIn, authorizeRoles("admin"), adminDashboardController);  
// Admin can have separate dashboard/profile if needed

//Owner Specific Routes (Future expansion)
// router.get("/owner/dashboard", isLoggedIn, authorizeRoles("owner"), ownerDashboard);
// router.get("/owner/inquiries", isLoggedIn, authorizeRoles("owner"), ownerInquiryController);

export default router;
