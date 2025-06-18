import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import UserPanel from "../components/UserPanel";
import {
  FaSearch,
  FaBookmark,
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import JobModal from "../components/JobModal";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const ApplyJob = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");
        const openJobs = response.data.filter((job) => job.status === "Open");
        const j = openJobs.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setJobs(j);
        // setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to load jobs.");
      }
    };
    fetchJobs();
  }, []);

  const handleApply = async (id) => {
    try {
      await api.post("applications/apply", { jobId: id });
      toast.success("Applied successfully");
    } catch (error) {
      console.error("Error applying to job:", error);
      toast.error(error.response?.data?.message || "Failed to apply.");
    }
  };

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
  };

  const handleBookmark = (id) => {
    setJobs((jobs) =>
      jobs.map((job) =>
        job._id === id ? { ...job, bookmarked: !job.bookmarked } : job
      )
    );
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title?.toLowerCase().includes(search.toLowerCase()) &&
      job.location?.toLowerCase().includes(location.toLowerCase()) &&
      (type ? job.type === type : true)
  );

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <Navbar />
      <div className="flex lg:flex-row">
        <UserPanel />
        <main className="flex-1 py-10 px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div
              className="bg-zinc-900/20 rounded-xl p-6 shadow-md border border-zinc-700/50 shadow-purple-600/25
                        transition-all duration-300 ease-in-out hover:border-purple-500/50 hover:shadow-lg mb-8 flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="flex-1 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search job title or company..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none placeholder-zinc-500 transition-all duration-300"
                  />
                </div>
                <div className="relative flex-1">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Location (e.g. Remote, USA, Berlin)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none placeholder-zinc-500 transition-all duration-300"
                  />
                </div>
              </div>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full md:w-auto px-3 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none appearance-none cursor-pointer pr-8 transition-all duration-300"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-Time</option>
                <option value="Part-time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="mb-4 flex flex-col sm:flex-row justify-between sm:items-center">
              <h2 className="text-2xl font-bold text-zinc-200 mb-2 sm:mb-0">
                Available Jobs
              </h2>
              <span className="text-zinc-400 text-base">
                {filteredJobs.length} jobs found
              </span>
            </div>

            <div className="space-y-6">
              {filteredJobs.length === 0 && (
                <div className="text-center text-zinc-400 py-10 text-lg">
                  No jobs found matching your criteria.
                </div>
              )}
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-zinc-900 rounded-xl p-6 flex flex-col lg:flex-row lg:gap-8 items-start lg:items-center shadow-md border border-zinc-700/50 text-zinc-200
                             transition-all duration-300 ease-in-out hover:border-fuchsia-500/50 hover:scale-[1.01] group cursor-pointer"
                  onClick={() => handleOpenModal(job)}
                >
                  <div className="flex-1 min-w-0 mb-4 lg:mb-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-2 text-sm mb-2">
                      <span className="text-zinc-100 font-bold text-xl leading-tight">
                        {job.title}
                      </span>
                      {job.companyName && (
                        <span className="text-zinc-400 ml-0 sm:ml-4">
                          {job.companyName}
                        </span>
                      )}
                      {job.type && (
                        <span
                          className="text-xs sm:bg-gray-950/30 text-fuchsia-100 sm:px-2 sm:ml-2 py-1 rounded sm:border sm:border-fuchsia-500/30 font-medium whitespace-nowrap
                                          transition-colors duration-300 group-hover:bg-fuchsia-700/30 group-hover:border-fuchsia-400"
                        >
                          {job.type}
                        </span>
                      )}
                      {job.location && (
                        <span className="text-xs text-zinc-400 ml-0 sm:ml-4 flex items-center gap-1">
                          <FaMapMarkerAlt className="text-fuchsia-400" />
                          {job.location}
                        </span>
                      )}
                      {job.createdAt && (
                        <span className="text-xs text-zinc-400 ml-0 sm:ml-4 flex items-center gap-1">
                          <FaClock className="text-fuchsia-400" />
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className="text-zinc-300 mt-2 line-clamp-1 text-base">
                      {job.description}
                    </div>
                  </div>
                  <div className="flex flex-row lg:flex-col gap-3 lg:gap-4 w-full lg:w-auto justify-end sm:justify-start lg:justify-center items-center">
                    <button
                      className={`p-3 rounded-full border transition-all duration-300 ${
                        job.bookmarked
                          ? "border-fuchsia-400 shadow-md shadow-fuchsia-500/25"
                          : "bg-zinc-900 border-zinc-700/50 hover:border-fuchsia-500/50 "
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmark(job._id);
                      }}
                      title={job.bookmarked ? "Remove Bookmark" : "Save Job"}
                    >
                      <FaBookmark
                        className={
                          job.bookmarked ? "text-purple-600" : "text-zinc-200 "
                        }
                        size={24}
                      />
                    </button>
                    <button
                      className="flex-1 px-6 py-3 rounded-xl border border-purple-600/50 text-white font-semibold transition-all duration-300 ease-in-out text-base whitespace-nowrap shadow-md hover:shadow-fuchsia-500/25"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApply(job._id);
                      }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <JobModal
        job={selectedJob}
        open={modalOpen}
        onClose={handleCloseModal}
        onBookmark={handleBookmark}
      />
    </div>
  );
};

export default ApplyJob;
