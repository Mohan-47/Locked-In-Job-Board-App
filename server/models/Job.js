import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },

  skills: {
    type: [String],
  },
  companyName: {
    type: String,
    required: true,
  },
  employees: {
    type: String,
  },
  companyLocation: {
    type: String,
  },

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["Open", "Closed"],
    default: "Open",
  },
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
