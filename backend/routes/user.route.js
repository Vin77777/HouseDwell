import express from "express";
import { registerUser,verifyUser,login,userProfile,logout,userUpdate } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
// router.get("/verify", verifyUser);
router.post("/login", login);
router.get("/profile",isLoggedIn,userProfile)
router.put("/update",isLoggedIn,userUpdate)
router.post("/logout",isLoggedIn,logout)


export default router;
