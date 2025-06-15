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
    enum: ["full-time", "part-time", "contract", "internship"],
    required: true,
  },
  salary: {
    type: Number,
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
    type: Number,
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
    enum: ["open", "closed"],
    default: "open",
  },
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
