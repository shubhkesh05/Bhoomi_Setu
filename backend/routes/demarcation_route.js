

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createDemarcationRequest,
  getMyDemarcationRequests,
  getDemarcationRequestById
} from "../controllers/demarcationController.js";

const router = express.Router();

router.post("/", protect, createDemarcationRequest);

router.get("/my-requests", protect, getMyDemarcationRequests);

router.get("/:id", protect, getDemarcationRequestById);

export default router;
