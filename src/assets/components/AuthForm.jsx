import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ isRegister, toggle }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    email: "",
    password: "",
    confirm: "",
    substation: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ⭐ LocalStorage helper
  const saveUser = (user) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password || !form.employeeId) {
      alert("Fill all required fields!");
      return;
    }

    if (form.password !== form.confirm) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password,
      stationId: form.substation || "STN-" + Math.floor(Math.random() * 999),
      userId: "USR-" + Math.floor(Math.random() * 9999),
    };

    saveUser(newUser);

    alert("Account created! You can login now.");
    toggle(); // Switch to login
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const found = users.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (!found) {
      alert("Invalid credentials!");
      return;
    }

    // Store active session
    localStorage.setItem("token", "ACTIVE");
    localStorage.setItem("username", found.name);
    localStorage.setItem("userId", found.userId);
    localStorage.setItem("stationId", found.stationId);

    navigate("/dashboard");
  };

  return (
    <div className="w-[450px] bg-[#0b1524] rounded-xl p-10 shadow-[0_0_30px_rgba(0,255,255,0.2)] border border-cyan-500/20">

      <h1 className="text-3xl font-bold text-center">
        {isRegister ? "Officer Registration" : "Login"}
      </h1>

      <p className="text-gray-400 text-center mt-1">
        {isRegister ? "Create your Control System Identity" : "Access Dashboard"}
      </p>

      {/* FORM FIELDS */}
      <div className="mt-8 space-y-4">

        {isRegister && (
          <>
            <input name="name" placeholder="Full Name" onChange={handleChange} className="auth-input" />
            <input name="employeeId" placeholder="Employee ID" onChange={handleChange} className="auth-input" />
            <input name="substation" placeholder="Substation ID (Optional)" onChange={handleChange} className="auth-input" />
          </>
        )}

        <input name="email" placeholder="Email" onChange={handleChange} className="auth-input" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="auth-input" />

        {isRegister && (
          <input name="confirm" type="password" placeholder="Confirm Password" onChange={handleChange} className="auth-input" />
        )}
      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={isRegister ? handleRegister : handleLogin}
        className="mt-6 w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-black rounded-lg font-bold transition-all duration-200"
      >
        {isRegister ? "Create Account" : "Login"}
      </button>

      {/* SWITCH TO LOGIN/REGISTER */}
      <p className="mt-4 text-center text-sm text-gray-400">
        {isRegister ? "Already have an account? " : "Don't have an account? "}
        <span onClick={toggle} className="text-cyan-400 cursor-pointer hover:underline">
          {isRegister ? "Sign in" : "Register"}
        </span>
      </p>
    </div>
  );
}
