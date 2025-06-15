import React, { useState } from 'react'
import Navbar from './../components/Navbar'
import UserPanel from '../components/UserPanel'

// Dummy recent applications data
const recentApplications = [
  {
    id: 1,
    job: "Frontend Developer",
    company: "Acme Tech",
    status: "Under Review",
    date: "2025-06-10",
    logo: "https://ui-avatars.com/api/?name=Acme+Tech&background=18181b&color=fff"
  },
  {
    id: 2,
    job: "UI/UX Designer",
    company: "Pixel Studio",
    status: "Interview",
    date: "2025-06-08",
    logo: "https://ui-avatars.com/api/?name=Pixel+Studio&background=18181b&color=fff"
  },
  {
    id: 3,
    job: "Backend Engineer",
    company: "DataWorks",
    status: "Rejected",
    date: "2025-06-05",
    logo: "https://ui-avatars.com/api/?name=DataWorks&background=18181b&color=fff"
  },
  {
    id: 4,
    job: "Product Manager",
    company: "InnovateX",
    status: "Applied",
    date: "2025-06-01",
    logo: "https://ui-avatars.com/api/?name=InnovateX&background=18181b&color=fff"
  },
  {
    id: 5,
    job: "QA Tester",
    company: "SoftTest",
    status: "Shortlisted",
    date: "2025-05-28",
    logo: "https://ui-avatars.com/api/?name=SoftTest&background=18181b&color=fff"
  }
]

const initialProfile = {
  avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=8b5cf6&color=fff',
  name: 'Jane Doe',
  email: 'jane.doe@email.com',
  phone: '+1 234 567 8901',
  location: 'San Francisco, CA',
  bio: 'Creative developer passionate about building beautiful and functional web experiences.',
  skills: ['React', 'Node.js', 'UI/UX', 'TailwindCSS'],
  linkedin: 'https://linkedin.com/in/janedoe',
  github: 'https://github.com/janedoe',
  resume: null,
}

