import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSignInAlt } from "react-icons/fa";
import { assets } from '../assets/assets';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.role) {
      setError('Please fill in all fields.');
      return;
    }
    // Simulate successful login
    setSuccess('Login successful! Redirecting...');
    setTimeout(() => {
      if (form.role === 'candidate') {
        navigate('/user/dashboard');
      } else if (form.role === 'recruiter') {
        navigate('/recruiter/dashboard');
      }
    }, 1500);
    setForm({
      email: '',
      password: '',
      role: ''
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-fuchsia-900">
      <div className="flex w-full rounded-2xl overflow-hidden ">
        {/* Left: Logo and Name */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-10">
          <img src={assets.logo} alt="Logo" className="w-36 h-36 mb-6 drop-shadow-lg invert" />
          <h1 className="text-6xl font-extrabold text-white mb-2 tracking-wide">LockedIn</h1>
          <p className="text-fuchsia-100 text-lg text-center">Welcome back! Log in to continue your journey.</p>
        </div>
        {/* Right: Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center ">
          <div className=" bg-zinc-800/30 p-8 rounded-xl shadow-xl w-full max-w-md border border-zinc-700/30 animate-fade-in">
            <div className="flex justify-center mb-4">
              <FaSignInAlt className="text-white" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-center text-zinc-200 mb-6">Login to Your Account</h2>
            {error && <div className="mb-4 text-zinc-400 text-center">{error}</div>}
            {success && <div className="mb-4 text-zinc-400 text-center">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-300 mb-1" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-zinc-200 border border-zinc-500 focus:outline-none focus:border-fuchsia-400"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-zinc-200 border border-zinc-500 focus:outline-none focus:border-fuchsia-400"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1" htmlFor="role">Login as</label>
                <select
                  id="role"
                  name="role"
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-zinc-200 border border-zinc-500 focus:outline-none focus:border-fuchsia-400"
                  value={form.role || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="candidate">Candidate</option>
                  <option value="recruiter">Recruiter</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-fuchsia-700 hover:bg-fuchsia-800 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Login
              </button>
            </form>
            <p className="text-gray-400 text-sm text-center mt-6">
              Don't have an account? <a href="/register" className="text-fuchsia-400 hover:underline">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login