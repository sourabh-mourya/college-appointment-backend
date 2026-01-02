import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    let token;

    //  cookie se token
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
   

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized, User not found",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protect route controller", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default protectRoute;
