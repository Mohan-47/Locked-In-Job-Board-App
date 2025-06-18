import React from "react";
import { FaBriefcase } from "react-icons/fa";

const RecentApplications = ({ recentApplications }) => {
  return (
    <div
      className="bg-zinc-900/20 rounded-xl shadow-md border border-zinc-700/50 p-5 h-full mb-2
                        transition-all duration-300 ease-in-out shadow-purple-600/25 hover:shadow-lg hover:border-fuchsia-500/50 overflow-y-auto custom-scrollbar"
    >
      <h2 className="text-xl font-semibold text-zinc-200 mb-6">
        Recent Applications
      </h2>
      <ul className="space-y-6 ">
        {recentApplications.map((app) => (
          <li
            key={app._id}
            className=" bg-gradient-to-r from-fuchsia-600/10 to-purple-600/10 flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-lg p-4 border border-zinc-700/50 text-zinc-200
                                transition-all duration-300 ease-in-out hover:border-fuchsia-500/50 hover:scale-[1.04] group shadow-md"
          >
            <div className="text-2xl flex-shrink-0">
              <FaBriefcase className="text-fuchsia-400 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
            </div>
            <div className="flex-col flex-1">
              <div className="font-semibold line-clamp-1">
                {app.job?.title || <em>Job No Longer Exists</em>}
              </div>
              <div className="text-xs text-zinc-400 line-clamp-1">
                {app.job?.companyName} • {app.job?.type} • {app.job?.location}
              </div>
              <div className="text-xs text-zinc-500">
                {new Date(app.appliedAt).toLocaleDateString()}
              </div>
            </div>
            <span
              // Status tag styling directly copied from Saved Jobs 'days' tag,
              // with dynamic colors for status.
              className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap flex-shrink-0
                                    ${
                                      app.status === "Interview"
                                        ? "bg-cyan-900/30 text-cyan-100 border border-cyan-500/30" // Matched subtle background/border
                                        : app.status === "Rejected"
                                        ? "bg-red-900/30 text-red-100 border border-red-500/30"
                                        : app.status === "Shortlisted"
                                        ? "bg-green-900/30 text-green-100 border border-green-500/30"
                                        : app.status === "In Review"
                                        ? "bg-yellow-900/30 text-yellow-100 border border-yellow-500/30"
                                        : "bg-zinc-700/30 text-zinc-300 border border-zinc-600/30"
                                    }
                                    transition-all duration-300 ease-in-out group-hover:bg-zinc-900/30 group-hover:border-fuchsia-400
                                `}
            >
              {app.status}
            </span>
          </li>
        ))}
        {recentApplications.length === 0 && (
          <li className="text-zinc-400 text-center py-4">
            No recent applications found.
          </li>
        )}
      </ul>
    </div>
  );
};

export default RecentApplications;
