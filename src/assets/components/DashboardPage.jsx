

// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import RealtimeMonitoring from "./RealtimeMonitoring";
// import WeatherSafety from "./WeatherSafety";
// import FaultMonitor from "./FaultMonitor";
// import FaultHistory from "./FaultHistory";

// export default function DashboardPage() {
//   const navigate = useNavigate();

//   // 🔐 Auth info
//   const auth = JSON.parse(localStorage.getItem("auth")) || null;
//   const token = auth?.token || null;

//   // UI user info
//   const [profile, setProfile] = useState({
//     userId: auth?.userId || "Loading...",
//     stationId: auth?.substationId || "Loading...",
//   });

//   // Live readings for graph + cards
//   const [readings, setReadings] = useState([]);
//   const [faultHistory, setFaultHistory] = useState(() => {
//     return JSON.parse(localStorage.getItem("faultHistory")) || [];
//   });

//   const lastRiskyRef = useRef(false);

//   // 🔁 Poll backend for live current/voltage
//   useEffect(() => {
//     if (!token) {
//       navigate("/");
//       return;
//     }

//     const fetchDashboard = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/api/dashboard", {
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ FIX: proper template string
//           },
//         });

//         if (res.status === 401) {
//           // Token invalid → logout
//           localStorage.removeItem("auth");
//           navigate("/");
//           return;
//         }

//         const data = await res.json();

//         const current = typeof data.current_reading === "number" ? data.current_reading : 0;
//         const voltage = typeof data.voltage_reading === "number" ? data.voltage_reading : 0;

//         setProfile({
//           userId: auth.userId,
//           stationId: auth.substationId,
//         });

//         setReadings((prev) => {
//           const nextIndex = prev.length + 1;
//           const nextTime = `${nextIndex * 1}s`; // 3s interval

//           const newPoint = {
//             time: nextTime,
//             current,
//             voltage,
//           };

//           const updated = [...prev, newPoint];
//           return updated.length > 50 ? updated.slice(-50) : updated;
//         });

//         // Later we can use data.logs to show backend fault history.
//       } catch (err) {
//         console.error("Dashboard fetch error:", err);
//       }
//     };

//     // First call immediately
//     fetchDashboard();
//     const interval = setInterval(fetchDashboard, 3000);
//     return () => clearInterval(interval);
//   }, [token, navigate]);

//   // Latest reading for cards / logic
//   const latest = readings.length
//     ? readings[readings.length - 1]
//     : { current: 0, voltage: 0 };

//   // 🚨 Keep your existing front-end fault detection logic
//   useEffect(() => {
//     if (!latest) return;

//     const { current, voltage } = latest;

//     const currentZero = current <= 0.1;
//     const voltageZero = voltage <= 1;
//     const voltagePresent = voltage > 10;

//     const isRisky = (currentZero && voltagePresent) || voltageZero;

//     if (isRisky && !lastRiskyRef.current) {
//       const reason = voltageZero
//         ? "Voltage dropped to 0V — Possible short circuit."
//         : "Current is 0A while voltage exists — Possible line break / open circuit.";

//       const newEvent = {
//         id: Date.now(),
//         timestamp: new Date().toLocaleString("en-IN", { hour12: false }),
//         current,
//         voltage,
//         reason,
//       };

//       setFaultHistory((prev) => {
//         const updated = [newEvent, ...prev].slice(0, 20);
//         localStorage.setItem("faultHistory", JSON.stringify(updated));
//         return updated;
//       });
//     }

//     lastRiskyRef.current = isRisky;
//   }, [latest]);

//   return (
//     <div className="min-h-screen w-full px-10 py-10 text-white">
//       {/* Center wrapper */}
//       <div className="max-w-6xl space-y-10">
//         {/* 🧑‍💻 User Header */}
//         <div className="flex flex-col gap-1">
//           <h1 className="text-3xl font-semibold">👋 Hello, {profile.userId}!</h1>
//           <p className="text-gray-300 text-sm">
//             User ID: <span className="text-blue-400">{profile.userId}</span> ·
//             Substation: <span className="text-green-400">{profile.stationId}</span>
//           </p>
//         </div>

