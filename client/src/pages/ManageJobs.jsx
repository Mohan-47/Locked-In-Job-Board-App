import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import UserPanel from "../components/UserPanel";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios.js";
import ApplicantProfileModal from "../components/ProfileModal.jsx";
import { toast } from "react-hot-toast";
import { FaCode } from "react-icons/fa";
const ManageJob = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    // Fetch job details
    api.get(`/jobs/${jobId}`).then((res) => setJob(res.data));
    // Fetch applicants for this job
    api.get(`/applications/job/${jobId}`).then((res) => {
      const j = res.data.sort(
        (a, b) => new Date(b.appliedAt) - new Date(a.appliedAt)
      );
      setApplicants(j);
    });
  }, [jobId]);

  const openProfileModal = (applicantCandidateData) => {
    setSelectedApplicant(applicantCandidateData);
    setIsProfileModalOpen(true);
  };

  // Function to close the profile modal
  const closeProfileModal = () => {
    setSelectedApplicant(null);
    setIsProfileModalOpen(false);
  };
  const handleCloseJob = async () => {
    try {
      if (!job) return; // Guard clause if job is not loaded yet

      // Get current status and determine new status
      const newStatus = job.status === "Open" ? "Closed" : "Open";

      // Update the job status on backend
      await api.put(`/jobs/${jobId}`, { status: newStatus });
      toast.success("Job status updated successfully!");

      // Update the local state - job is an object, not an array
      setJob((prevJob) => ({
        ...prevJob,
        status: newStatus,
      }));

      console.log(`Job ${jobId} status updated to ${newStatus}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update job status."
      );
      console.error("Error updating job status:", error);
    }
  };

  const handleStatusChange = async (appId, status) => {
    try {
      await api.put(`/applications/${appId}/status`, { status: status });
      toast.success("Application status updated successfully!");
      setApplicants((prevApplicants) =>
        prevApplicants.map((app) =>
          app._id === appId ? { ...app, status: status } : app
        )
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update application status."
      );
      console.error("Error updating application status:", error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this job? This action cannot be undone."
      )
    ) {
      return;
    }

    const loadingToast = toast.loading("Deleting job..."); // Show a loading toast

    try {
      await api.delete(`/jobs/${jobId}`); // Assuming an API endpoint for deleting a job
      toast.success("Job deleted successfully!", { id: loadingToast }); // Update to success
      window.location.href = "/recruiter/dashboard";
    } catch (err) {
      console.error("Error deleting job:", err);
      toast.error(err.response?.data?.message || "Failed to delete job.", {
        id: loadingToast,
      }); // Update to error
    }
  };

  if (!job)
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-950 text-zinc-100 flex items-center justify-center">
        Loading job details...
      </div>
    );
  return (
    <div className="min-h-screen text-zinc-100">
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        {" "}
        <UserPanel />
        <main className="flex-1 py-8 px-4 lg:px-8">
          {" "}
          <div className="max-w-7xl mx-auto bg-zinc-900/20 rounded-2xl shadow-xl border border-fuchsia-700/30 p-6 sm:p-8 lg:p-10">
            {" "}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              {" "}
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4 sm:mb-0">
                {job.title}
              </h2>{" "}
              <div className="flex flex-col sm:flex-row gap-3">
                {" "}
                <Link
                  to={`/recruiter/post-job?edit=${job._id}`}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600/10 to-purple-600/10 text-white border border-fuchsia-600/30 hover:shadow-fuchsia-600/25 hover:shadow-lg transition-all duration-300 ease-in text-sm shadow-purple-600/25 hover:border-purple-600 shadow-md transform hover:scale-105"
                >
                  Edit
                </Link>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    job.status === "Open"
                      ? "bg-orange-700 hover:bg-orange-800/10 border border-orange-700 hover:border-orange-600/50 shadow-orange-700/50 shadow-md"
                      : "bg-green-700 hover:bg-green-800/10 border border-green-700 hover:border-green-600/50 shadow-md shadow-green-700/50 "
                  } text-white font-semibold transition-all duration-300 ease-in text-sm text-center transform hover:scale-105`}
                  onClick={handleCloseJob}
                >
                  {job.status === "Open" ? "Close" : "Reopen"}
                </button>
                <button
                  onClick={() => handleDeleteJob(job._id)}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600/10 to-red-600/10 text-white border border-red-600/30 hover:shadow-red-600/25 hover:shadow-xl transition-all duration-300 ease-in text-sm shadow-red-600/25 hover:border-red-600 shadow-md transform hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mb-6">
              <span
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold ${
                  job.status === "Open"
                    ? "bg-green-800 text-green-300"
                    : "bg-zinc-700 text-zinc-300"
                }`}
              >
                {job.status}
              </span>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-fuchsia-300 mb-3">
                Description
              </h3>
              <p className="text-zinc-200 break-words whitespace-pre-wrap leading-relaxed">
                {job.description}
              </p>
            </div>
            {job.skills && job.skills.length > 0 && (
              <div className="mb-8">
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
            <div>
              <h3 className="text-xl font-semibold text-fuchsia-300 mb-5">
                Applicants ({applicants.length})
              </h3>
              <div className="space-y-4">
                {applicants.length === 0 && (
                  <div className="text-zinc-400 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
                    No applicants yet for this job.
                  </div>
                )}
                {applicants.map((applicant) => (
                  <div
                    key={applicant._id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-zinc-800/20 rounded-lg p-4 border border-fuchsia-700/20 hover:shadow-purple-600/25 hover:shadow-md transition-all duration-300 ease-in shadow-md"
                  >
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                      <img
                        src={applicant.candidate.profilePicture}
                        alt={applicant.candidate.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-fuchsia-400"
                      />
                      <div>
                        <div className="font-semibold text-zinc-100 text-lg">
                          {applicant.candidate.name}
                        </div>
                        <div className="text-sm text-zinc-400">
                          {applicant.candidate.role}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={applicant.candidate.resume}
                        className="px-4 py-2 rounded-lg border border-purple-600 text-white text-sm font-medium hover:shadow-purple-600/25 hover:shadow-lg hover:scale-95 transition-all duration-300 ease-in text-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                      <button
                        onClick={() => openProfileModal(applicant.candidate)}
                        className="px-4 py-2 rounded-lg border border-teal-600 text-white text-sm font-medium hover:shadow-teal-600/25 hover:shadow-lg hover:scale-95 transition-all duration-300 ease-in text-center"
                      >
                        View Profile
                      </button>
                      <select
                        name="status"
                        id={`status-${applicant._id}`}
                        value={applicant.status}
                        onChange={(e) =>
                          handleStatusChange(applicant._id, e.target.value)
                        }
                        className="px-4 py-2 rounded-lg bg-zinc-950 text-zinc-200 border border-zinc-800 focus:outline-none focus:border-fuchsia-900 text-sm appearance-none cursor-pointer"
                      >
                        <option value="Applied">Applied</option>
                        <option value="In Review">In Review</option>
                        <option value="Interview">Interview</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <ApplicantProfileModal
        applicant={selectedApplicant}
        onClose={closeProfileModal}
      />
    </div>
  );
};

export default ManageJob;
