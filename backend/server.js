import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import phrasalVerbRoutes from "../backend/routes/phrasalVerbRoutes.js";
import userRoutes from "../backend/routes/userRoutes.js";
import adminRoutes from "../backend/routes/adminRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// This allows us to accept JSON data in the req.body
app.use(express.json());

app.use("/api/phrasal-verbs", phrasalVerbRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

connectDB();

app.use(errorHandler);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
