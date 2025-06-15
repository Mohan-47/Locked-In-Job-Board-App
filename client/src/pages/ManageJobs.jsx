import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import UserPanel from '../components/UserPanel'
import { Link, useParams } from 'react-router-dom'

const mockJob = {
    id: 1,
    title: "Frontend Developer",
    status: "Active",
    description: "Build and maintain UI components...",
    applicants: [
        {
            id: 1,
            name: "Lewis S. Cunningham",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            role: "iOS Developer",
            resume: "#",
            profile: "#"
        },
        {
            id: 2,
            name: "Kimberly Rutledge",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            role: "Junior UX Designer",
            resume: "#",
            profile: "#"
        }
    ]
}

const ManageJob = () => {
    // In real app, fetch job by ID from params
    // const { jobId } = useParams()
    const [job, setJob] = useState(mockJob)

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="flex">
                <UserPanel />
                <main className="flex-1 py-8 px-4">
                    <div className="max-w-4xl mx-auto bg-zinc-800/80 rounded-2xl shadow-xl border border-fuchsia-700/30 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-white">{job.title}</h2>
                            <div className="flex gap-2">
                                <Link to={`/recruiter/post-job?edit=${job.id}`} className="px-4 py-2 rounded-lg bg-cyan-700 text-white font-semibold hover:bg-cyan-800 transition text-sm">Edit</Link>
                                <button className="px-4 py-2 rounded-lg bg-red-700 text-white font-semibold hover:bg-red-800 transition text-sm">
                                    {job.status === "Active" ? "Close Job" : "Reopen Job"}
                                </button>
                            </div>
                        </div>
                        <div className="mb-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold
                ${job.status === "Active"
                                    ? "bg-green-900 text-green-300"
                                    : "bg-zinc-700 text-zinc-300"}
              `}>
                                {job.status}
                            </span>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-fuchsia-300 mb-2">Description</h3>
                            <p className="text-zinc-200">{job.description}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-fuchsia-300 mb-4">Applicants</h3>
                            <div className="space-y-4">
                                {job.applicants.length === 0 && (
                                    <div className="text-zinc-400">No applicants yet.</div>
                                )}
                                {job.applicants.map(applicant => (
                                    <div key={applicant.id} className="flex items-center justify-between bg-zinc-900/80 rounded-lg p-4 border border-zinc-700">
                                        <div className="flex items-center gap-3">
                                            <img src={applicant.avatar} alt={applicant.name} className="w-10 h-10 rounded-full object-cover" />
                                            <div>
                                                <div className="font-semibold text-white">{applicant.name}</div>
                                                <div className="text-xs text-zinc-400">{applicant.role}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <a href={applicant.resume} className="px-3 py-1 rounded bg-fuchsia-700 text-white text-xs hover:bg-fuchsia-800 transition" target="_blank" rel="noopener noreferrer">Resume</a>
                                            <Link to={`/candidate/${applicant.id}`} className="px-3 py-1 rounded bg-cyan-700 text-white text-xs hover:bg-cyan-800 transition">View Profile</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ManageJob