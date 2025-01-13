import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import phrasalVerbRoutes from "../backend/routes/phrasalVerbRoutes.js";
import userRoutes from "../backend/routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allows us to accept JSON data in the req.body
app.use(express.json());

app.use("/api/phrasal-verbs", phrasalVerbRoutes);
app.use("/api/users", userRoutes);

connectDB();

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
