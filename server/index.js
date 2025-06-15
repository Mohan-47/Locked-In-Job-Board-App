// filepath: server/index.js
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "dotenv/config";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/job.js";
import applicationRoutes from "./routes/application.js";
// initialise express
const app = express();

//connect to MongoDB
await connectDB();

//middlewares
app.use(cors());
app.use(express.json());

//Port
const PORT = process.env.PORT || 5000;

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
