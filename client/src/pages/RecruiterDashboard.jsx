import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import UserPanel from '../components/UserPanel'
import { FaBriefcase, FaCheckCircle, FaUsers, FaEye, FaBell, FaEnvelope } from "react-icons/fa"
import { Link } from 'react-router-dom'


// Mock data
const mockJobs = [
  { id: 1, title: "Frontend Developer", status: "Active", applicants: 12, views: 120, posted: "2 days ago" },
  { id: 2, title: "Backend Engineer", status: "Closed", applicants: 8, views: 80, posted: "1 week ago" },
  { id: 3, title: "UI/UX Designer", status: "Active", applicants: 5, views: 60, posted: "3 days ago" },
  { id: 4, title: "DevOps Specialist", status: "Active", applicants: 7, views: 90, posted: "5 days ago" },
]

const mockInterviews = [
  { id: 1, candidate: "Jane Doe", job: "Frontend Developer", date: "June 15, 2025", time: "10:00 AM" },
  { id: 2, candidate: "John Smith", job: "UI/UX Designer", date: "June 16, 2025", time: "2:00 PM" },
  { id: 3, candidate: "Alice Lee", job: "DevOps Specialist", date: "June 17, 2025", time: "11:00 AM" },
]

const mockAnalytics = [
  { label: "Total Jobs", value: mockJobs.length, icon: <FaBriefcase className="text-2xl text-fuchsia-400" /> },
  { label: "Active Jobs", value: mockJobs.filter(j => j.status === "Active").length, icon: <FaCheckCircle className="text-2xl text-green-400" /> },
  { label: "Shortlisted", value: mockJobs.reduce((a, b) => a + b.applicants, 0), icon: <FaUsers className="text-2xl text-cyan-400" /> },
  { label: "Total Applicants", value: mockJobs.reduce((a, b) => a + b.views, 0), icon: <FaUsers className="text-2xl text-red-400" /> },
]
const mockNotifications = [
  { id: 1, message: "New applicant for Frontend Developer", time: "1 hour ago" },
  { id: 2, message: "Interview scheduled with Alice Lee", time: "3 hours ago" },
  { id: 3, message: "Job post approved: DevOps Specialist", time: "Yesterday" },
]

const mockApplicants = [
  {
    id: 1,
    name: "Lewis S. Cunningham",
    role: "iOS Developer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Danny Nelson",
    role: "Node.js Developer",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    id: 3,
    name: "Jennifer Patterson",
    role: "Marketing Manager",
    avatar: null, // fallback to initials
  },
  {
    id: 4,
    name: "Timothy Watson",
    role: "iOS Developer",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    id: 5,
    name: "Kimberly Rutledge",
    role: "Junior UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
]

const RecruiterDashboard = () => {
  const [jobs] = useState(mockJobs)
  const [interviews] = useState(mockInterviews)
  const [notifications] = useState(mockNotifications)

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
                  <h2 className="text-5xl font-semibold text-white mb-4">Welcome Sarah<span className='text-fuchsia-400'>!</span></h2>
                  <p className="text-zinc-400 mb-4">Quick stats on your job posts and interviews.</p>
                </div>
                {mockAnalytics.map((stat, idx) => (
                  <div key={idx} className="bg-zinc-800/80 rounded-xl p-5 shadow-xl border border-zinc-700 flex flex-col justify-center">
                    <div className='flex gap-2'>
                      <span>{stat.icon}</span>
                      <span className="text-zinc-300 self-start">{stat.label}</span>
                    </div>
                    <span className="text-5xl font-bold text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
              {/* Interviews card, full height of stats grid */}
              <div className="bg-zinc-800/60 rounded-xl p-6 shadow-xl border border-zinc-700 flex flex-col h-full ">
                <h2 className="text-xl font-semibold text-white mb-4">Upcoming Interviews</h2>
                <div className="space-y-4 flex-1">
                  {interviews.length === 0 && (
                    <div className="text-zinc-400 text-center">No interviews scheduled.</div>
                  )}
                  {interviews.map(interview => (
                    <div key={interview.id} className="bg-zinc-900/80 rounded-lg p-4 border border-zinc-700 text-zinc-200 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-fuchsia-300">{interview.candidate}</div>
                        <div className="text-zinc-400 text-sm">{interview.job}</div>
                        <div className="text-xs text-zinc-400">{interview.date} • {interview.time}</div>
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
                {mockApplicants.map(applicant => (
                  <div key={applicant.id} className="flex items-center justify-between bg-zinc-900/80 rounded-lg p-3 border border-zinc-700">
                    <div className="flex items-center gap-3">
                      {applicant.avatar ? (
                        <img src={applicant.avatar} alt={applicant.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-fuchsia-700 flex items-center justify-center text-white font-bold">
                          {applicant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-white">{applicant.name}</div>
                        <div className="text-xs text-zinc-400">Applied for {applicant.role}</div>
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
                              ${job.status === "Active"
                                ? "bg-green-900 text-green-300"
                                : "bg-zinc-700 text-zinc-300"}
                            `}>
                              {job.status}
                            </span>
                          </td>
                          <td className="py-2 px-4">{job.applicants}</td>
                          <td className="py-2 px-4">{job.posted}</td>
                          <td className="py-2 px-4 flex gap-2">
                            <Link to={`/recruiter/job/${job.id}/manage`} className="px-3 py-1 rounded bg-cyan-600 text-white text-xs hover:bg-cyan-700 transition duration-300">View</Link>
                            <Link to={`/recruiter/post-job?edit=${job.id}`} className="px-3 py-1 rounded bg-zinc-600 text-white text-xs hover:bg-zinc-700 transition duration-300">Edit</Link>
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
                  {notifications.length === 0 && (
                    <div className="text-zinc-400 text-center">No notifications.</div>
                  )}
                  {notifications.map(note => (
                    <div key={note.id} className="bg-zinc-900/80 rounded-lg p-4 border border-zinc-700 text-zinc-200">
                      <div>{note.message}</div>
                      <div className="text-xs text-zinc-400 mt-1">{note.time}</div>
                    </div>
                  ))}
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