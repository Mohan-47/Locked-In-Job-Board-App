import React from 'react'
import { FaUserCircle, FaBriefcase, FaEnvelope, FaSignOutAlt, FaHome, FaSearch, FaCommentDots, FaCog, FaQuestionCircle, FaBookmark } from "react-icons/fa";
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import UserPanel from './../components/UserPanel';

const user = {
  name: "Jane Doe",
  email: "jane.doe@email.com",
  role: "Candidate",
  avatar: assets.logo, // Replace with user avatar if available
  applications: 37,
  interviews: 12,
  offers: 1,
  notifications: 3,
};


const recentApplications = [
  {
    title: "3D Artist - Performance Marketing",
    company: "Revolut",
    type: "Full-Time",
    location: "Poland",
    status: "In Review",
    icon: <FaBriefcase className="text-white" />,
    date: "Today"
  },
  {
    title: "Software Engineer (Front-End)",
    company: "Roumancy",
    type: "Full-Time",
    location: "Remote",
    status: "Declined",
    icon: <FaBriefcase className="text-white" />,
    date: "Dec 21, 2021"
  },
  {
    title: "Senior Digital Designer",
    company: "Digital Ocean",
    type: "Full-Time",
    location: "US & Canada",
    status: "Declined",
    icon: <FaBriefcase className="text-white" />,
    date: "Dec 21, 2021"
  }
];

const savedJobs = [
  {
    title: "Senior IT Operations Engineer",
    company: "DuckDuckGo",
    type: "Full-Time",
    location: "Worldwide",
    icon: <FaBookmark className="text-fuchsia-400" />,
    days: "2 day to apply"
  },
  {
    title: "Creative Director - Crypto",
    company: "CashApp",
    type: "Full-Time",
    location: "New York",
    icon: <FaBookmark className="text-fuchsia-400" />,
    days: "2 day to apply"
  },
  {
    title: "UX Research",
    company: "Fireart Studio",
    type: "Full-Time",
    location: "Poland",
    icon: <FaBookmark className="text-fuchsia-400" />,
    days: "2 day to apply"
  },
  {
    title: "Full Stack Developer",
    company: "Google",
    type: "Full-Time",
    location: "USA",
    icon: <FaBookmark className="text-fuchsia-400" />,
    days: "3 day to apply"
  }

];


const UserDashboard = () => {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='flex'>
        <UserPanel />
        <main className='flex-1 px-5 md:pd-12 pt-3'>
          {/* <h1 className='text-3xl font-bold mb-2'>Dashboard</h1>
          <p className='text-zinc-400 mb-4'>Take a look at your recent appplications.</p> */}

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className="bg-zinc-800/80 rounded-xl p-6 flex flex-col items-center shadow-xl border border-zinc-700">
              <FaBriefcase className="text-white b mb-2" size={32} />
              <span className="text-3xl font-bold text-white">{user.applications}</span>
              <span className="text-fuchsia-300 mt-1">Total Job Applied</span>
            </div>
            <div className="bg-zinc-800/80 rounded-xl p-6 flex flex-col items-center shadow border border-zinc-700">
              <FaEnvelope className="text-fuchsia-400 mb-2" size={32} />
              <span className="text-3xl font-bold text-white">{user.interviews}</span>
              <span className="text-fuchsia-300 mt-1">Interviewed</span>
            </div>
            <div className="bg-zinc-800/80 rounded-xl px-6 py-4 items-center shadow border border-zinc-700 w-full">
              <span className="text-white text-lg font-semibold">Upcoming Interview</span>
              <div className="flex items-center gap-3 mt-1 bg-zinc-900/80 rounded-lg p-2 border border-zinc-700 text-zinc-200">
                <img src={user.avatar} alt="Interviewer" className="w-10 h-10 rounded-full border-2 border-fuchsia-500 bg-white object-contain" />
                <div className='flex-1'>
                  <span className="text-white font-semibold block">Alexa Russell</span>
                  <span className="text-zinc-400 text-xs block">HR • DigitalOcean</span>
                </div>
                <span className="text-fuchsia-300 text-xs block">10:00 - 11:00, June 12, 2025</span>
              </div>
              <button className="mt-3 text-zinc-400 hover:underline text-sm">View Schedule</button>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-5'>
            <div className='bg-zinc-800/60 rounded-xl p-6 shadow border border-zinc-700'>
              <h2 className='text-xl font-semibold mb-2'>Recent Applications</h2>
              <ul className='space-y-4'>
                {recentApplications.map((app, index) => (
                  <li key={index} className='flex items-center gap-4 bg-zinc-900/80 rounded-lg p-4 border border-zinc-700 text-zinc-200'>
                    <div className="text-2xl">{app.icon}</div>
                    <div className="flex-col flex-1">
                      <div className="font-semibold">{app.title}</div>
                      <div className="text-xs text-zinc-400">{app.company} • {app.type} • {app.location}</div>
                      <div className="text-xs text-zinc-500">{app.date}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-md text-xs font-semibold ${app.status === "In Review" ? "bg-yellow-900 text-yellow-300" : "bg-red-900 text-red-300"}`}>
                      {app.status}
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/user/profile" className="pt-7 text-zinc-400 hover:underline text-sm">View All Applications History</Link>
            </div>
            <div className="bg-zinc-800/60 rounded-xl p-5 shadow border border-zinc-700">
              <h2 className="text-xl font-semibold text-zinc-200 mb-2">Saved Jobs</h2>
              <ul className="space-y-2">
                {savedJobs.map((job, idx) => (
                  <li key={idx} className="flex items-center gap-4 bg-zinc-900/80 rounded-lg p-4 border border-zinc-700 text-zinc-200">
                    <div className="text-2xl">{job.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold">{job.title}</div>
                      <div className="text-xs text-zinc-400">{job.company} • {job.type} • {job.location}</div>
                    </div>
                    <span className="px-3 py-1 rounded-md text-xs font-semibold bg-gray-950/30 text-fuchsia-100 border border-fuchsia-500/30">
                      {job.days}
                    </span>
                  </li>
                ))}
              </ul>
              <Link className="pt-3 text-gray-400 hover:underline text-sm">View Saved Jobs</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default UserDashboard