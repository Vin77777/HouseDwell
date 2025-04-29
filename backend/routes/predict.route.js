import express from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { predictPrice } from "../controllers/predict.controller.js";

const predictRouter = express.Router();

predictRouter.post("/predict", isLoggedIn, predictPrice);

export default predictRouter;
