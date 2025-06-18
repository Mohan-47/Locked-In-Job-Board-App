// src/components/ApplicantProfileModal.jsx
import React from "react";
import {
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLink,
  FaGithub,
  FaNewspaper,
  FaInfoCircle,
} from "react-icons/fa";

const ApplicantProfileModal = ({ applicant, onClose }) => {
  if (!applicant) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-auto">
      <div className="bg-zinc-900/90 rounded-2xl shadow-2xl border border-fuchsia-700/30 w-full max-w-2xl mx-auto p-6 sm:p-8 relative transform transition-all scale-100 opacity-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-100 transition-colors text-2xl"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <img
            src={applicant.profilePicture || "https://via.placeholder.com/100"}
            alt={applicant.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-fuchsia-600 mb-4 shadow-lg"
          />
          <h2 className="text-3xl font-bold text-zinc-100 mb-1">
            {applicant.name}
          </h2>
          <p className="text-fuchsia-400 text-lg mb-2">{applicant.jobtTitle}</p>
          <div className="flex items-center text-zinc-400 text-sm">
            {applicant.location && (
              <>
                <FaMapMarkerAlt className="mr-1" /> {applicant.location}
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-zinc-200">
          {applicant.email && (
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-teal-300" />
              <span>{applicant.email}</span>
            </div>
          )}
          {applicant.phone && (
            <div className="flex items-center">
              <FaPhone className="mr-2 text-teal-300" />
              <span>{applicant.phone}</span>
            </div>
          )}
          {applicant.linkedin && (
            <div className="flex items-center col-span-1 md:col-span-2">
              <FaLink className="mr-2 text-teal-300" />
              <a
                href={applicant.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-200 hover:underline"
              >
                LinkedIn
              </a>
            </div>
          )}
          {applicant.github && (
            <div className="flex items-center col-span-1 md:col-span-2">
              <FaGithub className="mr-2 text-teal-300" />
              <a
                href={applicant.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-200 hover:underline"
              >
                LinkedIn
              </a>
            </div>
          )}
          {applicant.about && (
            <div className="">
              <div className="flex">
                <FaInfoCircle className="mr-2 mt-1 text-teal-300" />
                <h3 className="text-zinc-300">About </h3>
              </div>
              <p className="text-zinc-200 whitespace-pre-wrap leading-relaxed">
                {applicant.about}
              </p>
            </div>
          )}

          {/* Add more contact details here if available in your applicant data */}
        </div>

        {applicant.skills && applicant.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {applicant.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-fuchsia-700/20 border border-purple-600/50 text-white px-3 py-1 rounded-lg text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {applicant.experience && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-fuchsia-300 mb-3">
              Experience
            </h3>
            <p className="text-zinc-200 whitespace-pre-wrap">
              {applicant.experience}
            </p>
          </div>
        )}

        {applicant.education && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-fuchsia-300 mb-3">
              Education
            </h3>
            <p className="text-zinc-200 whitespace-pre-wrap">
              {applicant.education}
            </p>
          </div>
        )}

        {applicant.bio && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-fuchsia-300 mb-3">
              About Me
            </h3>
            <p className="text-zinc-200 whitespace-pre-wrap">{applicant.bio}</p>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <a
            href={applicant.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-semibold hover:scale-95 transition-all hover:shadow-sm duration-300 ease-in-out shadow-md shadow-teal-500/25"
          >
            View Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfileModal;
