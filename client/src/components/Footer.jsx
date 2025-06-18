import React from "react";
import { assets } from "../assets/assets";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="bg-black py-12 mt-8 border-t border-gray-800">
        <div className="mx-auto px-32 flex flex-col md:flex-row justify-between gap-12">
          {/* Logo and Brand */}
          <div className="flex flex-col gap-4 md:w-1/3">
            <div className="flex items-center gap-2">
              <img src={assets.logo} alt="Logo" className="h-24 invert" />
              <span className="text-white font-bold text-lg">LockedIn</span>
            </div>
            <p className="text-gray-400 text-sm">
              LockedIn connects top talent with leading companies. Find your
              dream job or the perfect candidate, all in one place.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-fuchsia-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-fuchsia-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-fuchsia-400 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="flex flex-1 flex-wrap gap-12 justify-between">
            <div>
              <h4 className="text-white font-semibold mb-3">Product</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-fuchsia-400">
                    All Jobs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-fuchsia-400">
                    Companies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-fuchsia-400">
                    Candidates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Resources</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-fuchsia-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-fuchsia-400">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-fuchsia-400">
                    Webinars
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Company</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>
                  <a href="#" className="hover:text-fuchsia-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-fuchsia-400">
                    Join us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-fuchsia-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="">
            <h4 className="text-white font-semibold mb-3">
              Subscribe to our newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-3">
              Get notifications and exclusive insights.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 rounded-lg bg-zinc-800 text-gray-200 border border-zinc-700 focus:outline-none focus:border-fuchsia-400"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:scale-95 transition-all duration-300 ease-in-out text-white px-4 py-2 rounded-lg font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} LockedIn. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