//         {/* Metrics Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <FaultMonitor current={latest.current} voltage={latest.voltage} />
//         </div>

//         {/* Live Graphs Section */}
//         <RealtimeMonitoring readings={readings} />

//         {/* Fault History */}
//         <FaultHistory events={faultHistory} />

//         {/* Weather */}
//         <WeatherSafety />
//       </div>
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RealtimeMonitoring from "./RealtimeMonitoring";
import WeatherSafety from "./WeatherSafety";
import FaultMonitor from "./FaultMonitor";
import FaultHistory from "./FaultHistory";

export default function DashboardPage() {
  const navigate = useNavigate();

  // 🔐 Auth
  const auth = JSON.parse(localStorage.getItem("auth")) || null;
  const token = auth?.token;

  // 👤 User Display
  const [profile] = useState({
    userId: auth?.userId || "Unknown",
    stationId: auth?.substationId || "Unknown",
  });

  // 📈 Live Readings + Fault Log
  const [readings, setReadings] = useState([]);
  const [faultHistory, setFaultHistory] = useState(
    JSON.parse(localStorage.getItem("faultHistory")) || []
  );

  const lastRiskyRef = useRef(false);

  // 🔁 Fetch Live Backend Data
  useEffect(() => {
    if (!token) return navigate("/");

    const fetchLiveMetrics = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          localStorage.removeItem("auth");
          navigate("/");
          return;
        }

        const data = await res.json();

        const current = Number(data.current_reading || 0);
        const voltage = Number(data.voltage_reading || 0);

        setReadings((prev) => {
          const entry = {
            time: `${(prev.length + 1) * 3}s`,
            current,
            voltage,
          };
          return [...prev.slice(-49), entry];
        });
      } catch (err) {
        console.log("⚠ Dashboard fetch error:", err);
      }
    };

    fetchLiveMetrics();
    const interval = setInterval(fetchLiveMetrics, 3000);
    return () => clearInterval(interval);
  }, [token, navigate]);

  // 📌 Latest Live Value
  const latest = readings.at(-1) || { current: 0, voltage: 0 };

  // 🚨 Local UI Fault Detection (optional)
  useEffect(() => {
    const { current, voltage } = latest;
    const currentZero = current <= 0.1;
    const voltageZero = voltage <= 1;
    const voltagePresent = voltage > 10;

    const isFault = (currentZero && voltagePresent) || voltageZero;

    if (isFault && !lastRiskyRef.current) {
      const reason = voltageZero
        ? "⚡ Voltage dropped to 0V — Possible short circuit."
        : "🔌 Current is 0A while voltage exists — Possible open circuit or conductor break.";

      const newLog = {
        id: Date.now(),
        timestamp: new Date().toLocaleString("en-IN", { hour12: false }),
        current,
        voltage,
        reason,
      };

      setFaultHistory((prev) => {
        const updated = [newLog, ...prev].slice(0, 25);
        localStorage.setItem("faultHistory", JSON.stringify(updated));
        return updated;
      });
    }

    lastRiskyRef.current = isFault;
  }, [latest]);

  return (
    <div className="min-h-screen w-full px-10 py-10 text-white">
      <div className="max-w-6xl space-y-10">
        {/* 👤 User Header */}
        <header>
          <h1 className="text-3xl font-semibold">👋 Hello, {profile.userId}!</h1>
          <p className="text-gray-300 text-sm">
            Substation:{" "}
            <span className="text-green-400">{profile.stationId}</span>
          </p>
        </header>

        {/* 📊 Key Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FaultMonitor current={latest.current} voltage={latest.voltage} />
        </div>

        {/* 📈 Graph Section */}
        <RealtimeMonitoring readings={readings} />

        {/* 🧾 Fault Log History */}
        <FaultHistory events={faultHistory} />

        {/* ☁ Weather */}
        <WeatherSafety />
      </div>
    </div>
  );
}

