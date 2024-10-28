import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import applicationRoutes from "./routes/applicationRoutes.js";

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
