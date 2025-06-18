import React from 'react';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets'; // Assuming 'assets' contains your logo paths
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"; // Not used in this component, but kept for context
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans"> {/* Applied consistent dark background and base text color */}
      <Navbar />

      {/* Hero Section */}
      <section className='relative flex flex-col md:flex-row items-center justify-center md:justify-between px-4 sm:px-8 md:px-16 lg:px-32 py-16 md:py-32 overflow-hidden custom-spiral-bg'>
        <div className='max-w-xl md:max-w-2xl text-center md:text-left mb-8 md:mb-0'>
          <h1 className='text-4xl md:text-6xl font-extrabold mb-4 leading-tight animate-fade-in-up'>
            <span className='text-purple-400'>Lock-In</span> Your Next Job
          </h1>
          <p className='text-gray-300 mb-8 text-base md:text-lg text-justify animate-fade-in-up delay-100'>Unlock your career potential with our job search platform. Find your dream job and take your career to the next level.</p>
          <Link to="/register" className='inline-block py-2 px-5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/25'>Lock-In Now</Link>
        </div>

        <div className="absolute right-4 md:right-8 lg:right-24 top-1/2 -translate-y-1/2 hidden xl:block w-[300px] h-[400px] lg:w-[400px] lg:h-[500px] origin-center">

          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-40 h-12 lg:w-48 lg:h-14 bg-white/80 rounded-xl shadow flex items-center justify-center font-semibold text-zinc-900 text-sm lg:text-base hover:bg-white/10 hover:text-zinc-100 transform hover:scale-105 transition-all duration-300 ease-out pointer-events-auto">
            UI/UX Designer
          </div>
          <div className="absolute right-0 top-1/4 w-48 h-14 lg:w-56 lg:h-16 bg-white/80 rounded-xl shadow-lg flex items-center justify-center font-semibold text-zinc-900 text-base lg:text-lg hover:bg-white/5 hover:text-zinc-100 transform hover:scale-105 transition-all duration-300 ease-out pointer-events-auto">
            Java Developer
          </div>
          <div className="absolute left-0 top-1/2 w-52 h-14 lg:w-60 lg:h-16 bg-white/80 rounded-xl shadow-lg flex items-center justify-center font-semibold text-zinc-900 text-base lg:text-lg hover:bg-white/10 hover:text-zinc-100 transform hover:scale-105 transition-all duration-300 ease-out pointer-events-auto cursor">
            Product Manager
          </div>
          <div className="absolute right-4 top-3/4 w-36 h-14 lg:w-40 lg:h-16 bg-white/80 rounded-xl shadow-lg flex items-center justify-center font-semibold text-zinc-900 text-base lg:text-lg hover:bg-white/5 hover:text-zinc-100 transform hover:scale-105 transition-all duration-300 ease-out pointer-events-auto ">
            Data Analyst
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-8 md:px-16 lg:px-32 py-8 md:py-16 border-t border-zinc-700/50">
        <h2 className="text-3xl font-bold mb-8 text-center animate-fade-in">
          Featured <span className="text-fuchsia-400">Jobs</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-xl md:max-w-none mx-auto">
          {/* Example job card */}
          <div className="bg-zinc-900/50 rounded-xl p-6 shadow-lg border border-zinc-800 flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-fuchsia-500/25 hover:-translate-y-2 hover:border-purple-600 animate-fade-in delay-100">
            <h3 className="text-xl font-semibold mb-2">UI/UX Designer</h3>
            <p className="text-zinc-400 mb-2">Remote | $100K - $110K</p>
            <p className="text-zinc-500 text-sm">Design amazing user experiences for our clients.</p>
          </div>
          <div className="bg-zinc-900/50 rounded-xl p-6 shadow-lg border border-zinc-800 flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-fuchsia-500/25 hover:-translate-y-2 hover:border-purple-600 animate-fade-in delay-100">
            <h3 className="text-xl font-semibold mb-2">Java Developer</h3>
            <p className="text-zinc-400 mb-2">Onsite | $120K - $130K</p>
            <p className="text-zinc-500 text-sm">Work on scalable backend systems in a dynamic team.</p>
          </div>
          <div className="bg-zinc-900/50 rounded-xl p-6 shadow-lg border border-zinc-800 flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-fuchsia-500/25 hover:-translate-y-2 hover:border-purple-600 animate-fade-in delay-100">
            <h3 className="text-xl font-semibold mb-2">Product Manager</h3>
            <p className="text-zinc-400 mb-2">Hybrid | $110K - $120K</p>
            <p className="text-zinc-500 text-sm">Lead product vision and strategy for our platform.</p>
          </div>
          <div className="bg-zinc-900/50 rounded-xl p-6 shadow-lg border border-zinc-800 flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-fuchsia-500/25 hover:-translate-y-2 hover:border-purple-600 animate-fade-in delay-100">
            <h3 className="text-xl font-semibold mb-2">Data Scientist</h3>
            <p className="text-zinc-400 mb-2">Remote | $130K - $150K</p>
            <p className="text-zinc-500 text-sm">Unlock insights and drive business decisions with data.</p>
          </div>
          <div className="bg-zinc-900/50 rounded-xl p-6 shadow-lg border border-zinc-800 flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-fuchsia-500/25 hover:-translate-y-2 hover:border-purple-600 animate-fade-in delay-100">
            <h3 className="text-xl font-semibold mb-2">Frontend Engineer</h3>
            <p className="text-zinc-400 mb-2">Hybrid | $100K - $120K</p>
            <p className="text-zinc-500 text-sm">Build fast and scalable user interfaces for our platform.</p>
          </div>
          <div className="bg-zinc-900/50 rounded-xl p-6 shadow-lg border border-zinc-800 flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-fuchsia-500/25 hover:-translate-y-2 hover:border-purple-600 animate-fade-in delay-100">
            <h3 className="text-xl font-semibold mb-2">DevOps Engineer</h3>
            <p className="text-zinc-400 mb-2">Onsite | $110K - $130K</p>
            <p className="text-zinc-500 text-sm">Optimize infrastructure and tooling for our engineering teams.</p>
          </div>
        </div>
        <div className="flex justify-center mt-8 md:mt-12 animate-fade-in delay-900">
          <Link to="/login" className="inline-block bg-fuchsia-700 text-white px-5 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-gradient-to-br from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/25 ease-in-out">
            See More
          </Link>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-32 py-8 md:py-16 border-t border-b border-zinc-700/50">
        <h2 className="text-3xl font-bold mb-8 md:mb-12 text-center animate-fade-in">
          Our <span className="text-fuchsia-400">Partners</span>
        </h2>
        <div className="flex flex-wrap justify-center sm:justify-between items-center gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Ensure logos are visible on dark background and maybe apply filter for consistency */}
          <img src={assets.amazon_logo} alt="Amazon Logo" className="h-8 sm:h-10 max-w-[80px] sm:max-w-[unset] transition-transform duration-300 ease-out hover:scale-110 opacity-70 hover:opacity-100 invert-0 md:invert animate-fade-in delay-300" /> {/* Adjust invert/opacity for visibility */}
          <img src={assets.adobe_logo} alt="Adobe Logo" className="h-8 sm:h-10 max-w-[80px] sm:max-w-[unset] transition-transform duration-300 ease-out hover:scale-110 opacity-70 hover:opacity-100 animate-fade-in delay-400" />
          <img src={assets.microsoft_logo} alt="Microsoft Logo" className="h-8 sm:h-10 max-w-[80px] sm:max-w-[unset] transition-transform duration-300 ease-out hover:scale-110 opacity-70 hover:opacity-100 animate-fade-in delay-500" />
          <img src={assets.walmart_logo} alt="Walmart Logo" className="h-8 sm:h-10 max-w-[80px] sm:max-w-[unset] transition-transform duration-300 ease-out hover:scale-110 opacity-70 hover:opacity-100 animate-fade-in delay-600" />
          <img src={assets.samsung_logo} alt="Samsung Logo" className="h-8 sm:h-10 max-w-[80px] sm:max-w-[unset] transition-transform duration-300 ease-out hover:scale-110 opacity-70 hover:opacity-100 animate-fade-in delay-700" />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 sm:px-8 md:px-16 lg:px-32 py-8 md:py-16">
        <h2 className="text-3xl font-bold mb-8 md:mb-12 text-center animate-fade-in">
          What People Say About <span className="text-fuchsia-400">LockedIn</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-xl md:max-w-none mx-auto">
          <div className="bg-zinc-900/50 rounded-xl p-6 shadow-lg border border-zinc-800 flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-fuchsia-500/25 hover:-translate-y-2 hover:border-purple-600 animate-fade-in delay-100">
            <p className="text-zinc-300 flex-1 mb-4 text-base">
              "I was able to land my dream job in just a few weeks with LockedIn. The team was super responsive and helpful every step of the way. Highly recommend!"
            </p>
            <div className="flex items-center gap-3 mt-2">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Doe" className="w-10 h-10 rounded-full border-2 border-fuchsia-600 flex-shrink-0" /> {/* Stronger fuchsia border */}
              <div>
                <p className="text-fuchsia-400 font-semibold text-base">John Doe</p>
                <p className="text-zinc-400 text-xs">Software Engineer</p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900/50 rounded-xl p-6 shadow-lg border border-zinc-800 flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-fuchsia-500/25 hover:-translate-y-2 hover:border-purple-600 animate-fade-in delay-100">
            <p className="text-zinc-300 flex-1 mb-4 text-base">
              "LockedIn made my job search so much easier. I found several great opportunities and the application process was seamless."
            </p>
            <div className="flex items-center gap-3 mt-2">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Priya S." className="w-10 h-10 rounded-full border-2 border-fuchsia-600 flex-shrink-0" />
              <div>
                <p className="text-fuchsia-400 font-semibold text-base">Priya S.</p>
                <p className="text-zinc-400 text-xs">UI/UX Designer</p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900/50 rounded-xl p-6 shadow-lg border border-zinc-800 flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-fuchsia-500/25 hover:-translate-y-2 hover:border-purple-600 animate-fade-in delay-100">
            <p className="text-zinc-300 flex-1 mb-4 text-base">
              "Great platform for both companies and candidates. We hired two amazing engineers through LockedIn!"
            </p>
            <div className="flex items-center gap-3 mt-2">
              <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Alex R." className="w-10 h-10 rounded-full border-2 border-fuchsia-600 flex-shrink-0" />
              <div>
                <p className="text-fuchsia-400 font-semibold text-base">Alex R.</p>
                <p className="text-zinc-400 text-xs">HR Manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;