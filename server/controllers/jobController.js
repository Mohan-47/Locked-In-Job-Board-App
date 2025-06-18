import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      postedBy: req.user._id, // Assuming req.user is set by authentication middleware
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to create job" });
    console.error(error);
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy");
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name companyName"
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Error fetching job" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(job);
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ message: "Error updating job" });
  }
};

// Delete job
export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ message: "Error deleting job" });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.userId });
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs for user:", err);
    res.status(500).json({ message: "Error fetching your jobs" });
  }
};
