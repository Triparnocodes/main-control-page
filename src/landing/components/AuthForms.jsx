

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const features = [
//   { icon: "⚡", title: "Monitoring", desc: "Live grid updates" },
//   { icon: "📊", title: "Dashboard", desc: "Smart analytics" },
//   { icon: "🔔", title: "Alerts", desc: "Instant warnings" },
//   { icon: "🗺️", title: "Maps", desc: "Grid visualization" },
// ];

// export default function AuthForms() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const auth = JSON.parse(localStorage.getItem("auth"));
//     if (auth?.token) navigate("/dashboard");
//   }, []);

//   const [formData, setFormData] = useState({
//     substationId: "",
//     userId: "",
//     password: "",
//   });

//   const handleChange = (e) =>
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!formData.substationId || !formData.userId || !formData.password) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     localStorage.setItem(
//       "auth",
//       JSON.stringify({
//         ...formData,
//         token: "voltflow_" + Math.random().toString(36).slice(2),
//       })
//     );

//     navigate("/dashboard");
//   };

//   return (
//     <div className="text-white w-full">
//       {/* Heading */}
//       <div className="text-center mb-6">
//         <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
//         <p className="text-gray-400 text-sm mt-1">
//           Access your power grid dashboard
//         </p>
//       </div>

//       {/* FORM */}
//       <form onSubmit={handleSubmit} className="space-y-5">

//         {["substationId", "userId", "password"].map((field, i) => (
//           <div key={i}>
//             <label className="block text-sm mb-1 capitalize text-gray-300">
//               {field.replace("Id", " ID")}
//             </label>
//             <input
//               type={field === "password" ? "password" : "text"}
//               name={field}
//               value={formData[field]}
//               onChange={handleChange}
//               placeholder={
//                 field === "substationId"
//                   ? "e.g. SS-001-NORTH"
//                   : field === "userId"
//                   ? "Enter your ID"
//                   : "Enter password"
//               }
//               required
//               className="
//                 w-full px-4 py-3 rounded-lg bg-[#121826] border border-gray-700 
//                 focus:ring-2 focus:ring-blue-500 focus:border-blue-400
//                 placeholder-gray-500 transition-all outline-none
//                 text-white
//               "
//             />
//           </div>
//         ))}

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-bold tracking-wide shadow-lg shadow-blue-600/30"
//         >
//           Sign In to Dashboard
//         </button>
//       </form>

//       {/* Features */}
//       <div className="mt-8">
//         <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-3">
//           Platform Features
//         </h3>
//         <div className="grid grid-cols-2 gap-3">
//           {features.map((f, i) => (
//             <div
//               key={i}
//               className="border border-gray-800 bg-[#101520] p-3 rounded-lg hover:border-blue-500 transition"
//             >
//               <div className="text-lg">{f.icon}</div>
//               <h4 className="font-semibold text-sm">{f.title}</h4>
//               <p className="text-xs text-gray-400">{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Footer note */}
//       <p className="text-center text-xs text-gray-500 mt-6">
//         🔐 Secured with AES-256 encryption
//       </p>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: "⚡", title: "Monitoring", desc: "Live grid updates" },
  { icon: "📊", title: "Dashboard", desc: "Smart analytics" },
  { icon: "🔔", title: "Alerts", desc: "Instant warnings" },
  { icon: "🗺️", title: "Maps", desc: "Grid visualization" },
];

export default function AuthForms() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) navigate("/dashboard");
  }, []);

  const [formData, setFormData] = useState({
    substationId: "",
    userId: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.substationId || !formData.userId || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Backend login call
      const response = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: formData.userId, // FASTAPI expects "username"
          password: formData.password,
        }),
      });

      if (!response.ok) {
        alert("❌ Incorrect credentials. Try again.");
        return;
      }

      const data = await response.json();

      // Save complete login session
      localStorage.setItem(
        "auth",
        JSON.stringify({
          token: data.access_token,
          role: data.role,
          isRegistered: data.is_registered,
          substationId: formData.substationId,
          userId: formData.userId,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("⚠ Server not reachable. Start FastAPI backend first.");
    }
  };

  return (
    <div className="text-white w-full">
      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
        <p className="text-gray-400 text-sm mt-1">
          Access your power grid dashboard
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {["substationId", "userId", "password"].map((field, i) => (
          <div key={i}>
            <label className="block text-sm mb-1 capitalize text-gray-300">
              {field.replace("Id", " ID")}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={
                field === "substationId"
                  ? "e.g. SS-001-NORTH"
                  : field === "userId"
                  ? "Enter your ID"
                  : "Enter password"
              }
              required
              className="
                w-full px-4 py-3 rounded-lg bg-[#121826] border border-gray-700 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-400
                placeholder-gray-500 transition-all outline-none
                text-white
              "
            />
          </div>
        ))}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-bold tracking-wide shadow-lg shadow-blue-600/30"
        >
          Sign In to Dashboard
        </button>
      </form>

      {/* Features */}
      <div className="mt-8">
        <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-3">
          Platform Features
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="border border-gray-800 bg-[#101520] p-3 rounded-lg hover:border-blue-500 transition"
            >
              <div className="text-lg">{f.icon}</div>
              <h4 className="font-semibold text-sm">{f.title}</h4>
              <p className="text-xs text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p className="text-center text-xs text-gray-500 mt-6">
        🔐 Secured with AES-256 encryption
      </p>
    </div>
  );
}

// import { useState } from "react";

// export default function AuthForms() {
//   const [formData, setFormData] = useState({
//     substationId: "",
//     userId: "",
//     password: "",
//   });

//   const apiBase = "http://127.0.0.1:8000"; // <-- FastAPI URL

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const body = new URLSearchParams();
//     body.append("username", formData.userId);
//     body.append("password", formData.password);

//     try {
//       const res = await fetch(`${apiBase}/token`, {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body,
//       });

//       if (!res.ok) {
//         alert("Login Failed — Invalid Credentials");
//         return;
//       }

//       const data = await res.json();

//       // Save token & basic identity
//       localStorage.setItem("token", data.access_token);
//       localStorage.setItem("role", data.role);
//       localStorage.setItem("is_registered", data.is_registered);
//       localStorage.setItem("userid", formData.userId);
//       localStorage.setItem("substationId", formData.substationId);

//       // Redirect to dashboard
//       window.location.href = "/dashboard";

//     } catch (err) {
//       console.error(err);
//       alert("Server unreachable — ensure backend is running.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
      
//       <input
//         type="text"
//         name="substationId"
//         placeholder="Substation ID"
//         value={formData.substationId}
//         onChange={handleChange}
//         required
//         className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg"
//       />

//       <input
//         type="text"
//         name="userId"
//         placeholder="User ID"
//         value={formData.userId}
//         onChange={handleChange}
//         required
//         className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg"
//       />

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//         required
//         className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg"
//       />

//       <button
//         type="submit"
//         className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-semibold"
//       >
//         Sign In
//       </button>
//     </form>
//   );
// }
