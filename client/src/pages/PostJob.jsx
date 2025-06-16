import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import UserPanel from '../components/UserPanel'
import { FaPlus, FaCheckCircle } from "react-icons/fa"
import api from '../api/axios.js'
import { useNavigate, useLocation } from 'react-router-dom'

const initialState = {
  title: '',
  location: '',
  type: '',
  salary: '',
  salaryType: '',
  description: '',
  skills: [],
  companyName: '',
  employees: '',
  companyLocation: '',
}

const jobTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
]


const PostJob = () => {
  const [form, setForm] = useState(initialState)
  const [skillInput, setSkillInput] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')


  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const editId = params.get("edit");


  useEffect(() => {
    if (editId) {
      api.get(`/jobs/${editId}`).then(res => {
        setForm({
          ...res.data,
          skills: res.data.skills || [],
        });
      });
    }
  }, [editId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const handleSkillAdd = () => {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      setForm(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }))
      setSkillInput('')
    }
  }

  const handleSkillRemove = skill => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      if (editId) {
        // Update job
        await api.put(`/jobs/${editId}`, form);
        setSuccess(true);
      } else {
        // Create job
        await api.post("/jobs", form);
        setSuccess(true);
        setForm(initialState);
      }
      navigate("/recruiter/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save job.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <UserPanel />
        <main className="flex-1 py-10 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Steps & Promo */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="bg-white/5 rounded-2xl p-6 shadow border border-fuchsia-100/10">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-zinc-200">Job info</span>
                    {/* <FaCheckCircle className="text-green-400" /> */}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-zinc-200">Company info</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2 opacity-60">
                    <span className="font-semibold text-zinc-200">{editId ? "Update Job" : "Post Job"}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Right: Job & Company Info */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div className="bg-white/5 rounded-2xl shadow-xl border border-fuchsia-700/20 p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-zinc-100">{editId ? "Update Job" : "Post a New Job"}</h2>
                  <button className="px-4 py-1 rounded-lg bg-zinc-100/20 text-fuchsia-600 font-semibold hover:bg-fuchsia-100/30 transition text-sm">
                    Preview
                  </button>
                </div>
                {error && <div className="mb-4 text-red-400">{error}</div>}
                {success && <div className="mb-4 text-green-400">Job posted successfully!</div>}
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Job Info */}
                  <div>
                    <div className="font-semibold text-zinc-200 mb-3 text-lg">Job Information</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-zinc-400 mb-1 font-medium">Job title <span className="text-fuchsia-400">*</span></label>
                        <input
                          type="text"
                          name="title"
                          value={form.title}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                          placeholder="e.g. Graphic Designer"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-1 font-medium">Employment Type <span className="text-fuchsia-400">*</span></label>
                        <select
                          name="type"
                          value={form.type}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                          required
                        >
                          <option value="">Select type</option>
                          {jobTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-1 font-medium">Job Location <span className="text-fuchsia-400">*</span></label>
                        <input
                          type="text"
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                          placeholder="e.g. Rochester, NY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-1 font-medium">Salary range ($)</label>
                        <input
                          type="text"
                          name="salary"
                          value={form.salary}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                          placeholder="e.g. 90,000 - 110,000"
                        />

                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-zinc-400 mb-1 font-medium">Job Description <span className="text-fuchsia-400">*</span></label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none min-h-[80px]"
                        placeholder="Describe the job role, expectations, etc."
                        required
                      />
                    </div>
                    {/* Skills */}
                    <div className="mt-4">
                      <label className="block text-zinc-400 mb-1 font-medium">Skills</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {form.skills.map(skill => (
                          <span
                            key={skill}
                            className="bg-fuchsia-700/80 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1"
                          >
                            {skill}
                            <button
                              type="button"
                              className="ml-1 text-xs hover:text-fuchsia-300"
                              onClick={() => handleSkillRemove(skill)}
                              aria-label="Remove skill"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={skillInput}
                          onChange={e => setSkillInput(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleSkillAdd(); } }}
                          className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none text-sm"
                          placeholder="Add a skill"
                        />
                        <button
                          type="button"
                          className="px-3 py-2 rounded-lg bg-fuchsia-700 text-white font-semibold hover:bg-fuchsia-800 transition text-sm flex items-center gap-1"
                          onClick={handleSkillAdd}
                        >
                          <FaPlus /> Add
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-pink-300">
                      This is how candidate figures out what you need and why you're great to work with
                    </div>
                  </div>
                  {/* Company Info */}
                  <div className="bg-white/5 rounded-xl p-6 mt-6 border border-fuchsia-700/10">
                    <div className="flex justify-between items-center mb-4">
                      <div className="font-semibold text-zinc-200 text-lg">Company Info</div>
                      <button className="text-fuchsia-400 text-xs hover:underline">∞ Link company profile</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-zinc-400 mb-1 font-medium">Name <span className="text-fuchsia-400">*</span></label>
                        <input
                          type="text"
                          name="companyName"
                          value={form.companyName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                          placeholder="e.g. ABC"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-1 font-medium">Employees</label>
                        <input
                          type="text"
                          name="employees"
                          value={form.employees}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                          placeholder='e.g. 1000-2000'
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-1 font-medium">Location</label>
                        <input
                          type="text"
                          name="companyLocation"
                          value={form.companyLocation}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                          placeholder="e.g. US"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-8">
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-lg bg-fuchsia-700 text-white font-semibold hover:bg-fuchsia-800 transition text-lg"
                    >
                      {editId ? "Update Job" : "Post Job"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default PostJob