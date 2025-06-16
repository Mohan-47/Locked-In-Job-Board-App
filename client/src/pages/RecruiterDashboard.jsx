import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import UserPanel from '../components/UserPanel'
import { FaBriefcase, FaCheckCircle, FaUsers, FaEye, FaBell, FaEnvelope } from "react-icons/fa"
import { Link } from 'react-router-dom'
import api from '../api/axios.js'
import RecentApplications from '../components/RecentApplications.jsx'

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch jobs posted by recruiter
    api.get("/jobs/myposted").then(res => setJobs(res.data));

    // Fetch all applications received for recruiter's jobs
    api.get("/applications/applicationreceived").then(res => setApplications(res.data));
  }, []);

  const totalJobs = jobs.length;
  const totalApplications = applications.length;
  const shortlisted = applications.filter(app => app.status === "Shortlisted").length;
  const interviewed = applications.filter(app => app.status === "Interview");
  const notifications = []

  const recentApplications = applications.slice(0, 5);
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <UserPanel />
        <main className="flex-1 py-5 px-4">
          <div className="mx-auto flex flex-col gap-4">
            {/* Top Row: Stats (2x2) and Interviews (1x2) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* 2x2 grid of stat cards */}
              <div className="grid grid-cols-2 grid-rows-3 gap-4">
                <div className='flex flex-col col-span-2'>
                  <h2 className="text-5xl font-semibold text-white mb-4">Welcome<span className='text-fuchsia-400'>!</span></h2>
                  <p className="text-zinc-400 mb-4">Quick stats on your job posts and interviews.</p>
                </div>
                <div className="bg-zinc-800/80 rounded-xl p-5 shadow-xl border border-zinc-700 flex flex-col justify-center">
                  <div className='flex gap-2'>
                    <span><FaBriefcase className="text-fuchsia-400" /></span>
                    <span className="text-zinc-300 self-start">Total Jobs Posted</span>
                  </div>
                  <span className="text-5xl font-bold text-white">{totalJobs}</span>
                </div>
                <div className="bg-zinc-800/80 rounded-xl p-5 shadow-xl border border-zinc-700 flex flex-col justify-center">
                  <div className='flex gap-2'>
                    <span><FaCheckCircle className="text-green-400" /></span>
                    <span className="text-zinc-300 self-start">Active Jobs</span>
                  </div>
                  <span className="text-5xl font-bold text-white">{jobs.filter(job => job.status === "Open").length}</span>
                </div>
                <div className="bg-zinc-800/80 rounded-xl p-5 shadow-xl border border-zinc-700 flex flex-col justify-center">
                  <div className='flex gap-2'>
                    <span><FaUsers className="text-cyan-400" /></span>
                    <span className="text-zinc-300 self-start">Shortlisted</span>
                  </div>
                  <span className="text-5xl font-bold text-white">{shortlisted}</span>
                </div>
                <div className="bg-zinc-800/80 rounded-xl p-5 shadow-xl border border-zinc-700 flex flex-col justify-center">
                  <div className='flex gap-2'>
                    <span><FaUsers className="text-red-400" /></span>
                    <span className="text-zinc-300 self-start">Total Applicants</span>
                  </div>
                  <span className="text-5xl font-bold text-white">{totalApplications}</span>
                </div>

              </div>
              {/* Interviews card, full height of stats grid */}
              <div className="bg-zinc-800/60 rounded-xl p-6 shadow-xl border border-zinc-700 flex flex-col h-full ">
                <h2 className="text-xl font-semibold text-white mb-4">Upcoming Interviews</h2>
                <div className="space-y-4 flex-1">
                  {interviewed.length === 0 && (
                    <div className="text-zinc-400 text-center">No interviews scheduled.</div>
                  )}
                  {interviewed.map(interview => (
                    <div key={interview.id} className="bg-zinc-900/80 rounded-lg p-4 border border-zinc-700 text-zinc-200 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-fuchsia-300">{interview.candidate.name}</div>
                        <div className="text-zinc-400 text-sm">{interview.job.title}</div>
                        <div className="text-xs text-zinc-400">{new Date(interview.createdAt).toLocaleDateString()}</div>
                      </div>
                      <button className="ml-4 p-2 rounded-full bg-zinc-700 hover:bg-zinc-800 transition" title="Message">
                        <FaEnvelope className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4 border border-zinc-700 p-3 rounded-xl bg-zinc-800/60 shadow-xl">
                <div className="mb-2 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">New Applicants</h2>
                  <button className="text-fuchsia-400 text-sm hover:underline">see all</button>
                </div>
                {recentApplications.map(applicant => (
                  <div key={applicant.id} className="flex items-center justify-between bg-zinc-900/80 rounded-lg p-3 border border-zinc-700">
                    <div className="flex items-center gap-3">
                      {applicant.candidate.profilePicture ? (
                        <img src={applicant.candidate.profilePicture} alt={applicant.candidate.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-fuchsia-700 flex items-center justify-center text-white font-bold">
                          {applicant.candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-white">{applicant.candidate.name}</div>
                        <div className="text-xs text-zinc-400">Applied for {applicant.job.title}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-full bg-zinc-700 hover:bg-zinc-800 transition" title="View Profile">
                        <FaUsers className="text-cyan-400" />
                      </button>
                      <button className="p-2 rounded-full bg-zinc-700 hover:bg-zinc-800 transition" title="Message">
                        <FaEnvelope className="text-fuchsia-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Main Section: Job Posts Table and Active Jobs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Job Posts Table */}
              <div className="lg:col-span-2 bg-zinc-800/60 rounded-xl p-8 shadow-xl border border-zinc-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">Current Job Posts</h2>
                  <Link to="/recruiter/post-job" className="px-5 py-2 rounded-lg bg-fuchsia-700 text-white font-semibold hover:bg-fuchsia-800 transition text-sm">
                    + Post New Job
                  </Link>
                </div>
                <div className="overflow-x-auto">
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
                      {jobs.map(job => (
                        <tr key={job.id} className="border-b border-zinc-800 hover:bg-zinc-900/60 transition">
                          <td className="py-2 px-4 font-semibold text-fuchsia-300">{job.title}</td>
                          <td className="py-2 px-4">
                            <span className={`px-3 py-1 rounded-md text-xs font-semibold
                              ${job.status === "Open"
                                ? "bg-green-900 text-green-300"
                                : "bg-zinc-700 text-zinc-300"}
                            `}>
                              {job.status}
                            </span>
                          </td>
                          <td className="py-2 px-4">{job.applicants.length}</td>
                          <td className="py-2 px-4">{new Date(job.createdAt).toLocaleDateString()}</td>
                          <td className="py-2 px-4 flex gap-2">
                            <Link to={`/recruiter/job/${job._id}/manage`} className="px-3 py-1 rounded bg-cyan-600 text-white text-xs hover:bg-cyan-700 transition duration-300">View</Link>
                            <Link to={`/recruiter/post-job?edit=${job._id}`} className="px-3 py-1 rounded bg-zinc-600 text-white text-xs hover:bg-zinc-700 transition duration-300">Edit</Link>
                            <button className="px-3 py-1 rounded bg-red-700 text-zinc-200 text-xs hover:bg-red-800  transition duration-300">Close</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Active Jobs List */}
              <div className="bg-zinc-800/80 rounded-xl p-6 shadow-xl border border-zinc-700 flex flex-col">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <FaBell className="text-yellow-400" /> Notifications
                </h2>
                <div className="space-y-4 flex-1">
                  {notifications.length === 0 ? (
                    <div className="text-zinc-400 text-center">No notifications.</div>
                  ) :
                    (
                      notifications.map(note => (
                        <div key={note.id} className="bg-zinc-900/80 rounded-lg p-4 border border-zinc-700 text-zinc-200">
                          <div>{note.message}</div>
                          <div className="text-xs text-zinc-400 mt-1">{note.time}</div>
                        </div>
                      )))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default RecruiterDashboard