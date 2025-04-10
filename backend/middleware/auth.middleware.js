import jwt from "jsonwebtoken";

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log("Token is:", token ? "present" : "not present");

    if (!token) {
      console.log("No token found in cookies.");
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Token missing.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token data:", decoded);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export { isLoggedIn };
