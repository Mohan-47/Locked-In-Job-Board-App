import React, { useState } from "react";
import toast from "react-hot-toast";
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
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const getRole = () => {
  return localStorage.getItem("role") || "Candidate"; // Default to 'user' if no role is set
};

const UserPanel = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const role = getRole();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully!");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // User side active checks
  const isUserDashboard = location.pathname === "/user/dashboard";
  const isUserApplications = location.pathname === "/user/profile";
  const isUserMessages = location.pathname === "/messages";
  const isUserJobSearch = location.pathname === "/user/apply-job";

  // Recruiter side active checks
  const isRecruiterDashboard = location.pathname === "/recruiter/dashboard";
  const isRecruiterJobsPosted = location.pathname === "/recruiter/profile";
  const isRecruiterMessages = location.pathname === "/messages";
  const isRecruiterPostJob = location.pathname === "/recruiter/post-job";

  const NavigationLinks = ({ mobile = false, onLinkClick = () => {} }) => (
    <>
      <nav className={`flex ${mobile ? "flex-col" : "flex-col"} gap-2 mb-8`}>
        {role === "Candidate" ? (
          <>
            <Link
              to="/user/dashboard"
              onClick={onLinkClick}
              className={`group flex items-center gap-3 py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                isUserDashboard
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/25"
                  : "hover:bg-zinc-800/50 hover:text-fuchsia-400"
              }`}
            >
              <FaHome
                className={`transition-transform duration-300 ${
                  isUserDashboard ? "rotate-12" : "group-hover:rotate-12"
                }`}
              />
              Dashboard
              {isUserDashboard && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </Link>
            <Link
              to="/user/profile"
              onClick={onLinkClick}
              className={`group flex items-center gap-3 py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                isUserApplications
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/25"
                  : "hover:bg-zinc-800/50 hover:text-fuchsia-400"
              }`}
            >
              <FaBriefcase
                className={`transition-transform duration-300 ${
                  isUserApplications ? "rotate-12" : "group-hover:rotate-12"
                }`}
              />
              Applications
              {isUserApplications && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </Link>
            <Link
              onClick={onLinkClick}
              className={`group flex items-center gap-3 py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                isUserMessages
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/25"
                  : "hover:bg-zinc-800/50 hover:text-fuchsia-400"
              }`}
            >
              <FaCommentDots
                className={`transition-transform duration-300 ${
                  isUserMessages ? "rotate-12" : "group-hover:rotate-12"
                }`}
              />
              Messages
              {isUserMessages && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </Link>
            <Link
              to="/user/apply-job"
              onClick={onLinkClick}
              className={`group flex items-center gap-3 py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                isUserJobSearch
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/25"
                  : "hover:bg-zinc-800/50 hover:text-fuchsia-400"
              }`}
            >
              <FaSearch
                className={`transition-transform duration-300 ${
                  isUserJobSearch ? "rotate-12" : "group-hover:rotate-12"
                }`}
              />
              Job Search
              {isUserJobSearch && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/recruiter/dashboard"
              onClick={onLinkClick}
              className={`group flex items-center gap-3 py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                isRecruiterDashboard
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/25"
                  : "hover:bg-zinc-800/50 hover:text-fuchsia-400"
              }`}
            >
              <FaHome
                className={`transition-transform duration-300 ${
                  isRecruiterDashboard ? "rotate-12" : "group-hover:rotate-12"
                }`}
              />
              Dashboard
              {isRecruiterDashboard && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </Link>
            <Link
              to="/recruiter/profile"
              onClick={onLinkClick}
              className={`group flex items-center gap-3 py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                isRecruiterJobsPosted
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/25"
                  : "hover:bg-zinc-800/50 hover:text-fuchsia-400"
              }`}
            >
              <FaBriefcase
                className={`transition-transform duration-300 ${
                  isRecruiterJobsPosted ? "rotate-12" : "group-hover:rotate-12"
                }`}
              />
              Jobs Posted
              {isRecruiterJobsPosted && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </Link>
            <Link
              to=""
              onClick={onLinkClick}
              className={`group flex items-center gap-3 py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                isRecruiterMessages
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/25"
                  : "hover:bg-zinc-800/50 hover:text-fuchsia-400"
              }`}
            >
              <FaCommentDots
                className={`transition-transform duration-300 ${
                  isRecruiterMessages ? "rotate-12" : "group-hover:rotate-12"
                }`}
              />
              Messages
              {isRecruiterMessages && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </Link>
            <Link
              to="/recruiter/post-job"
              onClick={onLinkClick}
              className={`group flex items-center gap-3 py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                isRecruiterPostJob
                  ? "bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/25"
                  : "hover:bg-zinc-800/50 hover:text-fuchsia-400"
              }`}
            >
              <FaSearch
                className={`transition-transform duration-300 ${
                  isRecruiterPostJob ? "rotate-12" : "group-hover:rotate-12"
                }`}
              />
              Post Job
              {isRecruiterPostJob && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </Link>
          </>
        )}
      </nav>

      <div
        className={`flex flex-col gap-2 mt-auto pt-6 border-t border-zinc-700/50`}
      >
        <Link
          to="/login"
          onClick={(e) => {
            handleLogout(e);
          }}
          className="group flex items-center gap-3 py-3 px-4 rounded-xl font-medium hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 transform hover:scale-105"
        >
          <FaSignOutAlt className="transition-transform duration-300 group-hover:translate-x-1" />
          Logout
        </Link>
        <Link
          to={role === "Candidate" ? "/user/profile" : "/recruiter/profile"}
          onClick={onLinkClick}
          className="group flex items-center gap-3 py-3 px-4 rounded-xl font-medium hover:bg-zinc-800/50 hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
        >
          <FaCog className="transition-transform duration-300 group-hover:rotate-90" />
          Settings
        </Link>
        <Link
          to={role === "Candidate" ? "/user/profile" : "/recruiter/profile"}
          onClick={onLinkClick}
          className="group flex items-center gap-3 py-3 px-4 rounded-xl font-medium hover:bg-zinc-800/50 hover:text-green-400 transition-all duration-300 transform hover:scale-105"
        >
          <FaQuestionCircle className="transition-transform duration-300 group-hover:bounce" />
          Help
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="py-6 hidden lg:flex flex-col backdrop-blur-xl bg-zinc-900/20 border-r border-zinc-700/30 px-6 rounded-2xl shadow-2xl sticky top-20 overflow-y-auto h-[calc(100vh-80px)] w-72 transition-all duration-300">
        <div className="mb-6 pb-4 border-b border-zinc-700/30">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-fuchsia-600/10 to-purple-600/10 border border-fuchsia-500/20">
            <FaUserCircle className="text-2xl text-fuchsia-400" />
            <div>
              <p className="font-semibold text-sm">{role}</p>
              <p className="text-xs text-zinc-400">Welcome back!</p>
            </div>
          </div>
        </div>
        <NavigationLinks />
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed left-4 z-50 p-3 bg-zinc-800/80 backdrop-blur-lg border border-zinc-700/50 rounded-xl shadow-lg transition-all duration-300 hover:bg-zinc-700/80 hover:scale-110"
      >
        {isMobileMenuOpen ? (
          <FaTimes className="text-xl text-fuchsia-400" />
        ) : (
          <FaBars className="text-xl text-fuchsia-400" />
        )}
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-700/30 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 pt-20">
          <div className="mb-6 pb-4 border-b border-zinc-700/30">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-fuchsia-600/10 to-purple-600/10 border border-fuchsia-500/20">
              <FaUserCircle className="text-2xl text-fuchsia-400" />
              <div>
                <p className="font-semibold text-sm">{role}</p>
                <p className="text-xs text-zinc-400">Welcome back!</p>
              </div>
            </div>
          </div>
          <NavigationLinks mobile={true} onLinkClick={closeMobileMenu} />
        </div>
      </aside>
    </>
  );
};

export default UserPanel;
