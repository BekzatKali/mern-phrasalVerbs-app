import express from "express";
import {
  createPhrasalVerb,
  deletePhrasalVerb,
  getPhrasalVerbs,
  updatePhrasalVerb,
} from "../controllers/phrasalVerbController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getPhrasalVerbs)
  .post(protect, createPhrasalVerb);
router.put("/:id", protect, updatePhrasalVerb);
router.delete("/:id", protect, deletePhrasalVerb);

export default router;
