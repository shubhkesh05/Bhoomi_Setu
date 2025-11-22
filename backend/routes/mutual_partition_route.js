
import express from "express";
import { protect } from "../middleware/authMiddleware.js"; // ✅ Updated
import {
  createMutualPartitionRequest,
  getMyMutualPartitionRequests,
  getMutualPartitionRequestById
} from "../controllers/mutualPartitionController.js";

const router = express.Router();

// Submit a new request
router.post("/", protect, createMutualPartitionRequest);

// Get all requests for the logged-in user
router.get("/my-requests", protect, getMyMutualPartitionRequests);

// Get a specific request by ID
router.get("/:id", protect, getMutualPartitionRequestById);

export default router;

