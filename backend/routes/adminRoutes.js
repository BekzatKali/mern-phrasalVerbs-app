import express from "express";
import {
  deleteUser,
  getAllUsers,
  getPhrasalVerbsOfUser,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminProtect } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/users", protect, adminProtect, getAllUsers);
router.get("/users/:id", protect, adminProtect, getPhrasalVerbsOfUser);
router.delete("/users/:id", protect, adminProtect, deleteUser);

export default router;
