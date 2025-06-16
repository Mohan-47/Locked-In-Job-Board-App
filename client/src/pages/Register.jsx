import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from "react-icons/fa";
import { assets } from '../assets/assets';
import api from '../api/axios.js';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'candidate'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // Simulate successful registration
    try {
      await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }

    setForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'candidate',
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-fuchsia-900">
      <div className="flex w-full overflow-hidden">
        {/* Left: Logo and Name */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-10">
          <img src={assets.logo} alt="Logo" className="w-36 h-36 mb-6 drop-shadow-lg invert" />
          <h1 className="text-6xl font-extrabold text-white mb-2 tracking-wide">LockedIn</h1>
          <p className="text-fuchsia-100 text-lg text-center">Unlock your career opportunities with us!</p>
        </div>
        {/* Right: Register Form (your exact design) */}
        <div className="w-full md:w-1/2 flex items-center justify-center  ">
          <div className="bg-zinc-800/30 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md border border-zinc-800/30 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaUserPlus className="" size={48} />
              <h2 className="text-3xl font-bold text-center text-fuchsia-500">Create Your Account</h2>
            </div>
            {error && <div className="mb-4 text-zinc-400 text-center">{error}</div>}
            {success && <div className="mb-4 text-zinc-400 text-center">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-300 mb-1" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-zinc-200 border border-zinc-500 focus:outline-none focus:border-fuchsia-400"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
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
                <label className="block text-gray-300 mb-1" htmlFor="role">Register As</label>
                <select
                  id="role"
                  name="role"
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-zinc-200 border border-zinc-500 focus:outline-none focus:border-fuchsia-400"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="candidate">Candidate</option>
                  <option value="recruiter">Recruiter</option>
                </select>
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
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-zinc-200 border border-zinc-500 focus:outline-none focus:border-fuchsia-400"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-fuchsia-700 hover:bg-fuchsia-800 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Register
              </button>
            </form>
            <p className="text-gray-400 text-sm text-center mt-6">
              Already have an account? <a href="/login" className="text-fuchsia-400 hover:underline">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register