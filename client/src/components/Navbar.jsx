import React from 'react'
import { assets } from '../assets/assets'
import { Link, useLocation } from 'react-router-dom'
import { FaBell, FaUserCircle } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom'


const Navbar = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const isProfile = location.pathname === '/user/profile';
    return (
        <div className='shadow py-4 border-b border-zinc-700/50 sticky top-0 z-10  backdrop-blur-xl'>
            <div className='container px-8 2x1:px-20 mx-auto flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <img src={assets.logo} alt="" className="invert" />
                    <span className='text-white font-semibold text-xl ml-2 tracking-wide'>Lockedin</span>

                    <div className='flex ml-6 gap-2 max-lg:hidden'>
                        <Link to="/" className='px-5 py-2 rounded-lg text-white font-semibold bg-zinc-800 hover:text-gray-400 transition-colors duration-300'>
                            Home
                        </Link>
                        <Link className='px-5 py-2 rounded-xl text-gray-400 font-semibold  hover:text-white transition-colors duration-300'>
                            Jobs
                        </Link>
                        <Link className='px-5 py-2 rounded-xl text-gray-400 font-semibold hover:text-white transition-colors duration-300'>
                            Companies
                        </Link>
                        <Link className='px-5 py-2 rounded-xl text-gray-400 font-semibold  hover:text-white ransition-colors duration-300'>
                            About
                        </Link>
                    </div>
                </div>

                <div className=''>
                    {isHome ? (
                        <div className='flex gap-4 items-center max-sm:text-xs'>
                            <Link to="/login" className='text-white font-semibold px-6 py-2 sm:px-9 rounded-lg border border-gray-400 hover:bg-zinc-800 hover:text-gray-200 transition-colors duration-500'>Candidate</Link>
                            <Link to="/login" className='bg-white font-semibold text-fuchsia-900 px-6 py-2 sm:px-9 rounded-lg border border-gray-200 hover:bg-zinc-800 hover:text-fuchsia-500 transition-colors duration-500'>Recruiter</Link>
                        </div>
                    ) : (
                        <div className='flex gap-4 items-center max-sm:text-xs'>
                            <FaBell className="text-fuchsia-400 text-xl cursor-pointer" />
                            <Link to="/user/profile" className={` ${isProfile ? "border-2 border-fuchsia-500 rounded-full" : ""}`}>
                                <FaUserCircle className=" text-3xl cursor-pointer" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar