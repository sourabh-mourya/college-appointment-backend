import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
const singup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //check if user already exits or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with the email",
      });
    }
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //store in the database
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    return res.status(201).json({
      message: "User Created SuccessFully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error in singup controller", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default singup;