const UserProfile = () => {
  const [profile, setProfile] = useState(initialProfile)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState(profile)
  const [resumeName, setResumeName] = useState(profile.resume ? profile.resume.name : '')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSkillChange = (idx, value) => {
    const newSkills = [...form.skills]
    newSkills[idx] = value
    setForm({ ...form, skills: newSkills })
  }

  const handleAddSkill = () => {
    setForm({ ...form, skills: [...form.skills, ''] })
  }

  const handleRemoveSkill = (idx) => {
    const newSkills = form.skills.filter((_, i) => i !== idx)
    setForm({ ...form, skills: newSkills })
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setForm({ ...form, avatar: url })
    }
  }

  const handleResumeChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setForm({ ...form, resume: file })
      setResumeName(file.name)
    }
  }

  const handleEdit = () => {
    setEditMode(true)
    setForm(profile)
  }

  const handleCancel = () => {
    setEditMode(false)
    setForm(profile)
    setResumeName(profile.resume ? profile.resume.name : '')
  }

  const handleSave = (e) => {
    e.preventDefault()
    setProfile(form)
    setEditMode(false)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <UserPanel />
        <main className="flex-1 flex justify-center items-start py-10 px-4">
          <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
            {/* Profile Section */}
            <div className="w-full lg:w-1/2">
              <div className="bg-zinc-800/80 rounded-2xl shadow-2xl border border-fuchsia-700/30 p-8 backdrop-blur-md">
                <div className="flex flex-col items-center mb-8">
                  <div className="relative group">
                    <img
                      src={editMode ? form.avatar : profile.avatar}
                      alt="avatar"
                      className="w-32 h-32 rounded-full border-4 border-fuchsia-500 shadow-lg object-cover bg-white"
                    />
                    {editMode && (
                      <label className="absolute bottom-2 right-2 bg-fuchsia-700 text-white rounded-full p-2 cursor-pointer hover:bg-fuchsia-800 transition">
                        <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                        <span className="text-xs">Edit</span>
                      </label>
                    )}
                  </div>
                  {!editMode && (
                    <>
                      <h2 className="text-2xl font-bold text-white mt-4">{profile.name}</h2>
                      <p className="text-fuchsia-300">{profile.email}</p>
                      <p className="text-zinc-400">{profile.location}</p>
                    </>
                  )}
                </div>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-zinc-300 mb-1">Name</label>
                      {editMode ? (
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                        />
                      ) : (
                        <div className="text-white">{profile.name}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-zinc-300 mb-1">Email</label>
                      {editMode ? (
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                        />
                      ) : (
                        <div className="text-white">{profile.email}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-zinc-300 mb-1">Phone</label>
                      {editMode ? (
                        <input
                          type="text"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                        />
                      ) : (
                        <div className="text-white">{profile.phone}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-zinc-300 mb-1">Location</label>
                      {editMode ? (
                        <input
                          type="text"
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                        />
                      ) : (
                        <div className="text-white">{profile.location}</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-zinc-300 mb-1">About</label>
                    {editMode ? (
                      <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none resize-none"
                      />
                    ) : (
                      <div className="text-zinc-200">{profile.bio}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-zinc-300 mb-1">Skills</label>
                    {editMode ? (
                      <div className="flex flex-wrap gap-2">
                        {form.skills.map((skill, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <input
                              type="text"
                              value={skill}
                              onChange={e => handleSkillChange(idx, e.target.value)}
                              className="px-2 py-1 rounded bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                            />
                            <button type="button" onClick={() => handleRemoveSkill(idx)} className="text-fuchsia-400 hover:text-fuchsia-600 text-lg px-1">&times;</button>
                          </div>
                        ))}
                        <button type="button" onClick={handleAddSkill} className="px-2 py-1 rounded bg-fuchsia-700 text-white hover:bg-fuchsia-800 transition">+ Add</button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, idx) => (
                          <span key={idx} className="bg-fuchsia-900/60 text-fuchsia-200 px-3 py-1 rounded-full text-xs">{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-zinc-300 mb-1">LinkedIn</label>
                      {editMode ? (
                        <input
                          type="url"
                          name="linkedin"
                          value={form.linkedin}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                        />
                      ) : (
                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 hover:underline">{profile.linkedin}</a>
                      )}
                    </div>
                    <div>
                      <label className="block text-zinc-300 mb-1">GitHub</label>
                      {editMode ? (
                        <input
                          type="url"
                          name="github"
                          value={form.github}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none"
                        />
                      ) : (
                        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 hover:underline">{profile.github}</a>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-zinc-300 mb-1">Resume</label>
                    {editMode ? (
                      <div className="flex items-center gap-3">
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} className="text-white" />
                        {resumeName && <span className="text-fuchsia-300 text-xs">{resumeName}</span>}
                      </div>
                    ) : (
                      profile.resume ? (
                        <a
                          href={URL.createObjectURL(profile.resume)}
                          download={profile.resume.name}
                          className="text-fuchsia-400 hover:underline"
                        >
                          Download Resume
                        </a>
                      ) : (
                        <span className="text-zinc-400 text-xs">No resume uploaded</span>
                      )
                    )}
                  </div>
                  <div className="flex justify-end gap-4 pt-4">
                    {editMode ? (
                      <>
                        <button type="button" onClick={handleCancel} className="px-6 py-2 rounded-lg bg-zinc-700 text-white hover:bg-zinc-800 transition">Cancel</button>
                        <button type="submit" className="px-6 py-2 rounded-lg bg-fuchsia-700 text-white font-semibold hover:bg-fuchsia-800 transition">Save</button>
                      </>
                    ) : (
                      <button type="button" onClick={handleEdit} className="px-6 py-2 rounded-lg bg-fuchsia-700 text-white font-semibold hover:bg-fuchsia-800 transition">Edit Profile</button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            {/* Recent Applications Section */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <div className="bg-zinc-800/80 rounded-2xl shadow-2xl border border-fuchsia-700/30 p-8 backdrop-blur-md h-full flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-6">Recent Applications</h2>
                <div className="flex-1 overflow-y-auto pr-2">
                  {recentApplications.map(app => (
                    <div key={app.id} className="flex items-center gap-4 bg-zinc-900/80 rounded-xl p-4 mb-4 border border-zinc-700">
                      <img src={app.logo} alt={app.company} className="w-14 h-14 rounded-lg object-cover border border-fuchsia-700/40" />
                      <div className="flex-1">
                        <div className="font-semibold text-white">{app.job}</div>
                        <div className="text-zinc-400 text-sm">{app.company}</div>
                        <div className="text-xs text-zinc-500">{app.date}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${app.status === "Interview"
                          ? "bg-green-900 text-green-300"
                          : app.status === "Rejected"
                            ? "bg-red-900 text-red-300"
                            : app.status === "Shortlisted"
                              ? "bg-cyan-900 text-cyan-300"
                              : app.status === "Under Review"
                                ? "bg-yellow-900 text-yellow-300"
                                : "bg-zinc-700 text-zinc-300"
                        }
                      `}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default UserProfile