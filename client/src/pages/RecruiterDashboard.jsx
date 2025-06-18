import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import UserPanel from "../components/UserPanel";
import {
  FaBriefcase,
  FaCheckCircle,
  FaUsers,
  FaEye,
  FaBell,
  FaEnvelope,
  FaUserPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch jobs posted by recruiter
    const fetchData = async () => {
      await api.get("/jobs/myposted").then((res) => setJobs(res.data));

      // Fetch all applications received for recruiter's jobs
      await api
        .get("/applications/applicationreceived")
        .then((res) => setApplications(res.data));

      setIsLoading(false);
    };
    fetchData();
  }, []);

  const totalJobs = jobs.length;
  const totalApplications = applications.length;
  const shortlisted = applications.filter(
    (app) => app.status === "Shortlisted"
  ).length;
  const interviewed = applications.filter((app) => app.status === "Interview");
  const recentApplications = applications.slice(0, 5);
  // console.log(recentApplications);
  const js = jobs
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);
  // console.log(js);
  const handleCloseJob = async (jobId) => {
    try {
      // Find the current job to get its current status
      const currentJob = jobs.find((job) => job._id === jobId);
      const newStatus = currentJob.status === "Open" ? "Closed" : "Open";

      // Update the job status
      await api.put(`/jobs/${jobId}`, { status: newStatus });
      toast.success("Job status updated successfully!");
      // Update the local state to reflect the change
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, status: newStatus } : job
        )
      );

      console.log(`Job ${jobId} status updated to ${newStatus}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status.");
      console.error("Error updating job status:", error);
    }
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <UserPanel />
        <main className="flex-1 py-5 px-4 md:px-6 ">
          <div className="mx-auto flex flex-col gap-6">
            {/* Top Row: Stats (2x2) and Interviews (1x2) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 2x2 grid of stat cards */}
              <div className="grid grid-cols-2 grid-rows-3 gap-4">
                <div className="flex flex-col col-span-2 p-2">
                  <h2 className="text-5xl font-extrabold text-white mb-4">
                    Welcome<span className="text-fuchsia-400">!</span>
                  </h2>
                  <p className="text-zinc-400 mb-2 text-lg">
                    Quick stats on your job posts and applications.
                  </p>
                </div>
                <div
                  className="bg-zinc-900 rounded-xl p-6 flex flex-col justify-center shadow-md border border-zinc-700/50 text-center
                        transition-all duration-300 ease-in-out shadow-fuchsia-500/25 hover:scale-105 hover:shadow-md hover:shadow-fuchsia-500/50 group hover:border-fuchsia-400"
                >
                  <div className="flex gap-2 items-center justify-center mb-2">
                    <span>
                      <FaBriefcase className="text-fuchsia-400 text-lg" />
                    </span>
                    <span className="text-zinc-300 text-sm">Jobs Posted</span>
                  </div>
                  <span className="text-5xl font-bold text-white">
                    {totalJobs}
                  </span>
                </div>
                <div
                  className="bg-zinc-900 rounded-xl p-6 flex flex-col justify-center shadow-md border border-zinc-700/50 text-center
                        transition-all duration-300 ease-in-out shadow-purple-500/25 hover:scale-105 hover:shadow-md hover:shadow-purple-500/50 group hover:border-purple-400"
                >
                  <div className="flex items-center gap-2 justify-center mb-2">
                    <span>
                      <FaCheckCircle className="text-green-400 text-lg" />
                    </span>
                    <span className="text-zinc-300 text-sm">Active Jobs</span>
                  </div>
                  <span className="text-5xl font-bold text-white">
                    {jobs.filter((job) => job.status === "Open").length}
                  </span>
                </div>
                <div
                  className="bg-zinc-900 rounded-xl p-6 flex flex-col justify-center shadow-md border border-zinc-700/50 text-center
                        transition-all duration-300 ease-in-out shadow-teal-500/25 hover:scale-105 hover:shadow-md hover:shadow-teal-500/50 group hover:border-teal-400"
                >
                  <div className="flex items-center gap-2 justify-center mb-2">
                    <span>
                      <FaUsers className="text-cyan-400 text-lg " />
                    </span>
                    <span className="text-zinc-300 text-sm">Shortlisted</span>
                  </div>
                  <span className="text-5xl font-bold text-white">
                    {shortlisted}
                  </span>
                </div>
                <div
                  className="bg-zinc-900 rounded-xl p-6 flex flex-col justify-center shadow-md border border-zinc-700/50 text-center
                        transition-all duration-300 ease-in-out shadow-blue-500/25 hover:scale-105 hover:shadow-md hover:shadow-purple-500/50 group hover:border-teal-400"
                >
                  <div className="flex items-center gap-2 justify-center mb-2">
                    <span>
                      <FaUsers className="text-red-400 text-lg" />
                    </span>
                    <span className="text-zinc-300 text-sm">
                      Total Applicants
                    </span>
                  </div>
                  <span className="text-5xl font-bold text-white">
                    {totalApplications}
                  </span>
                </div>
              </div>
              {/* Interviews card, full height of stats grid */}
              <div
                className="bg-gradient-to-r from-fuchsia-600/10 to-purple-600/10 rounded-xl p-5 shadow-md border border-zinc-700/50 shadow-fuchsia-600/25
            hover:shadow-lg 
                        transition-all duration-300 ease-in-out hover:border-purple-500/50"
              >
                <h2 className="text-xl font-semibold text-zinc-200 mb-4">
                  Interviews
                </h2>
                <div className="space-y-4 flex-1">
                  {interviewed.length === 0 && (
                    <div className="text-zinc-400 text-center py-4">
                      No interviews scheduled.
                    </div>
                  )}
                  {interviewed.map((interview) => (
                    <div
                      key={interview.id}
                      className="bg-zinc-900 rounded-lg p-4 border border-zinc-700/50 text-zinc-200 flex items-center justify-between
                                transition-all duration-300 ease-in-out hover:border-fuchsia-500/50 hover:scale-[1.03] group shadow-md"
                    >
                      <div>
                        <div className="font-semibold text-fuchsia-300">
                          {interview.candidate.name}
                        </div>
                        <div className="text-zinc-400 text-sm">
                          {interview.job.title}
                        </div>
                        <div className="text-xs text-zinc-400">
                          Applied On:{" "}
                          {new Date(interview.appliedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <button
                        className="ml-4 p-2 rounded-full hover:bg-zinc-800 transition-all duration-300 ease-in-out"
                        title="Message"
                      >
                        <FaEnvelope className="text-teal-300" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="bg-gradient-to-r from-teal-600/10 to-blue-600/10 rounded-xl p-6 shadow-md border border-zinc-700/50 shadow-teal-600/25
                        transition-all duration-300 ease-in-out hover:border-blue-500/50 hover:shadow-lg flex flex-col"
              >
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-zinc-200 flex items-center gap-2">
                    <FaUserPlus className="text-yellow-400" />
                    New Applicants
                  </h2>
                  <Link
                    to="/recruiter/dashboard"
                    className="text-fuchsia-300 text-sm hover:underline"
                  >
                    See all
                  </Link>
                </div>
                {recentApplications.map((applicant) => (
                  <div
                    key={applicant.id}
                    className="flex items-center justify-between bg-zinc-900 rounded-lg p-4 border border-zinc-700/50 text-zinc-200
                                    transition-all duration-300 ease-in-out hover:border-fuchsia-500/50  group shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      {applicant.candidate.profilePicture ? (
                        <img
                          src={applicant.candidate.profilePicture}
                          alt={applicant.candidate.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-fuchsia-700 flex items-center justify-center text-white font-bold">
                          {applicant.candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-white">
                          {applicant.candidate.name}
                        </div>
                        <div className="text-xs text-zinc-400">
                          Applied for {applicant.job.title}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/recruiter/job/${applicant.job._id}/manage`}
                        className="p-2 rounded-full hover:bg-zinc-800 transition"
                        title="View Profile"
                      >
                        <FaEye className="text-cyan-400" />
                      </Link>
                      <Link
                        to=""
                        className="p-2 rounded-full hover:bg-zinc-800 transition"
                        title="Message"
                      >
                        <FaEnvelope className="text-fuchsia-400" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Main Section: Job Posts Table and Active Jobs */}
            <div className="grid grid-cols-1 gap-6">
              {/* Job Posts Table */}
              <div className="lg:col-span-3 bg-zinc-900 rounded-xl p-8 shadow-xl border border-zinc-700">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Your Job Posts
                  </h2>
                  <Link
                    to="/recruiter/post-job"
                    className="bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-xl px-4 py-2 shadow-lg border border-zinc-700/50 shadow-blue-600/25
            hover:shadow-lg hover:scale-[1.05]
                        transition-all duration-300 ease-in-out hover:border-purple-500/50"
                  >
                    + Post New Job
                  </Link>
                </div>
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="min-w-full text-left text-zinc-200">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="py-2 px-4">Title</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Applicants</th>
                        <th className="py-2 px-4">Posted</th>
                        <th className="py-2 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {js.map((job) => (
                        <tr
                          key={job.id}
                          className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors duration-300 ease-in-out"
                        >
                          <td className="py-3 px-4 font-semibold text-fuchsia-300">
                            {job.title}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-md text-xs font-semibold
                              ${
                                job.status === "Open"
                                  ? "bg-green-900/30 text-green-300"
                                  : "bg-zinc-700/30 text-zinc-300"
                              }
                            `}
                            >
                              {job.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">{job.applicants.length}</td>
                          <td className="py-3 px-4">
                            {new Date(job.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 flex gap-2 items-center mx-auto">
                            <Link
                              to={`/recruiter/job/${job._id}/manage`}
                              className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700/10 border border-cyan-700 hover:border-blue-600/50 transition-all duration-300 ease-in-out shadow-md shadow-blue-700/30 hover:scale-95"
                            >
                              View
                            </Link>
                            <Link
                              to={`/recruiter/post-job?edit=${job._id}`}
                              className="px-3 py-1 rounded-lg bg-zinc-700 text-white text-sm hover:bg-zinc-700/10 border border-zinc-700 hover:border-zinc-600/50 transition-all duration-300 ease-in-out shadow-md shadow-zinc-700/30 hover:scale-95"
                            >
                              Edit
                            </Link>
                            <button
                              className={`px-3 py-1 rounded-lg text-white text-sm transition-all duration-300 shadow-md hover:scale-95
                                ${
                                  job.status === "Open"
                                    ? "bg-red-700 hover:bg-red-800/10 border border-red-700 hover:border-red-600/50 shadow-red-700/30"
                                    : "bg-green-700 hover:bg-green-800/10 border border-green-700 hover:border-green-600/50 shadow-green-700/30 "
                                }`}
                              onClick={() => handleCloseJob(job._id)}
                            >
                              {job.status === "Open" ? "Close" : "Open"}
                            </button>
                          </td>
                        </tr>
                      ))}
                      {jobs.length === 0 && (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center py-4 text-zinc-400"
                          >
                            No jobs posted yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
