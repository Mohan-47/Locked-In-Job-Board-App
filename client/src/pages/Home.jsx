import React from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section className='relative flex flex-col md:flex-row items-center justify-between px-32 py-32 custom-spiral-bg'>
        <div className='max-w-2xl '>
          <h1 className='text-4xl md:text-6xl font-extrabold mb-4'>
            <span className='text-fuchsia-500'>Lock-In</span> Your Next Job
          </h1>
          <p className='text-gray-300 mb-8 text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat tempore, voluptatibus ipsa molestiae ipsum doloremque nostrum aspernatur cupiditate libero natus molestias et deleniti, fuga saepe. Quae similique hic molestias quas.</p>
          <Link to="/register" className='bg-fuchsia-700 text-white font-semibold px-6 py-2 rounded-lg hover:bg-fuchsia-800 transition-colors duration-300'>Lock-In Now</Link>
        </div>

        <div className="hidden xl:block absolute right-24 top-10 z-0 w-[400px] h-[500px] pointer-events-none">
          <div className="absolute left-26 top-0 w-48 h-14 bg-white/80 rounded-xl shadow flex items-center justify-center font-semibold text-gray-900 ">
            UI/UX Designer
          </div>
          <div className="absolute right-0 top-20 w-56 h-16 bg-white/80 rounded-xl shadow-lg flex items-center justify-center font-semibold text-gray-900 text-lg">
            Java Developer
          </div>
          <div className="absolute left-0 top-40 w-60 h-16 bg-white/80 rounded-xl shadow-lg flex items-center justify-center font-semibold text-gray-900 text-lg">
            Product Manager
          </div>
          <div className="absolute right-4 top-60 w-40 h-16 bg-white/80 rounded-xl shadow-lg flex items-center justify-center font-semibold text-gray-900 text-lg">
            Data Analyst
          </div>
        </div>
      </section>

      <section className="px-32 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured <span className="text-fuchsia-500">Jobs</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
          {/* Example job card */}
          <div className="bg-zinc-800 rounded-xl p-6 shadow-xl border border-zinc-500/60">
            <h3 className="text-xl font-semibold mb-2">UI/UX Designer</h3>
            <p className="text-gray-400 mb-2">Remote | $100K - $110K</p>
            <p className="text-gray-500 text-sm">Design amazing user experiences for our clients.</p>
          </div>
          <div className="bg-zinc-800 rounded-xl p-6 shadow-xl border border-zinc-500/60">
            <h3 className="text-xl font-semibold mb-2">Java Developer</h3>
            <p className="text-gray-400 mb-2">Onsite | $120K - $130K</p>
            <p className="text-gray-500 text-sm">Work on scalable backend systems in a dynamic team.</p>
          </div>
          <div className="bg-zinc-800 rounded-xl p-6 shadow-xl border border-zinc-500/60">
            <h3 className="text-xl font-semibold mb-2">Product Manager</h3>
            <p className="text-gray-400 mb-2">Hybrid | $110K - $120K</p>
            <p className="text-gray-500 text-sm">Lead product vision and strategy for our platform.</p>
          </div>
          <div className="bg-zinc-800 rounded-xl p-6 shadow-xl border border-zinc-500/60">
            <h3 className="text-xl font-semibold mb-2">Data Scientist</h3>
            <p className="text-gray-400 mb-2">Remote | $130K - $150K</p>
            <p className="text-gray-500 text-sm">Unlock insights and drive business decisions with data.</p>
          </div>
          <div className="bg-zinc-800 rounded-xl p-6 shadow-xl border border-zinc-500/60">
            <h3 className="text-xl font-semibold mb-2">Frontend Engineer</h3>
            <p className="text-gray-400 mb-2">Hybrid | $100K - $120K</p>
            <p className="text-gray-500 text-sm">Build fast and scalable user interfaces for our platform.</p>
          </div>
          <div className="bg-zinc-800 rounded-xl p-6 shadow-xl border border-zinc-500/60">
            <h3 className="text-xl font-semibold mb-2">DevOps Engineer</h3>
            <p className="text-gray-400 mb-2">Onsite | $110K - $130K</p>
            <p className="text-gray-500 text-sm">Optimize infrastructure and tooling for our engineering teams.</p>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Link to="/login" className="bg-fuchsia-700 text-white px-8 py-2 rounded-xl hover:bg-fuchsia-800 transition duration-300">
            See More
          </Link>
        </div>
      </section>

      <section className="px-32 py-8">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Our <span className="text-fuchsia-500">Partners</span>
        </h2>
        <div className="flex flex-wrap justify-between gap-8">
          {/* Replace src with your company logos */}
          <img src={assets.amazon_logo} alt="Company 1" className="h-10 invert" />
          <img src={assets.adobe_logo} alt="Company 2" className="h-10" />
          <img src={assets.microsoft_logo} alt="Company 3" className="h-10" />
          <img src={assets.walmart_logo} alt="Company 4" className="h-10" />
          <img src={assets.samsung_logo} alt="Company 5" className="h-10" />
        </div>
      </section>

      <section className="px-32 py-8">
        <h2 className="text-3xl font-bold mb-12 text-center">
          What People Say About <span className="text-fuchsia-500">LockedIn</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
          <div className="bg-zinc-800 rounded-xl p-6 shadow border border-zinc-500/60 flex flex-col">
            <p className="text-gray-300 flex-1 mb-4">
              "I was able to land my dream job in just a few weeks with LockedIn. The team was super responsive and helpful every step of the way. Highly recommend!"
            </p>
            <div className="flex items-center gap-3 mt-2">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Doe" className="w-10 h-10 rounded-full border border-fuchsia-400" />
              <div>
                <p className="text-fuchsia-400 font-semibold">John Doe</p>
                <p className="text-gray-500 text-xs">Software Engineer</p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-6 shadow border border-zinc-500/60 flex flex-col">
            <p className="text-gray-300 flex-1 mb-4">
              "LockedIn made my job search so much easier. I found several great opportunities and the application process was seamless."
            </p>
            <div className="flex items-center gap-3 mt-2">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Priya S." className="w-10 h-10 rounded-full border border-fuchsia-400" />
              <div>
                <p className="text-fuchsia-400 font-semibold">Priya S.</p>
                <p className="text-gray-500 text-xs">UI/UX Designer</p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-800 rounded-xl p-6 shadow border border-zinc-500/60 flex flex-col">
            <p className="text-gray-300 flex-1 mb-4">
              "Great platform for both companies and candidates. We hired two amazing engineers through LockedIn!"
            </p>
            <div className="flex items-center gap-3 mt-2">
              <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Alex R." className="w-10 h-10 rounded-full border border-fuchsia-400" />
              <div>
                <p className="text-fuchsia-400 font-semibold">Alex R.</p>
                <p className="text-gray-500 text-xs">HR Manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  )
}

export default Home