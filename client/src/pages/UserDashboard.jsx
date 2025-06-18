import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaBriefcase,
  FaEnvelope,
  FaSignOutAlt,
  FaHome,
  FaSearch,
  FaCommentDots,
  FaCog,
  FaQuestionCircle,
  FaBookmark,
  FaIntercom, // FaIntercom imported for upcoming interview icon
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import UserPanel from "./../components/UserPanel";
import RecentApplications from "./../components/RecentApplications";
import api from "../api/axios.js";

// const savedJobs = [
//   {
//     title: "Senior IT Operations Engineer",
//     company: "DuckDuckGo",
//     type: "Full-Time",
//     location: "Worldwide",
//     icon: <FaBookmark className="text-fuchsia-400" />,
//     days: "2 day to apply",
//   },
//   {
//     title: "Creative Director - Crypto",
//     company: "CashApp",
//     type: "Full-Time",
//     location: "New York",
//     icon: <FaBookmark className="text-fuchsia-400" />,
//     days: "2 day to apply",
//   },
//   {
//     title: "UX Research",
//     company: "Fireart Studio",
//     type: "Full-Time",
//     location: "Poland",
//     icon: <FaBookmark className="text-fuchsia-400" />,
//     days: "2 day to apply",
//   },
//   {
//     title: "Full Stack Developer",
//     company: "Google",
//     type: "Full-Time",
//     location: "USA",
//     icon: <FaBookmark className="text-fuchsia-400" />,
//     days: "3 day to apply",
//   },
// ];

const UserDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState({});
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user profile
    api.get("/users/profile").then((res) => setUser(res.data));

    // Fetch user's applications
    api
      .get("/applications/myapplications")
      .then((res) => setApplications(res.data));

    // Fetch saved jobs (if you have this endpoint)
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");
        const openJobs = response.data.filter((job) => job.status === "Open");
        setJobs(openJobs);
        // setJobs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
    // api.get("/jobs/saved").then(res => setSavedJobs(res.data)).catch(() => setSavedJobs([]));
  }, []);

  const totalApplied = applications.length;
  const interviewed = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const js = applications.sort(
    (a, b) => new Date(b.appliedAt) - new Date(a.appliedAt)
  );
  // setApplications(js);
  // console.log(js);
  const jobsForYou = jobs
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const recentApplications = js.slice(0, 3);
  // console.log(recentApplications);

  // Jobs in Interview
  const interviewJobs = applications.filter(
    (app) => app.status === "Interview"
  );
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex lg:flex-row">
        <UserPanel />
        <main className="flex-1 p-4 sm:p-6 lg:py-3 text-zinc-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Total Job Applied Card */}
            <div
              className="bg-zinc-900 rounded-xl p-6 flex flex-col items-center shadow-md border border-zinc-700/50 text-center
                        transition-all duration-300 ease-in-out shadow-fuchsia-500/25 hover:scale-105 hover:shadow-lg hover:shadow-fuchsia-500/50 group hover:border-fuchsia-400"
            >
              <FaBriefcase
                className="text-fuchsia-400 mb-2 transition-transform duration-300 group-hover:-translate-y-1"
                size={32}
              />
              <span className="text-3xl font-bold text-white group-hover:-translate-y-1 transition-all duration-300 ease-in-out">
                {totalApplied}
              </span>
              <span className="text-fuchsia-300 mt-1 transition-all duration-300 ease-in-out group-hover:text-fuchsia-200 group-hover:-translate-y-1">
                Total Job Applied
              </span>
            </div>

            {/* Interviewed Card */}
            <div
              className="bg-zinc-900 rounded-xl p-6 flex flex-col items-center shadow-md border border-zinc-700/50 text-center
                        transition-all duration-300 ease-in-out shadow-purple-500/25 hover:scale-105 hover:shadow-md hover:shadow-purple-500/50 group hover:border-purple-400"
            >
              <FaEnvelope
                className="text-purple-400 mb-2 transition-transform duration-300 group-hover:-translate-y-1"
                size={32}
              />
              <span className="text-3xl font-bold text-white group-hover:-translate-y-1 transition-all duration-300 ease-in-out">
                {interviewed}
              </span>
              <span className="text-purple-300 mt-1 transition-all duration-300 ease-in-out group-hover:text-purple-200 group-hover:-translate-y-1">
                Interviews
              </span>
            </div>

            {/* Upcoming Interview Card */}
            <div
              className="bg-zinc-900/20 rounded-xl px-6 py-4 flex flex-col shadow-teal-500/25 border shadow-md border-zinc-700/50 w-full
                        transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-teal-500/50"
            >
              <span className="text-teal-200 text-lg font-semibold mb-2">
                Upcoming Interview
              </span>
              {interviewJobs.length > 0 ? (
                <div
                  className="flex items-center gap-3 mt-1 bg-zinc-900/80 rounded-lg p-2 border border-zinc-700 text-zinc-200
                                transition-all duration-300 ease-in-out  hover:border-fuchsia-500/50 group"
                >
                  <FaIntercom
                    className="text-fuchsia-300 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    size={20}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-white font-semibold block truncate">
                      {interviewJobs[0].job?.title}
                    </span>
                    <span className="text-zinc-400 text-xs block truncate">
                      {interviewJobs[0].job?.companyName}
                    </span>
                  </div>
                  <Link
                    to="/messages" // Assuming messages link for interviews
                    className="hover:text-teal-200 block flex-shrink-0 transition-transform duration-300 hover:scale-125"
                    aria-label="Contact for interview"
                  >
                    <FaEnvelope />
                  </Link>
                </div>
              ) : (
                <div className="text-zinc-400 mt-2 text-center transition-colors duration-300">
                  No upcoming interviews
                </div>
              )}
              <button
                className="mt-3 text-zinc-400 hover:underline text-sm self-start
                                transition-colors duration-300 hover:text-teal-100"
              >
                View Schedule
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
            {/* Recent Applications Section (Link wrapper) */}
            <Link
              to="/user/profile"
              className="block
                         transition-all duration-300 ease-in-out hover:shadow-2xl"
              aria-label="View all recent applications"
            >
              <RecentApplications recentApplications={recentApplications} />
            </Link>

            {/* Saved Jobs Section */}
            <div
              className="bg-gradient-to-r from-fuchsia-600/10 to-purple-600/10 rounded-xl p-5 shadow-md border border-zinc-700/50 shadow-fuchsia-600/25
            hover:shadow-lg 
                        transition-all duration-300 ease-in-out hover:border-purple-500/50"
            >
              <h2 className="text-xl font-semibold text-zinc-200 mb-2">
                Jobs For You
              </h2>
              <ul className="space-y-2">
                {jobsForYou.map((job, idx) => (
                  <li
                    key={idx}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-zinc-900 rounded-lg p-4 border border-zinc-700/50 text-zinc-200 
                                transition-all duration-300 ease-in-out hover:border-fuchsia-500/50 hover:scale-[1.04] group shadow-md"
                  >
                    <div className="text-2xl flex-shrink-0">
                      <FaBookmark className="text-fuchsia-400 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{job.title}</div>
                      <div className="text-xs text-zinc-400 truncate">
                        {job.companyName} • {job.type} • {job.location}
                      </div>
                    </div>
                    <span
                      className="px-3 py-1 rounded-md text-xs font-semibold bg-gray-950/30 text-fuchsia-100 border border-fuchsia-500/30 whitespace-nowrap flex-shrink-0
                                    transition-colors duration-300 group-hover:bg-fuchsia-700/30 group-hover:border-fuchsia-400"
                    >
                      {job.applicants.length} Applicants
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                to="/user/apply-job" // Assuming a dedicated page for saved jobs
                className="pt-3 text-gray-400 hover:underline text-sm block text-right
                           transition-colors duration-300 hover:text-fuchsia-300"
              >
                View Jobs
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
