import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
} from "../controllers/jobController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createJob); // recruiter only
router.get("/", getJobs);
router.get("/myposted", authMiddleware, getMyJobs); //recruiter
router.get("/:id", getJobById);
router.put("/:id", authMiddleware, updateJob); // recruiter only
router.delete("/:id", authMiddleware, deleteJob); // recruiter only

export default router;
