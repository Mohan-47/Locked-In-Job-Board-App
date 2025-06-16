import React from 'react'
import { FaBriefcase } from "react-icons/fa";

const RecentApplications = ({ recentApplications }) => {
    return (
        <div className="bg-zinc-800/80 rounded-2xl shadow-2xl border border-fuchsia-700/30 p-8 backdrop-blur-md h-full flex flex-col transition-all duration-300 hover:border-fuchsia-400/40">
            <h2 className="text-2xl font-bold text-white mb-6">
                Recent Applications
            </h2>
            <div className="flex-1 overflow-y-auto pr-2">
                <ul className="space-y-4">
                    {recentApplications.map((app) => (
                        <li
                            key={app._id}
                            className="flex items-center gap-4 bg-zinc-900/80 rounded-lg p-4 border border-zinc-700 text-zinc-200"
                        >
                            <div className="text-2xl">
                                <FaBriefcase />
                            </div>
                            <div className="flex-col flex-1">
                                <div className="font-semibold">{app.job?.title}</div>
                                <div className="text-xs text-zinc-400">
                                    {app.job?.companyName} • {app.job?.type} •{" "}
                                    {app.job?.location}
                                </div>
                                <div className="text-xs text-zinc-500">
                                    {new Date(app.appliedAt).toLocaleDateString()}
                                </div>
                            </div>
                            <span
                                className={`px-3 py-1 rounded-md text-xs font-semibold 
                            ${app.status === "Interview"
                                        ? "bg-cyan-900 text-cyan-300"
                                        : app.status === "Rejected"
                                            ? "bg-red-900 text-red-300"
                                            : app.status === "Shortlisted"
                                                ? "bg-green-900 text-green-300"
                                                : app.status === "In Review"
                                                    ? "bg-yellow-900 text-yellow-300"
                                                    : "bg-zinc-700 text-zinc-300"
                                    }
                                      `}
                            >
                                {app.status}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default RecentApplications