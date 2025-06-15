import express from "express";
import {
  applyToJob,
  getMyApplications,
  getApplicationsForJob,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/apply", authMiddleware, applyToJob); // candidate applies to job
router.get("/myapplications", authMiddleware, getMyApplications); // candidate's applications
router.get("/job/:jobId", authMiddleware, getApplicationsForJob); // recruiter views applicants for a job
router.put("/:id/status", authMiddleware, updateApplicationStatus);

export default router;
