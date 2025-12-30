import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import professorRouter from "./routes/professor.routes.js";
import studentRouter from "./routes/student.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser())
//configruation
dotenv.config();

app.use('/api',authRouter)
app.use('/api/professor',professorRouter)
app.use('/api/students',studentRouter)

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
