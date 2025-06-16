import React from "react";
import { FaTimes, FaBookmark, FaBriefcase, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import api from "../api/axios.js";

const JobModal = ({ job, open, onClose, onBookmark }) => {

    const handleApply = async (id) => {
        try {
            await api.post("applications/apply", { jobId: id });
            alert("Applied successfully");
        } catch (error) {
            console.error('Error applying to job:', error);
            alert(error.response?.data?.message || "Failed to apply.");
        }

    };
    if (!open || !job) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-lg bg-zinc-900 rounded-2xl shadow-2xl border border-fuchsia-700/40 p-8">
                <button
                    className="absolute top-4 right-4 text-zinc-400 hover:text-fuchsia-400 text-2xl"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-fuchsia-400 font-bold text-2xl">{job.title}</span>
                    <span className="text-zinc-400 text-lg">{job.company}</span>
                    <button
                        className={`ml-auto p-2 rounded-full border ${job.bookmarked ? "bg-fuchsia-700/80 border-fuchsia-400" : "bg-zinc-800 border-zinc-700"} hover:bg-fuchsia-800 transition`}
                        onClick={() => onBookmark(job.id)}
                        title={job.bookmarked ? "Remove Bookmark" : "Save Job"}
                    >
                        <FaBookmark className={job.bookmarked ? "text-fuchsia-300" : "text-zinc-400"} size={20} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-4 mb-2 text-xs">
                    <span className="flex items-center gap-1 bg-zinc-800 text-fuchsia-200 px-2 py-1 rounded"><FaBriefcase />{job.type}</span>
                    <span className="flex items-center gap-1 text-zinc-400"><FaMapMarkerAlt />{job.location}</span>
                    <span className="flex items-center gap-1 text-zinc-400"><FaClock />{job.posted}</span>
                </div>
                <div className="text-zinc-200 mt-4 mb-6">{job.description}</div>
                <button
                    className="w-full py-2 rounded-lg bg-fuchsia-700 text-white font-semibold hover:bg-fuchsia-800 transition"
                    onClick={() => handleApply(job.id)}
                >
                    Apply Now
                </button>
            </div>
        </div>
    );
};

export default JobModal;