import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Candidate", "Recruiter"],
      required: true,
    },

    // common fields
    about: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    //candidate fields
    skills: {
      type: [String],
      default: [],
    },
    resume: {
      type: String,
      default: "",
    },

    //recruiter fields
    companyName: {
      type: String,
      default: "",
    },
    jobTitle: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
