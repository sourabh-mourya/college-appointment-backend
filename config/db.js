import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database is Connected",process.env.MONGO_URL);
  } catch (error) {
    console.log("Connection Failed in MongoDB :- ", error.message);
  }
};

export default dbConnect;
