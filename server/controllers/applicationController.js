import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { getMyJobs } from "./jobController.js";
// Apply to a job
export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const candidateId = req.user.userId;

    // Prevent duplicate applications
    const existing = await Application.findOne({
      job: jobId,
      candidate: candidateId,
    });
    if (existing)
      return res.status(400).json({ message: "Already applied to this job." });

    const application = new Application({ job: jobId, candidate: candidateId });
    await application.save();
    await Job.findByIdAndUpdate(
      jobId,
      { $addToSet: { applicants: candidateId } } // $addToSet prevents duplicates
    );
    await Job.findById(jobId).populate("applicants");
    res.status(201).json(application);
  } catch (err) {
    console.error("Error applying to job:", err);
    res.status(500).json({ message: "Error applying to job" });
  }
};

// Get applications for a candidate
export const getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({
      candidate: req.user.userId,
    }).populate("job");
    res.json(apps);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Error fetching applications" });
  }
};

// Get applications for a job (recruiter)
export const getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const apps = await Application.find({ job: jobId }).populate("candidate");
    res.json(apps);
  } catch (err) {
    console.error("Error fetching job applications:", err);
    res.status(500).json({ message: "Error fetching job applications" });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("job candidate");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    console.log(`Application status updated to ${status}`);
    res.json(application);
  } catch (err) {
    console.error("Error updating application status:", err);
    res.status(500).json({ message: "Error updating application status" });
  }
};

//applications received by the recruiter
export const getApplicationsReceived = async (req, res) => {
  try {
    const recruiterId = req.user.userId;
    const jobs = await Job.find({ postedBy: recruiterId });
    // console.log(jobs);
    const applications = await Application.find({
      job: { $in: jobs.map((job) => job._id) },
    })
      .populate("candidate")
      .populate("job")

      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Error fetching applications" });
  }
};
