

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createDemarcationRequest,
  getMyDemarcationRequests,
  getDemarcationRequestById
} from "../controllers/demarcationController.js";

const router = express.Router();

// Submit a new demarcation request
router.post("/", protect, createDemarcationRequest);

// Get all demarcation requests of logged-in user
router.get("/my-requests", protect, getMyDemarcationRequests);

// Get specific demarcation request by ID
router.get("/:id", protect, getDemarcationRequestById);

export default router;
