import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import UserPanel from "../components/UserPanel";
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import api from "../api/axios.js";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const initialState = {
  title: "",
  location: "",
  type: "",
  salary: "",
  salaryType: "",
  description: "",
  skills: [],
  companyName: "",
  employees: "",
  companyLocation: "",
};

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

const PostJob = () => {
  const [form, setForm] = useState(initialState);
  const [skillInput, setSkillInput] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const editId = params.get("edit");

  useEffect(() => {
    if (editId) {
      api.get(`/jobs/${editId}`).then((res) => {
        setForm({
          ...res.data,
          skills: res.data.skills || [],
        });
      });
    }
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      setForm((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      if (editId) {
        // Update job
        await api.put(`/jobs/${editId}`, form).then((res) => {
          setSuccess(true);
          toast.success("Job updated successfully!");
          navigate(`/recruiter/job/${res.data._id}/manage`);
        });
      } else {
        // Create job
        await api.post("/jobs", form).then((res) => {
          setSuccess(true);
          setForm(initialState);
          toast.success("Job created successfully!");
          navigate(`/recruiter/job/${res.data._id}/manage`);
        });
      }
      // navigate("/recruiter/dashboard");
    } catch (err) {
      toast.error("Failed to save job.");
      setError(err.response?.data?.message || "Failed to save job.");
    }
  };

  return (
    <div className="min-h-screen text-zinc-100">
      <Navbar />
      <div className="flex">
        <UserPanel />
        <main className="flex-1 py-10 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Steps & Promo */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="bg-zinc-900/50 rounded-2xl p-6 shadow-lg border border-fuchsia-700/20">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-fuchsia-400">
                      Job info
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-fuchsia-400">
                      Company info
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2 opacity-80">
                    <span className="font-semibold text-zinc-200">
                      {editId ? "Update Job" : "Post Job"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Right: Job & Company Info */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div className="bg-zinc-900/50 rounded-2xl shadow-xl border border-fuchsia-700/20 p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-teal-200">
                    {editId ? "Update Job" : "Post a New Job"}
                  </h2>
                  {/* <button className="px-5 py-2 rounded-lg bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 transition text-sm shadow-md">
                    Preview
                  </button> */}
                </div>
                {error && (
                  <div className="mb-4 text-red-400 bg-red-900/20 p-3 rounded-lg">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="mb-4 text-green-400 bg-green-900/20 p-3 rounded-lg">
                    Job {editId ? "updated" : "posted"} successfully!
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Job Info */}
                  <div>
                    <div className="font-semibold text-zinc-200 mb-4 text-xl border-b border-fuchsia-700/30 pb-2">
                      Job Information
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-zinc-400 mb-2 font-medium">
                          Job title <span className="text-fuchsia-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={form.title}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none placeholder-zinc-500"
                          placeholder="e.g. Graphic Designer"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-2 font-medium">
                          Employment Type{" "}
                          <span className="text-fuchsia-400">*</span>
                        </label>
                        <select
                          name="type"
                          value={form.type}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none appearance-none cursor-pointer"
                          required
                        >
                          <option value="" className="bg-zinc-800">
                            Select type
                          </option>
                          {jobTypes.map((type) => (
                            <option
                              key={type}
                              value={type}
                              className="bg-zinc-800"
                            >
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-2 font-medium">
                          Job Location{" "}
                          <span className="text-fuchsia-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none placeholder-zinc-500"
                          placeholder="e.g. Rochester, NY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-2 font-medium">
                          Salary range ($)
                        </label>
                        <input
                          type="text"
                          name="salary"
                          value={form.salary}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none placeholder-zinc-500"
                          placeholder="e.g. 90,000 - 110,000"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="block text-zinc-400 mb-2 font-medium">
                        Job Description{" "}
                        <span className="text-fuchsia-400">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none min-h-[120px] placeholder-zinc-500"
                        placeholder="Describe the job role, expectations, etc."
                        required
                      />
                    </div>
                    {/* Skills */}
                    <div className="mt-6">
                      <label className="block text-zinc-400 mb-2 font-medium">
                        Skills
                      </label>
                      <div className="flex flex-wrap gap-3 mb-3">
                        {form.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-fuchsia-700/30 border border-purple-500/50 text-white px-4 py-1.5 rounded-full text-sm flex items-center gap-2 shadow-sm"
                          >
                            {skill}
                            <button
                              type="button"
                              className="ml-1 text-xs hover:text-fuchsia-300 transition-colors"
                              onClick={() => handleSkillRemove(skill)}
                              aria-label="Remove skill"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleSkillAdd();
                            }
                          }}
                          className="flex-1 px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none text-sm placeholder-zinc-500"
                          placeholder="Add a skill (e.g., React, Node.js)"
                        />
                        <button
                          type="button"
                          className="px-4 py-1 rounded-lg bg-gradient-to-tr from-fuchsia-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 ease-in-out text-sm flex items-center gap-2 shadow-md shadow-purple-500/25 hover:scale-95"
                          onClick={handleSkillAdd}
                        >
                          <FaPlus /> Add
                        </button>
                      </div>
                      <div className="mt-2 text-xs text-fuchsia-300 opacity-80">
                        This is how candidates figure out what you need and why
                        you're great to work with.
                      </div>
                    </div>
                  </div>
                  {/* Company Info */}
                  <div className="bg-zinc-800/10 rounded-xl p-8 mt-8 border border-fuchsia-700/20">
                    <div className="flex justify-between items-center mb-6">
                      <div className="font-semibold text-zinc-200 text-xl">
                        Company Information
                      </div>
                      {/* <button className="text-fuchsia-400 text-sm hover:underline hover:text-fuchsia-300 transition-colors">
                        ∞ Link company profile
                      </button> */}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-zinc-400 mb-2 font-medium">
                          Name <span className="text-fuchsia-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={form.companyName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none placeholder-zinc-500"
                          placeholder="e.g. ABC Tech Solutions"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-2 font-medium">
                          Employees
                        </label>
                        <input
                          type="text"
                          name="employees"
                          value={form.employees}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none placeholder-zinc-500"
                          placeholder="e.g. 1000-2000"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-2 font-medium">
                          Location
                        </label>
                        <input
                          type="text"
                          name="companyLocation"
                          value={form.companyLocation}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none placeholder-zinc-500"
                          placeholder="e.g. US, Remote"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-10">
                    <button
                      type="submit"
                      className="px-10 py-3 rounded-lg bg-gradient-to-r from-fuchsia-600/10 to-purple-600/10 text-white font-bold border border-fuchsia-600/30 hover:shadow-fuchsia-600/25 hover:shadow-lg transition-all duration-300 ease-in text-lg shadow-purple-600/25 hover:border-purple-600 shadow-md transform hover:scale-105"
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
  );
};

export default PostJob;
