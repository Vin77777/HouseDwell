import User from "../models/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer"; // install
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(500).json({
      success: false,
      message: "all fields are required",
    });
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.json({
        success: false,
        message: "user already exist",
      });

    const user = await User.create({
      username,
      email,
      password,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not registered",
      });
    }
    const token = crypto.randomBytes(32).toString("hex");
    console.log(token);
    user.verificationToken = token;

    await user.save();
    console.log(user);
    //send email
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   secure: false, // true for port 465, false for other ports
    //   auth: {
    //     user: process.env.MAILTRAP_USERNAME,
    //     pass: process.env.MAILTRAP_PASSWORD,
    //   },
    // });

    // const mailOption = {
    //   from: process.env.MAILTRAP_SENDEREMAIL,
    //   to: user.email,
    //   subject: "Verify your email", // Subject line
    //   text: `Please click on the following link:
    //   ${process.env.BASE_URL}/api/users/verify/${token}
    //   `,
    // };

    // await transporter.sendMail(mailOption);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "User not registered ",
      error,
    });
  }
};

const verifyUser = async (req, res) => {
  const { token } = req.params;
  console.log(token);
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }
  try {
    console.log("verification started");

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User verified successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "User not verified",
      error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ✅ Include role and other info in token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.ENV === "production", // only true in production
      sameSite: process.env.ENV === "production" ? "none" : "lax", // adjust for local dev
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const userProfile = async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in get me", error);
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const userUpdate= async(req,res)=>{
  const { username,profilePic } = req.body;
  if(!username || !profilePic){
    return res.status(400).json({
      success:false,
      message:"All feild are required"
    })
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    user.username=username;
    user.profilePic=profilePic;

    await user.save();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }

}

const logout = async (req, res) => {
  try {
    res.cookie("token", "", {});
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("error while logout", error);
  }
};

export { registerUser, verifyUser, login, userProfile,userUpdate, logout };
