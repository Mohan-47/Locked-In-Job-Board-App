import React from "react";
import { assets } from "../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const getRole = () => {
  return localStorage.getItem("role");
};

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const role = getRole();
  const navigate = useNavigate();

  const handleRecruiterLogin = () => {
    if (role === "Recruiter") {
      navigate("/login");
    } else if (role === "Candidate") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
      toast.error("Please log in as a recruiter.");
    } else {
      navigate("/login");
    }
  };

  const handleCandidateLogin = () => {
    if (role === "Candidate") {
      navigate("/login");
    } else if (role === "Recruiter") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
      toast.error("Please log in as a candidate.");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="shadow py-4 border-b border-zinc-700/50 sticky top-0 z-10 bg-zinc-900/50 backdrop-blur-md">
      <div className="container px-8 2x1:px-20 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.logo} alt="" className="invert" />
          <span className="text-white font-semibold text-xl ml-2 tracking-wide">
            LockedIn
          </span>
        </Link>

        <div className="">
          {isHome ? (
            <div className="flex gap-4 items-center max-sm:text-xs">
              <button
                onClick={() => handleCandidateLogin()}
                className="text-white font-semibold px-6 py-2 sm:px-9 rounded-lg border border-zinc-400 hover:border-fuchsia-800 hover:scale-105 hover:text-fuchsia-400 transition-all duration-300 ease-in-out"
              >
                Candidate
              </button>
              <button
                onClick={() => handleRecruiterLogin()}
                className="px-6 py-2 sm:px-9 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/25 ease-in-out"
              >
                Recruiter
              </button>
            </div>
          ) : (
            <div className="flex gap-4 items-center max-sm:text-xs">
              <FaBell className="text-fuchsia-400 text-xl cursor-pointer" />
              <Link
                to={
                  role === "Candidate" ? "/user/profile" : "/recruiter/profile"
                }
                className="border-2 border-fuchsia-500 rounded-full"
              >
                <FaUserCircle className=" text-3xl cursor-pointer" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
