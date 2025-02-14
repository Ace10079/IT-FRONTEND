import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "./host"; // Import API URL

function Login() {
  const [role, setRole] = useState("teacher"); // Default role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/login`, { email, password, role });
      localStorage.setItem("token", response.data.token);
      setSuccess("Login successful!");
      setError("");

      setTimeout(() => {
        if (role === "hod") {
          navigate("/hod-dashboard"); // Redirect HOD to a different page
        } else {
          navigate("/projects"); // Redirect teacher to projects
        }
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }}>
      <h1 className="text-3xl font-bold text-white px-6 py-2 rounded-lg mb-6">Digital IT Projects</h1>

      <div className="text-white p-6 rounded-lg shadow-lg w-80">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <form className="flex flex-col" onSubmit={handleLogin}>
          <label className="font-medium font-bold">Role</label>
          <select className="mt-1 mb-3 p-2 border rounded-lg bg-white text-black" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="teacher">Teacher</option>
            <option value="hod">HOD</option>
          </select>

          <label className="font-medium font-bold">Email ID</label>
          <input type="email" placeholder="Enter your email" className="mt-1 mb-3 p-2 border rounded-lg bg-white text-black"
            value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label className="font-medium font-bold">Password</label>
          <input type="password" placeholder="Enter your password" className="mt-1 mb-3 p-2 border rounded-lg bg-white text-black"
            value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" className="bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-300">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
