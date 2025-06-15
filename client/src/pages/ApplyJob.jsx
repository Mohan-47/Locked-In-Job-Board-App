import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import UserPanel from '../components/UserPanel'
import { FaSearch, FaBookmark, FaBriefcase, FaMapMarkerAlt, FaClock } from "react-icons/fa"
import JobModal from '../components/JobModal'

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "USA (Remote)",
    type: "Full-Time",
    posted: "2 days ago",
    description: "Work on scalable web apps using React and TypeScript.",
    bookmarked: false,
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Spotify",
    location: "Berlin, Germany",
    type: "Contract",
    posted: "1 day ago",
    description: "Design beautiful user experiences for millions of users.",
    bookmarked: true,
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "Amazon",
    location: "India (Remote)",
    type: "Full-Time",
    posted: "5 hours ago",
    description: "Build robust APIs and microservices in Node.js.",
    bookmarked: false,
  },
  {
    id: 4,
    title: "DevOps Specialist",
    company: "Netflix",
    location: "USA",
    type: "Part-Time",
    posted: "3 days ago",
    description: "Automate deployments and manage cloud infrastructure.",
    bookmarked: false,
  },
  // ...add more jobs as needed
]

const ApplyJob = () => {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [jobs, setJobs] = useState(mockJobs)
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
  };

  const handleBookmark = (id) => {
    setJobs(jobs =>
      jobs.map(job =>
        job.id === id ? { ...job, bookmarked: !job.bookmarked } : job
      )
    )
  }

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) &&
    job.location.toLowerCase().includes(location.toLowerCase()) &&
    (type ? job.type === type : true)
  )

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <UserPanel />
        <main className="flex-1 py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-zinc-800/80 rounded-2xl shadow-xl border border-fuchsia-700/30 p-6 mb-8 flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3 top-3 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search job title or company..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                  />
                </div>
                <div className="relative flex-1">
                  <FaMapMarkerAlt className="absolute left-3 top-3 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Location (e.g. Remote, USA, Berlin)"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                  />
                </div>
                <select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  className="w-full md:w-40 px-3 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                >
                  <option value="">All Types</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Available Jobs</h2>
              <span className="text-zinc-400 text-sm">{filteredJobs.length} jobs found</span>
            </div>

            <div className="space-y-6">
              {filteredJobs.length === 0 && (
                <div className="text-center text-zinc-400 py-10">
                  No jobs found matching your criteria.
                </div>
              )}
              {filteredJobs.map(job => (
                <div
                  key={job.id}
                  className="bg-zinc-900/80 border border-zinc-700 rounded-xl p-6 flex flex-col md:flex-row gap-4 items-start md:items-center shadow group hover:border-fuchsia-700 transition cursor-pointer"
                  onClick={() => handleOpenModal(job)}
                >
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <span className="text-fuchsia-400 font-bold text-lg">{job.title}</span>
                      <span className="text-zinc-400 text-sm md:ml-4">{job.company}</span>
                      <span className="text-xs bg-zinc-800 text-fuchsia-200 px-2 py-1 rounded ml-0 md:ml-4">{job.type}</span>
                      <span className="text-xs text-zinc-400 ml-0 md:ml-4 flex items-center gap-1"><FaMapMarkerAlt />{job.location}</span>
                      <span className="text-xs text-zinc-400 ml-0 md:ml-4 flex items-center gap-1"><FaClock />{job.posted}</span>
                    </div>
                    <div className="text-zinc-300 mt-2">{job.description}</div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <button
                      className={`p-2 rounded-full border ${job.bookmarked ? "bg-fuchsia-700/80 border-fuchsia-400" : "bg-zinc-800 border-zinc-700"} hover:bg-fuchsia-800 transition`}
                      onClick={() => handleBookmark(job.id)}
                      title={job.bookmarked ? "Remove Bookmark" : "Save Job"}
                    >
                      <FaBookmark className={job.bookmarked ? "text-fuchsia-300" : "text-zinc-400"} size={22} />
                    </button>
                    <button
                      className="px-5 py-2 rounded-lg bg-fuchsia-700 text-white font-semibold hover:bg-fuchsia-800 transition text-sm"
                    // onClick={() => ...} // You can add navigation to job details or apply page here
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
  )
}

export default ApplyJob