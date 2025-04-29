import express from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { getAllProperties, getPropertyById } from "../controllers/property.controller.js";

const propertyRouter = express.Router();

propertyRouter.get("/property", isLoggedIn, getAllProperties);
propertyRouter.get("/property/:id", isLoggedIn, getPropertyById);

export default propertyRouter;

