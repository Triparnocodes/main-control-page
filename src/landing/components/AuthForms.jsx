

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const features = [
//   { icon: "⚡", title: "Real-time Monitoring", desc: "Live grid status updates" },
//   { icon: "📊", title: "Analytics Dashboard", desc: "Consumption insights" },
//   { icon: "🔔", title: "Alert System", desc: "Instant fault notifications" },
//   { icon: "🗺️", title: "Grid Mapping", desc: "Interactive network maps" },
//   { icon: "📱", title: "Mobile Access", desc: "Monitor on the go" },
//   { icon: "🔒", title: "Secure Access", desc: "256-bit encryption" },
//   { icon: "📈", title: "Load Forecasting", desc: "AI-powered predictions" },
//   { icon: "🛠️", title: "Maintenance Logs", desc: "Track all repairs" },
// ];

// export default function AuthForms() {
//   const navigate = useNavigate();

//   // 🔒 If already logged in, don't show login page – go to dashboard
//   useEffect(() => {
//     const auth = JSON.parse(localStorage.getItem("auth"));
//     if (auth?.token) {
//       navigate("/dashboard");
//     }
//   }, [navigate]);

//   const [formData, setFormData] = useState({
//     substationId: "",
//     userId: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     if (e && e.preventDefault) e.preventDefault();

//     // Basic validation
//     if (!formData.substationId || !formData.userId || !formData.password) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     // Fake login auth object
//     const authData = {
//       userId: formData.userId,
//       substationId: formData.substationId,
//       token: "voltflow_" + Math.random().toString(36).slice(2),
//       loggedAt: new Date().toISOString(),
//     };

//     // Save login to storage
//     localStorage.setItem("auth", JSON.stringify(authData));

//     // Navigate to dashboard
//     navigate("/dashboard");
//   };

//   return (
//     <div className="flex h-full w-full flex-col items-center justify-start py-8 px-6 lg:px-12 overflow-y-auto">
//       <div className="w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-6">
//           <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
//             Welcome Back
//           </h2>
//           <p className="text-muted-foreground">
//             Access your power distribution dashboard
//           </p>
//         </div>

//         {/* FORM */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-foreground mb-2">
//               Substation ID
//             </label>
//             <input
//               type="text"
//               name="substationId"
//               value={formData.substationId}
//               onChange={handleChange}
//               placeholder="e.g., SS-001-NORTH"
//               required
//               className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-foreground mb-2">
//               User ID
//             </label>
//             <input
//               type="text"
//               name="userId"
//               value={formData.userId}
//               onChange={handleChange}
//               required
//               placeholder="Enter your user ID"
//               className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-foreground mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full btn-electric text-base mt-4 font-black bg-zinc-950"
//           >
//             Sign In to Dashboard
//           </button>
//         </form>
//       </div>

//       {/* Features Section */}
//       <div className="mt-8">
//         <h3 className="text-center text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
//           Platform Features
//         </h3>
//         <div className="grid grid-cols-2 gap-3">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="group p-3 rounded-lg bg-secondary/50 border border-border/50 hover:border-primary/50 hover:bg-secondary transition-all duration-300 cursor-default"
//             >
//               <div className="text-xl mb-1">{feature.icon}</div>
//               <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
//                 {feature.title}
//               </h4>
//               <p className="text-xs text-muted-foreground">{feature.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Security note */}
//       <div className="mt-6 p-3 rounded-lg bg-secondary/50 border border-border/50">
//         <div className="flex items-center gap-3">
//           <svg
//             className="w-5 h-5 text-primary flex-shrink-0"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//             />
//           </svg>
//           <div>
//             <p className="text-sm font-medium text-foreground">Secure Connection</p>
//             <p className="text-xs text-muted-foreground">
//               Your data is encrypted with 256-bit SSL
//             </p>
//           </div>
//         </div>
//       </div>
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
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.token) navigate("/dashboard");
  }, []);

  const [formData, setFormData] = useState({
    substationId: "",
    userId: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.substationId || !formData.userId || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    localStorage.setItem(
      "auth",
      JSON.stringify({
        ...formData,
        token: "voltflow_" + Math.random().toString(36).slice(2),
      })
    );

    navigate("/dashboard");
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
