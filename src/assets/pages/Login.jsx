// src/assets/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !pass) {
      alert("Please enter email and password");
      return;
    }

    // Fake login: store token + user details in localStorage
    localStorage.setItem("token", "LOGGED_IN");
    localStorage.setItem("username", email.split("@")[0]);
    localStorage.setItem("userId", "USR-" + Math.floor(Math.random() * 10000));
    localStorage.setItem("stationId", "STN-" + Math.floor(Math.random() * 1000));

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816] text-white">
      <div className="bg-[#111827] w-80 p-6 rounded-xl shadow-xl space-y-4">
        <h1 className="text-xl font-semibold text-center mb-2">Control Panel Login</h1>

        <input
          className="w-full bg-gray-700 px-3 py-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full bg-gray-700 px-3 py-2 rounded"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded mt-2"
          onClick={handleLogin}
        >
          Login
        </button>

        <button
          className="w-full text-xs text-gray-400 mt-2 underline"
          onClick={() => navigate("/register")}
        >
          New user? Register
        </button>
      </div>
    </div>
  );
}
