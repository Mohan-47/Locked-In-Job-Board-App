import React from 'react'
import { FaUserCircle, FaBriefcase, FaEnvelope, FaSignOutAlt, FaHome, FaSearch, FaCommentDots, FaCog, FaQuestionCircle, FaBookmark } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';

const getRole = () => {
    // Example: return localStorage.getItem('role') || 'user';
    // For demo, you can hardcode 'user' or 'recruiter'
    return localStorage.getItem('role') || 'Candidate'; // Default to 'user' if no role is set
};


const UserPanel = () => {
    const location = useLocation();
    const role = getRole();
    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        }
    };
    // User side active checks
    const isUserDashboard = location.pathname === '/user/dashboard';
    const isUserApplications = location.pathname === '/user/profile';
    const isUserMessages = location.pathname === '/messages';
    const isUserJobSearch = location.pathname === '/user/apply-job';

    // Recruiter side active checks
    const isRecruiterDashboard = location.pathname === '/recruiter/dashboard';
    const isRecruiterJobsPosted = location.pathname === '/recruiter/profile';
    const isRecruiterMessages = location.pathname === '/messages';
    const isRecruiterPostJob = location.pathname === '/recruiter/post-job';
    return (
        <div>
            <aside className='py-6 hidden md:flex flex-col backdrop-blur-lg border-r  border-zinc-500/30 px-6 rounded-xl shadow-xl sticky top-20 overflow-y-auto h-[calc(100vh-80px)] w-64'>
                <nav className='flex flex-col gap-4 mb-10'>
                    {role === 'Candidate' ? (
                        <>
                            <Link to="/user/dashboard" className={`flex items-center gap-3 py-2 px-3 rounded-lg ${isUserDashboard ? "border-b border-fuchsia-600 " : ""} font-semibold hover:bg-zinc-800 transition-colors duration-300`}><FaHome /> Dashboard </Link>
                            <Link to="/user/profile" className={`flex items-center gap-3 py-2 px-3 rounded-lg ${isUserApplications ? "border-b border-fuchsia-600 " : ""} font-semibold hover:bg-zinc-800 transition-colors duration-300`}><FaBriefcase /> Applications </Link>
                            <Link to="/messages" className={`flex items-center gap-3 py-2 px-3 rounded-lg ${isUserMessages ? "border-b border-fuchsia-600 " : ""} font-semibold hover:bg-zinc-800 transition-colors duration-300`}><FaCommentDots /> Messages </Link>
                            <Link to="/user/apply-job" className={`flex items-center gap-3 py-2 px-3 rounded-lg ${isUserJobSearch ? "border-b border-fuchsia-600 " : "hover:bg-zinc-800"} font-semibold transition-colors duration-300`}><FaSearch /> Job Search </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/recruiter/dashboard" className={`flex items-center gap-3 py-2 px-3 rounded-lg ${isRecruiterDashboard ? "border-b border-fuchsia-600 " : ""} font-semibold hover:bg-zinc-800 transition-colors duration-300`}><FaHome /> Dashboard </Link>
                            <Link to="/recruiter/profile" className={`flex items-center gap-3 py-2 px-3 rounded-lg ${isRecruiterJobsPosted ? "border-b border-fuchsia-600 " : ""} font-semibold hover:bg-zinc-800 transition-colors duration-300`}><FaBriefcase /> Jobs Posted </Link>
                            <Link to="/messages" className={`flex items-center gap-3 py-2 px-3 rounded-lg ${isRecruiterMessages ? "border-b border-fuchsia-600 " : ""} font-semibold hover:bg-zinc-800 transition-colors duration-300`}><FaCommentDots /> Messages </Link>
                            <Link to="/recruiter/post-job" className={`flex items-center gap-3 py-2 px-3 rounded-lg ${isRecruiterPostJob ? "border-b border-fuchsia-600 " : "hover:bg-zinc-800"} font-semibold transition-colors duration-300`}><FaSearch /> Post Job </Link>
                        </>
                    )}
                </nav>
                <div className='flex flex-col gap-2 mt-auto '>
                    <Link to="/login" onClick={handleLogout} className='flex items-center gap-3 py-2 px-3 rounded-lg font-semibold hover:bg-zinc-800 transition-colors duration-300'><FaSignOutAlt /> Logout</Link>
                    <Link to={role === 'Candidate' ? "/user/profile" : "/recruiter/profile"} className='flex items-center gap-3 py-2 px-3 rounded-lg font-semibold hover:bg-zinc-800 transition-colors duration-300'><FaCog /> Settings</Link>
                    <Link to={role === 'Candidate' ? "/user/profile" : "/recruiter/profile"} className='flex items-center gap-3 py-2 px-3 rounded-lg font-semibold hover:bg-zinc-800 transition-colors duration-300'><FaQuestionCircle /> Help</Link>
                </div>
            </aside>
        </div>
    )
}

export default UserPanel