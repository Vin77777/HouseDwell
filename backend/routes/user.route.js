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


export default router;
