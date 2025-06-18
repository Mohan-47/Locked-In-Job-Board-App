import React from "react";
import {
  FaTimes,
  FaBookmark,
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaBuilding,
  FaUsers,
  FaCode,
  FaCalendarAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const JobModal = ({ job, open, onClose, onBookmark }) => {
  const handleApply = async (id) => {
    try {
      await api.post("applications/apply", { jobId: id });
      toast.success("Applied successfully");
    } catch (error) {
      console.error("Error applying to job:", error);
      toast.error(error.response?.data?.message || "Failed to apply.");
    }
  };

  if (!open || !job) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in ${
        !open && "animate-fade-out"
      }`}
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl h-auto max-h-[95vh] bg-zinc-900/20 backdrop-blur-md rounded-2xl shadow-2xl border border-fuchsia-700/40 flex flex-col">
        {/* Header */}
        <div className="relative bg-zinc-900/20 p-6 border-b border-fuchsia-700/20 flex-shrink-0 rounded-2xl">
          <div className="">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className=" font-bold text-2xl md:text-3xl mb-2 leading-tight">
                  {job.title}
                </h1>
                <div className="flex items-center gap-2 text-zinc-300 text-lg mb-2">
                  <FaBuilding className="text-teal-300" />
                  <span className="font-medium text-teal-300">
                    {job.companyName}
                  </span>
                </div>
              </div>
              <button
                className={`p-3 rounded-full border transition-all duration-300 ${
                  job.bookmarked
                    ? "border-fuchsia-400 shadow-md shadow-fuchsia-500/25"
                    : "bg-zinc-900 border-zinc-700/50 hover:border-fuchsia-500/50 "
                }`}
                onClick={() => onBookmark(job.id)}
                title={job.bookmarked ? "Remove Bookmark" : "Save Job"}
              >
                <FaBookmark
                  className={
                    job.bookmarked ? "text-purple-600" : "text-zinc-200 "
                  }
                  size={20}
                />
              </button>
            </div>

            {/* Quick Info Tags */}
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="flex items-center gap-2 hover:bg-fuchsia-900/10 text-fuchsia-200 px-3 py-2 rounded-lg border border-fuchsia-700/30 transition-colors duration-300">
                <FaBriefcase />
                {job.type || "Full-time"}
              </span>
              <span className="flex items-center gap-2 text-zinc-300 px-3 py-2 rounded-lg">
                <FaMapMarkerAlt className="text-purple-400" />
                {job.location || "Remote"}
              </span>
              <span className="flex items-center gap-2 bg-zinc-900/20 text-zinc-300 px-3 py-2 rounded-lg">
                <FaClock className="text-teal-400" />
                {new Date(job.createdAt).toLocaleDateString()}
              </span>
              {job.salary && (
                <span className="flex items-center gap-1 text-green-200 px-3 py-2">
                  {job.salary}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content - Made scrollable and takes remaining height */}
        <div className="flex-grow overflow-y-auto p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Job Description */}
              <div>
                <h2 className="text-lg font-semibold text-fuchsia-300 mb-3 flex items-center gap-2">
                  <FaBriefcase />
                  Job Description
                </h2>
                <div className="text-zinc-200 leading-relaxed whitespace-pre-line">
                  {job.description || "No description available."}
                </div>
              </div>
              {/* Skills */}
              {job.skills && job.skills.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-fuchsia-300 mb-3 flex items-center gap-2">
                    <FaCode />
                    Required Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-zinc-950/30 border border-fuchsia-500/30 hover:bg-purple-700/30 hover:border-purple-400 transition-colors duration-300 text-white px-3 py-1 rounded-xl text-sm shadow flex items-center gap-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Info */}
              <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-700/50 transition-all duration-300 hover:border-fuchsia-700/60">
                <h3 className="text-lg font-semibold text-fuchsia-400 mb-3 flex items-center gap-2">
                  <FaBuilding />
                  Company Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-zinc-400">Company:</span>
                    <div className="text-zinc-200 font-medium">
                      {job.companyName}
                    </div>
                  </div>

                  {job.companySize && (
                    <div>
                      <span className="text-zinc-400 flex items-center gap-1">
                        <FaUsers size={12} />
                        Company Size:
                      </span>
                      <div className="text-zinc-200">{job.companySize}</div>
                    </div>
                  )}

                  {job.companyLocation && (
                    <div>
                      <span className="text-zinc-400">Headquarters:</span>
                      <div className="text-zinc-200">{job.companyLocation}</div>
                    </div>
                  )}
                  {job.postedBy?.name && (
                    <div>
                      <span className="text-zinc-400">Posted By:</span>
                      <div className="text-zinc-200">{job.postedBy.name}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-fuchsia-900/20 p-6 bg-zinc-800/30 flex-shrink-0 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-semibold transition-all flex items-center justify-center gap-2 transition-all duration-300 ease-in-out shadow-md shadow-fuchsia-600/25 hover:shadow-lg hover:scale-[1.01] hover:bg-zinc-900/30"
              onClick={() => handleApply(job._id)}
            >
              <FaBriefcase />
              Apply Now
            </button>
            <button
              className="px-6 py-3 rounded-lg bg-zinc-900 text-white shadow-md shadow-fuchsia-600/25 border border-fuchsia-600 transform hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <p className="text-xs text-zinc-400 mt-3 text-center">
            By clicking "Apply Now", you agree to our Terms of Service and
            acknowledge that you have read our Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
