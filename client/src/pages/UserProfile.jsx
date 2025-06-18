import React, { useState, useEffect } from "react";
import Navbar from "./../components/Navbar";
import UserPanel from "../components/UserPanel";
import api from "../api/axios.js";
import RecentApplications from "../components/RecentApplications";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaTools,
  FaLinkedin,
  FaGithub,
  FaFileAlt,
  FaBuilding,
  FaUserTie,
  FaBriefcase,
} from "react-icons/fa";
import toast from "react-hot-toast";

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
        const js = res.data.sort(
          (a, b) => new Date(b.appliedAt) - new Date(a.appliedAt)
        );
        setRecentApplications(js);
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
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      toast.error("Failed to update profile.");
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
        <main className="flex-1 flex justify-center items-start p-2">
          <div className="w-full flex flex-col lg:flex-row gap-2 lg:h-[calc(100vh-95px)]">
            {/* Profile Section */}
            <div className="w-full lg:w-1/2 h-full overflow-y-auto">
              <div className="bg-zinc-900/20 rounded-xl shadow-md border border-zinc-700/50 p-8 backdrop-blur-md transition-all duration-300 hover:border-purple-400/50">
                <div className="flex flex-col items-center mb-8">
                  <div className="relative group mb-2">
                    <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-fuchsia-600 via-teal-600 to-purple-600 p-1 shadow-lg">
                      <img
                        src={
                          editMode
                            ? form.profilePicture
                            : profile.profilePicture
                        }
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
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-fuchsia-700/50 focus:border-fuchsia-400 outline-none transition"
                      />
                    </div>
                  )}
                  {!editMode && (
                    <h2 className="text-3xl font-extrabold text-white mt-4 tracking-tight drop-shadow flex items-center gap-2">
                      Hi ! {profile.name}
                    </h2>
                  )}
                </div>
                <form onSubmit={handleSave} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block mb-1 font-semibold flex items-center gap-2">
                        <FaUser className="text-teal-300" /> Name
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-fuchsia-700/50 focus:border-fuchsia-400 outline-none transition"
                        />
                      ) : (
                        <div className="text-white font-semibold">
                          {profile.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold flex items-center gap-2">
                        <FaEnvelope className="text-teal-300" /> Email
                      </label>
                      {editMode ? (
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-fuchsia-700/50 focus:border-fuchsia-400 outline-none transition"
                        />
                      ) : (
                        <div className="text-white">{profile.email}</div>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold flex items-center gap-2">
                        <FaPhone className="text-teal-300" /> Phone
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-fuchsia-700/50 focus:border-fuchsia-400 outline-none transition"
                        />
                      ) : (
                        <div className="text-white">{profile.phone}</div>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold flex items-center gap-2">
                        <FaMapMarkerAlt className="text-teal-300" /> Location
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-fuchsia-700/50 focus:border-fuchsia-400 outline-none transition"
                        />
                      ) : (
                        <div className="text-white">{profile.location}</div>
                      )}
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold flex items-center gap-2">
                        <FaUserTie className="text-teal-300" /> Current Job
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="jobTitle"
                          value={form.jobTitle}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-fuchsia-700/50 focus:border-fuchsia-400 outline-none transition"
                        />
                      ) : (
                        <div className="text-white">{profile.jobTitle}</div>
                      )}
                    </div>
                    <div>
                      <label className="block  mb-1 font-semibold flex items-center gap-2">
                        <FaBuilding className="text-teal-300" /> Current
                        Organisation
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name="companyName"
                          value={form.companyName}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-800 text-white border border-fuchsia-700/50 focus:border-fuchsia-400 outline-none transition"
                        />
                      ) : (
                        <div className="text-white">{profile.companyName}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-semibold flex items-center gap-2">
                      <FaInfoCircle className="text-teal-300" /> About
                    </label>
                    {editMode ? (
                      <textarea
                        name="about"
                        value={form.about}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-fuchsia-700/50 focus:border-fuchsia-400 outline-none resize-none transition"
                      />
                    ) : (
                      <div className="text-white">{profile.about}</div>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold flex items-center gap-2">
                      <FaTools className="text-teal-300" /> Skills
                    </label>
                    {editMode ? (
                      <div className="flex flex-wrap gap-2">
                        {form.skills.map((skill, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <input
                              type="text"
                              value={skill}
                              onChange={(e) =>
                                handleSkillChange(idx, e.target.value)
                              }
                              className="px-2 py-1 rounded bg-zinc-900 text-white border border-fuchsia-700/50 focus:border-fuchsia-400 outline-none transition"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(idx)}
                              className="text-teal-400 hover:text-teal-600 text-lg px-1"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={handleAddSkill}
                          className="py-1 px-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/25"
                        >
                          Add
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-zinc-950/30 border border-fuchsia-500/30 hover:bg-purple-700/30 hover:border-purple-400 transition-colors duration-300 text-white px-3 py-1 rounded-xl text-sm shadow flex items-center gap-1"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      {editMode ? (
                        <>
                          <label className="block mb-1 font-semibold flex items-center gap-2">
                            <FaLinkedin className="text-teal-300" /> LinkedIn
                          </label>
                          <input
                            type="url"
                            name="linkedin"
                            value={form.linkedin}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-fuchsia-700/50 focus:border-fuchsia-400 outline-none transition"
                          />
                        </>
                      ) : (
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <FaLinkedin className="text-teal-300" /> LinkedIn
                        </a>
                      )}
                    </div>
                    <div>
                      {editMode ? (
                        <>
                          <label className="block mb-1 font-semibold flex items-center gap-2">
                            <FaGithub className="text-teal-300" /> GitHub
                          </label>
                          <input
                            type="url"
                            name="github"
                            value={form.github}
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-fuchsia-700/50 focus:border-fuchsia-400 outline-none transition"
                          />{" "}
                        </>
                      ) : (
                        <a
                          href={profile.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=" flex items-center gap-2"
                        >
                          <FaGithub className="text-teal-300" /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                  <div>
                    {editMode ? (
                      <>
                        {" "}
                        <label className="block mb-1 font-semibold flex items-center gap-2">
                          <FaFileAlt className="text-teal-300" /> Resume
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            name="resume"
                            value={form.resume || ""}
                            onChange={handleChange}
                            placeholder="Paste resume URL"
                            className="w-full px-3 py-2 rounded-lg bg-zinc-900 text-white border border-fuchsia-700/50 focus:border-fuchsia-400 outline-none transition"
                          />
                          {resumeName && (
                            <span className="text-fuchsia-300 text-xs">
                              {resumeName}
                            </span>
                          )}
                        </div>
                      </>
                    ) : profile.resume ? (
                      <a
                        href={profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" flex items-center gap-2"
                      >
                        <FaFileAlt className="text-teal-300" /> Resume
                      </a>
                    ) : (
                      <span className="text-zinc-400 text-sm">
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
                          className="px-5 py-2 rounded-lg bg-zinc-900 text-white shadow-md shadow-fuchsia-600/25 border border-fuchsia-600 transform hover:scale-105 hover:shadow-lg transition-all duration-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="py-2 px-5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/25"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={handleEdit}
                        className="gap-3 py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg shadow-fuchsia-500/25"
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
