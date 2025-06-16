import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import UserPanel from '../components/UserPanel'
import { Link, useParams } from 'react-router-dom'
import api from '../api/axios.js'

const ManageJob = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        // Fetch job details
        api.get(`/jobs/${jobId}`).then(res => setJob(res.data));
        // Fetch applicants for this job
        api.get(`/applications/job/${jobId}`).then(res => setApplicants(res.data));
    }, [jobId]);

    if (!job) return <div>Loading...</div>;
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="flex">
                <UserPanel />
                <main className="flex-1  py-8 px-4">
                    <div className="w-full mx-auto bg-zinc-800/80 rounded-2xl shadow-xl border border-fuchsia-700/30 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-white">{job.title}</h2>
                            <div className="flex gap-2">
                                <Link to={`/recruiter/post-job?edit=${job._id}`} className="px-4 py-2 rounded-lg bg-cyan-700 text-white font-semibold hover:bg-cyan-800 transition text-sm">Edit</Link>
                                <button className="px-4 py-2 rounded-lg bg-red-700 text-white font-semibold hover:bg-red-800 transition text-sm">
                                    {job.status === "Open" ? "Close" : "Open"}
                                </button>
                            </div>
                        </div>
                        <div className="mb-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold
                ${job.status === "Open"
                                    ? "bg-green-900 text-green-300"
                                    : "bg-zinc-700 text-zinc-300"}
              `}>
                                {job.status}
                            </span>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-fuchsia-300 mb-2">Description</h3>
                            <p className="text-zinc-200 break-words whitespace-pre-wrap">{job.description}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-fuchsia-300 mb-4">Applicants</h3>
                            <div className="space-y-4">
                                {applicants.length === 0 && (
                                    <div className="text-zinc-400">No applicants yet.</div>
                                )}
                                {applicants.map(applicant => (
                                    <div key={applicant.id} className="flex items-center justify-between bg-zinc-900/80 rounded-lg p-4 border border-zinc-700">
                                        <div className="flex items-center gap-3">
                                            <img src={applicant.candidate.profilePicture} alt={applicant.candidate.name} className="w-10 h-10 rounded-full object-cover" />
                                            <div>
                                                <div className="font-semibold text-white">{applicant.candidate.name}</div>
                                                <div className="text-xs text-zinc-400">{applicant.candidate.role}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <a href={applicant.candidate.resume} className="px-3 py-1 rounded bg-fuchsia-700 text-white text-xs hover:bg-fuchsia-800 transition" target="_blank" rel="noopener noreferrer">Resume</a>
                                            <Link to={`/candidate/${applicant.candidate._id}`} className="px-3 py-1 rounded bg-cyan-700 text-white text-xs hover:bg-cyan-800 transition">View Profile</Link>
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