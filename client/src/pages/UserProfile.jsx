import React, { useState, useEffect } from "react";
import Navbar from "./../components/Navbar";
import UserPanel from "../components/UserPanel";
import api from "../api/axios.js";
import RecentApplications from "../components/RecentApplications";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaInfoCircle, FaTools, FaLinkedin, FaGithub, FaFileAlt } from "react-icons/fa";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [resumeName, setResumeName] = useState("");
  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    api
      .get("/users/profile")
      .then((res) => {
        setProfile(res.data);
        setForm(res.data);
        setResumeName(res.data.resume ? res.data.resume.name : "");
      })
      .catch((err) => {
        console.error(err);
      });

    api
      .get("/applications/myapplications")
      .then((res) => {
        setRecentApplications(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSkillChange = (idx, value) => {
    const newSkills = [...form.skills];
    newSkills[idx] = value;
    setForm({ ...form, skills: newSkills });
  };

  const handleAddSkill = () => {
    setForm({ ...form, skills: [...form.skills, ""] });
  };

  const handleRemoveSkill = (idx) => {
    const newSkills = form.skills.filter((_, i) => i !== idx);
    setForm({ ...form, skills: newSkills });
  };

  const handleEdit = () => {
    setEditMode(true);
    setForm(profile);
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm(profile);
    setResumeName(profile.resume ? profile.resume.name : "");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/profile", form);
      setProfile(form);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <UserPanel />
        <main className="flex-1 flex justify-center items-start">
          <div className="w-full flex flex-col lg:flex-row gap-8 lg:h-[calc(100vh-90px)]">
            {/* Profile Section */}
            <div className="w-full lg:w-1/2 h-full overflow-y-auto">
              <div className="bg-zinc-800/30 rounded-3xl shadow-2xl border border-fuchsia-700/40 p-10 backdrop-blur-md transition-all duration-300 hover:border-fuchsia-400/40">
                <div className="flex flex-col items-center mb-8">
                  <div className="relative group mb-2">
                    <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-fuchsia-500 via-fuchsia-700 to-fuchsia-900 p-1 shadow-lg">
                      <img
                        src={editMode ? form.profilePicture : profile.profilePicture}
                        alt="avatar"
                        className="w-full h-full rounded-full object-cover bg-white"
                      />
                    </div>
                  </div>
                  {editMode && (
                    <div className="mt-3 w-72">
                      <input
                        type="text"
                        name="profilePicture"
                        value={form.profilePicture || ""}
                        onChange={handleChange}
                        placeholder="Paste profile picture URL"
                        className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-fuchsia-700 focus:border-fuchsia-400 outline-none transition"
                      />
                    </div>
                  )}
                  {!editMode && (
                    <h2 className="text-3xl font-extrabold text-white mt-4 tracking-tight drop-shadow flex items-center gap-2">
                      <FaUser className="text-fuchsia-400" /> Hi! {profile.name}
                    </h2>
                  )}
                </div>
                <form onSubmit={handleSave} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-fuchsia-300 mb-1 font-semibold flex items-center gap-2">
                        <FaUser /> Name
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-fuchsia-700 focus:border-fuchsia-400 outline-none transition"
                        />
                      ) : (
                        <div className="text-white font-semibold">{profile.name}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-fuchsia-300 mb-1 font-semibold flex items-center gap-2">
                        <FaEnvelope /> Email
                      </label>
                      {editMode ? (
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-fuchsia-700 focus:border-fuchsia-400 outline-none transition"
                        />
                      ) : (
                        <div className="text-white">{profile.email}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-fuchsia-300 mb-1 font-semibold flex items-center gap-2">
                        <FaPhone /> Phone
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-fuchsia-700 focus:border-fuchsia-400 outline-none transition"
                        />
                      ) : (
                        <div className="text-white">{profile.phone}</div>
                      )}
                    </div>
                    <div>
                      <label className="block text-fuchsia-300 mb-1 font-semibold flex items-center gap-2">
                        <FaMapMarkerAlt /> Location
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-fuchsia-700 focus:border-fuchsia-400 outline-none transition"
                        />
                      ) : (
                        <div className="text-white">{profile.location}</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-fuchsia-300 mb-1 font-semibold flex items-center gap-2">
                      <FaInfoCircle /> About
                    </label>
                    {editMode ? (
                      <textarea
                        name="about"
                        value={form.about}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-fuchsia-700 focus:border-fuchsia-400 outline-none resize-none transition"
                      />
                    ) : (
                      <div className="text-zinc-200">{profile.about}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-fuchsia-300 mb-1 font-semibold flex items-center gap-2">
                      <FaTools /> Skills
                    </label>
                    {editMode ? (
                      <div className="flex flex-wrap gap-2">
                        {form.skills.map((skill, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <input
                              type="text"
                              value={skill}
                              onChange={(e) => handleSkillChange(idx, e.target.value)}
                              className="px-2 py-1 rounded bg-zinc-800 text-white border border-fuchsia-700 focus:border-fuchsia-400 outline-none transition"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(idx)}
                              className="text-fuchsia-400 hover:text-fuchsia-600 text-lg px-1"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={handleAddSkill}
                          className="px-2 py-1 rounded bg-fuchsia-700 text-white hover:bg-fuchsia-800 transition"
                        >
                          + Add
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-gradient-to-r from-fuchsia-700 via-fuchsia-500 to-fuchsia-700 text-white px-3 py-1 rounded-full text-xs shadow flex items-center gap-1"
                          >
                            <FaTools className="text-xs" /> {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-fuchsia-300 mb-1 font-semibold flex items-center gap-2">
                        <FaLinkedin /> LinkedIn
                      </label>
                      {editMode ? (
                        <input
                          type="url"
                          name="linkedin"
                          value={form.linkedin}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-fuchsia-700 focus:border-fuchsia-400 outline-none transition"
                        />
                      ) : (
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-fuchsia-400 hover:underline flex items-center gap-1"
                        >
                          {profile.linkedin}
                        </a>
                      )}
                    </div>
                    <div>
                      <label className="block text-fuchsia-300 mb-1 font-semibold flex items-center gap-2">
                        <FaGithub /> GitHub
                      </label>
                      {editMode ? (
                        <input
                          type="url"
                          name="github"
                          value={form.github}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-fuchsia-700 focus:border-fuchsia-400 outline-none transition"
                        />
                      ) : (
                        <a
                          href={profile.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-fuchsia-400 hover:underline flex items-center gap-1"
                        >
                          {profile.github}
                        </a>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-fuchsia-300 mb-1 font-semibold flex items-center gap-2">
                      <FaFileAlt /> Resume
                    </label>
                    {editMode ? (
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          name="resume"
                          value={form.resume || ""}
                          onChange={handleChange}
                          placeholder="Paste resume URL"
                          className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-fuchsia-700 focus:border-fuchsia-400 outline-none transition"
                        />
                        {resumeName && (
                          <span className="text-fuchsia-300 text-xs">
                            {resumeName}
                          </span>
                        )}
                      </div>
                    ) : profile.resume ? (
                      <a
                        href={profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fuchsia-400 hover:underline flex items-center gap-1"
                      >
                        View Resume
                      </a>
                    ) : (
                      <span className="text-zinc-400 text-xs">
                        No resume uploaded
                      </span>
                    )}
                  </div>
                  <div className="flex justify-end gap-4 pt-4">
                    {editMode ? (
                      <>
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="px-6 py-2 rounded-lg bg-zinc-700 text-white hover:bg-zinc-800 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-lg bg-gradient-to-r from-fuchsia-700 to-fuchsia-900 text-white font-semibold hover:from-fuchsia-800 hover:to-fuchsia-900 shadow transition"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={handleEdit}
                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-fuchsia-700 to-fuchsia-900 text-white font-semibold hover:from-fuchsia-800 hover:to-fuchsia-900 shadow transition"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            {/* Recent Applications Section */}
            <div className="w-full lg:w-1/2 flex flex-col h-full overflow-y-auto">
              <RecentApplications recentApplications={recentApplications} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;