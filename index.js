import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

//configruation
dotenv.config();

app.use('/api',authRouter)

const PORT = process.env.PORT;
await dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed", error);
    process.exit(1);
  });
