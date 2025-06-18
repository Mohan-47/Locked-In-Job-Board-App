import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { assets } from "../assets/assets";
import api from "../api/axios.js";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  // const [token, setToken] = useState(null);
  const [loadingAutoLogin, setLoadingAutoLogin] = useState(true); // New state for loading

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      const loadingToast = toast.loading("Auto-login in progress...");
      api
        .get("/users/profile")
        .then(() => {
          setTimeout(() => {
            if (role === "Candidate") {
              navigate("/user/dashboard");
            } else if (role === "Recruiter") {
              navigate("/recruiter/dashboard");
            }
            toast.success("Login successful!", { id: loadingToast });
          }, 500); // Short delay for seamless redirect
        })
        .catch((err) => {
          // If the token is invalid/expired, remove it and show the login form.
          console.error("Login failed:", err);
          toast.error("Login failed. Please log in again.", {
            id: loadingToast,
          });
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          setError("Session expired or invalid. Please log in again.");
          setLoadingAutoLogin(false); // Stop loading, show form
        });
    } else {
      setLoadingAutoLogin(false); // No token, show login form immediately
    }
  }, [navigate]); // navigate is a dependency of useEffect

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.role) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      // Save token to localStorage or context
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", form.role);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        if (form.role === "Candidate") {
          navigate("/user/dashboard");
        } else if (form.role === "Recruiter") {
          navigate("/recruiter/dashboard");
        }
        toast.success("Login successful!");
      }, 1500);
    } catch (err) {
      toast.error("Login failed. Please log in again.");
      setError(err.response?.data?.message || "Login failed");
    }
  };
  if (loadingAutoLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-950 to-fuchsia-900 text-white text-lg"></div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-950 to-fuchsia-900">
      <div className="flex w-full rounded-2xl overflow-hidden ">
        {/* Left: Logo and Name */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-10">
          <a href="/">
            <img
              src={assets.logo}
              alt="Logo "
              className="w-36 h-36 mb-6 drop-shadow-lg invert"
            />
          </a>
          <a href="/">
            <h1 className="text-6xl font-extrabold text-white mb-2 tracking-wide">
              LockedIn
            </h1>
          </a>
          <p className="text-fuchsia-100 text-lg text-center">
            Welcome back! Log in to continue your journey.
          </p>
        </div>
        {/* Right: Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center ">
          <div className=" bg-zinc-800/30 p-8 rounded-xl shadow-xl w-full max-w-md border border-zinc-700/30 animate-fade-in">
            <div className="flex justify-center mb-4">
              <FaSignInAlt className="text-white" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">
              Login to Your Account
            </h2>
            {error && (
              <div className="mb-4 text-zinc-400 text-center">{error}</div>
            )}
            {success && (
              <div className="mb-4 text-zinc-400 text-center">{success}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-300 mb-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700/30 text-zinc-200 border border-zinc-700 focus:outline-none focus:border-fuchsia-800"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700/30 text-zinc-200 border border-zinc-700 focus:outline-none focus:border-fuchsia-800"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1" htmlFor="role">
                  Login as
                </label>
                <select
                  id="role"
                  name="role"
                  className="w-full px-4 py-2 rounded-lg bg-zinc-700/30 text-zinc-200 border border-zinc-700 focus:outline-none focus:border-fuchsia-800"
                  value={form.role || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="" className="bg-zinc-800">
                    Select Role
                  </option>
                  <option value="Candidate" className="bg-zinc-800">
                    Candidate
                  </option>
                  <option value="Recruiter" className="bg-zinc-800">
                    Recruiter
                  </option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-black/60 hover:bg-black/5 hover:border-fuchsia-400/60 hover:border border-black/60 shadow-md text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Login
              </button>
            </form>
            <p className="text-gray-400 text-md text-center mt-6">
              Don't have an account?{" "}
              <a href="/register" className="text-gray-200 hover:underline">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
