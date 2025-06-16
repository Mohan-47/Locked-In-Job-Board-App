import React, { useState } from "react";
import Navbar from "../components/Navbar";
import UserPanel from "../components/UserPanel";
import {
    FaBuilding,
    FaEnvelope,
    FaPhone,
    FaBriefcase,
    FaEdit,
    FaMapMarkerAlt,
    FaUserTie,
    FaSave,
    FaTimes,
} from "react-icons/fa";

const initialRecruiter = {
    name: "Sarah Williams",
    title: "Lead Technical Recruiter",
    company: "Acme Tech Solutions",
    email: "sarah.williams@acmetech.com",
    phone: "+1 555-123-4567",
    location: "San Francisco, CA",
    about:
        "Experienced recruiter with a passion for connecting top talent with innovative companies. Skilled in tech hiring, employer branding, and building strong candidate relationships.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    stats: [
        {
            label: "Jobs Posted",
            value: 24,
            icon: <FaBriefcase className="text-fuchsia-400" />,
        },
        {
            label: "Hires",
            value: 12,
            icon: <FaUserTie className="text-green-400" />,
        },
        {
            label: "Active Listings",
            value: 3,
            icon: <FaBriefcase className="text-cyan-400" />,
        },
    ],
    social: [
        {
            label: "LinkedIn",
            url: "https://linkedin.com",
            icon: <FaBuilding className="text-blue-500" />,
        },
    ],
};

const RecruiterProfile = () => {
    const [recruiter, setRecruiter] = useState(initialRecruiter);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState(recruiter);

    const handleEdit = () => {
        setForm(recruiter);
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setRecruiter((prev) => ({
            ...prev,
            ...form,
        }));
        setEditMode(false);
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="flex">
                <UserPanel />
                <main className="flex-1 py-10 px-4">
                    <div className="max-w-3xl mx-auto">
                        {/* Profile Card */}
                        <div className="bg-zinc-800/80 rounded-2xl shadow-xl border border-zinc-700 p-8 flex flex-col md:flex-row items-center gap-8">
                            <img
                                src={recruiter.avatar}
                                alt={recruiter.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-fuchsia-500 shadow"
                            />
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    {editMode ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            className="text-3xl font-bold text-white bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 w-full"
                                        />
                                    ) : (
                                        <h2 className="text-3xl font-bold text-white">
                                            {recruiter.name}
                                        </h2>
                                    )}
                                    {!editMode && (
                                        <button
                                            className="ml-2 p-2 rounded-full bg-zinc-700 hover:bg-fuchsia-700 transition"
                                            title="Edit Profile"
                                            onClick={handleEdit}
                                        >
                                            <FaEdit className="text-fuchsia-400" />
                                        </button>
                                    )}
                                </div>
                                {editMode ? (
                                    <input
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        className="text-fuchsia-400 font-semibold text-lg bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 w-full mb-1"
                                    />
                                ) : (
                                    <div className="text-fuchsia-400 font-semibold text-lg">
                                        {recruiter.title}
                                    </div>
                                )}
                                <div className="flex items-center gap-2 mt-2 text-zinc-300">
                                    <FaBuilding className="text-fuchsia-400" />
                                    {editMode ? (
                                        <input
                                            type="text"
                                            name="company"
                                            value={form.company}
                                            onChange={handleChange}
                                            className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-zinc-300 w-full"
                                        />
                                    ) : (
                                        <span>{recruiter.company}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mt-1 text-zinc-400 text-sm">
                                    <FaMapMarkerAlt className="text-fuchsia-400" />
                                    {editMode ? (
                                        <input
                                            type="text"
                                            name="location"
                                            value={form.location}
                                            onChange={handleChange}
                                            className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-zinc-300 w-full"
                                        />
                                    ) : (
                                        <span>{recruiter.location}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 mt-4 flex-wrap">
                                    <span className="flex items-center gap-1 text-zinc-300">
                                        <FaEnvelope />
                                        {editMode ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-zinc-300 w-full"
                                            />
                                        ) : (
                                            <a
                                                href={`mailto:${recruiter.email}`}
                                                className="hover:text-fuchsia-400 transition"
                                            >
                                                {recruiter.email}
                                            </a>
                                        )}
                                    </span>
                                    <span className="flex items-center gap-1 text-zinc-300">
                                        <FaPhone />
                                        {editMode ? (
                                            <input
                                                type="text"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                className="bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-zinc-300 w-full"
                                            />
                                        ) : (
                                            recruiter.phone
                                        )}
                                    </span>
                                </div>
                                <div className="flex gap-3 mt-3">
                                    {recruiter.social.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:scale-110 transition"
                                        >
                                            {s.icon}
                                        </a>
                                    ))}
                                </div>
                                {editMode && (
                                    <div className="flex gap-3 mt-4">
                                        <button
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-fuchsia-700 text-white font-semibold hover:bg-fuchsia-800 transition"
                                            onClick={handleSave}
                                        >
                                            <FaSave /> Save
                                        </button>
                                        <button
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-700 text-white font-semibold hover:bg-zinc-800 transition"
                                            onClick={handleCancel}
                                        >
                                            <FaTimes /> Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            {recruiter.stats.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="bg-zinc-800/80 rounded-xl p-6 flex flex-col items-center border border-zinc-700 shadow"
                                >
                                    <div className="mb-2">{stat.icon}</div>
                                    <div className="text-3xl font-bold text-white">
                                        {stat.value}
                                    </div>
                                    <div className="text-zinc-400 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                        {/* About Card */}
                        <div className="bg-zinc-800/80 rounded-2xl shadow-xl border border-zinc-700 p-8 mt-8">
                            <h3 className="text-xl font-semibold text-white mb-2">About</h3>
                            {editMode ? (
                                <textarea
                                    name="about"
                                    value={form.about}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:border-fuchsia-500 outline-none min-h-[80px]"
                                />
                            ) : (
                                <p className="text-zinc-300">{recruiter.about}</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default RecruiterProfile;
