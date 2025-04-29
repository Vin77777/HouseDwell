import jwt from "jsonwebtoken";

// ✅ Check if user is logged in
const isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log("Token is:", token ? "present" : "not present");

    if (!token) {
      console.log("No token found in cookies.");
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token data:", decoded);

    req.user = decoded; // attaching user info to req.user

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

// ✅ Check user role
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user.role}) is not authorized to access this resource.`,
      });
    }
    next();
  };
};

export { isLoggedIn, authorizeRoles };
