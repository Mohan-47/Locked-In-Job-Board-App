import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import ApplyJob from "./pages/ApplyJob";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJob from "./pages/PostJob";
import RecruiterProfile from "./pages/RecruiterProfile";
import Messages from "./pages/Messages";
import ManageJob from "./pages/ManageJobs";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Toaster
        position="top-center" // You can change this position (e.g., "bottom-right")
        reverseOrder={false}
        gutter={8} // Space between toasts
        toastOptions={{
          // Default options for all toasts
          className: "px-4 py-3 rounded-lg shadow-lg flex items-center", // Added padding and shadow
          duration: 3000,
          style: {
            background: "hsl(240, 4%, 22%)", // zinc-800
            color: "hsl(240, 4%, 92%)", // zinc-100
            border: "1px solid hsl(320, 100%, 40%)", // fuchsia-700 border
            fontSize: "1rem",
            padding: "12px 16px", // Slightly more padding
          },
          // Specific options for success toasts
          success: {
            duration: 3000,
            iconTheme: {
              primary: "hsl(240, 4%, 92%)", // zinc-100
              secondary: "hsl(140, 80%, 32%)", // green-700 for icon fill
            },
            style: {
              background: "hsla(139, 54.70%, 10.40%, 0.77)", // green-700
              color: "hsl(240, 4%, 92%)", // zinc-100
              border: "1px solid hsl(140, 80%, 25%)", // darker green border
            },
          },
          // Specific options for error toasts
          error: {
            duration: 4000,
            iconTheme: {
              primary: "hsl(240, 4%, 92%)", // zinc-100
              secondary: "hsl(0, 80%, 42%)", // red-700 for icon fill
            },
            style: {
              background: "hsla(0, 80.40%, 42.00%, 0.24)", // red-700
              color: "hsl(240, 4%, 92%)", // zinc-100
              border: "1px solid hsl(0, 80%, 35%)", // darker red border
            },
          },
          // Specific options for loading toasts
          loading: {
            duration: Infinity, // Loading toasts usually stay indefinitely until updated
            style: {
              background: "hsla(240, 11.10%, 10.60%, 0.22)", // zinc-700
              color: "hsl(240, 4%, 92%)", // zinc-100
              border: "1px solid hsl(290, 100.00%, 50.00%)", // fuchsia-500 border
            },
            iconTheme: {
              primary: "hsl(320, 100%, 50%)", // fuchsia-500
              secondary: "hsl(240, 4%, 92%)", // zinc-100
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/apply-job" element={<ApplyJob />} />
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/post-job" element={<PostJob />} />
        <Route path="/recruiter/profile" element={<RecruiterProfile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/recruiter/job/:jobId/manage" element={<ManageJob />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
