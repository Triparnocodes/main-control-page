

// import { useEffect, useRef, useState } from "react";
// import RealtimeMonitoring from "./RealtimeMonitoring";
// import WeatherSafety from "./WeatherSafety";
// import FaultMonitor from "./FaultMonitor";
// import FaultHistory from "./FaultHistory";

// export default function DashboardPage() {
//   // 📌 Read stored user profile
//   const username = localStorage.getItem("username") || "Operator";
//   const userId = localStorage.getItem("userId") || "N/A";
//   const stationId = localStorage.getItem("stationId") || "N/A";

//   // 📊 Shared live readings (used across dashboard)
//   const [readings, setReadings] = useState([
//     { time: "10s", current: 5, voltage: 230 },
//     { time: "20s", current: 7, voltage: 229 },
//     { time: "30s", current: 4, voltage: 230 },
//     { time: "40s", current: 9, voltage: 228 },
//     { time: "50s", current: 6, voltage: 228 },
//   ]);

//   // 🧾 Fault history: persistent via localStorage
//   const [faultHistory, setFaultHistory] = useState(() => {
//     return JSON.parse(localStorage.getItem("faultHistory")) || [];
//   });

//   const lastRiskyRef = useRef(false); // detects transition from safe → risky

//   // 🔁 Simulated live updates (later replaced with Arduino Serial/WebUSB fetch)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setReadings(prev => {
//         const nextIndex = prev.length + 1;
//         const nextTime = `${nextIndex * 10}s`;

//         const current = parseFloat((Math.random() * 10).toFixed(2));

//         const isFault = Math.random() < 0.05; // ⚠ 5% chance of 0V fault
//         const voltage = isFault
//           ? 0
//           : 228 + (Math.random() * 2 - 1); 

//         const newPoint = {
//           time: nextTime,
//           current,
//           voltage: parseFloat(voltage.toFixed(2)),
//         };

//         // Keep latest 20
//         const updated = [...prev, newPoint];
//         return updated.length > 20 ? updated.slice(-20) : updated;
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   const latest = readings[readings.length - 1];

//   // 🚨 Fault detection + log to history
//   useEffect(() => {
//     if (!latest) return;

//     const { current, voltage } = latest;

//     const currentZero = current <= 0.1;
//     const voltageZero = voltage <= 1;
//     const voltagePresent = voltage > 10;

//     const isRisky =
//       (currentZero && voltagePresent) || voltageZero;

//     if (isRisky && !lastRiskyRef.current) {
//       const reason = voltageZero
//         ? "Voltage dropped to 0V — Possible short circuit."
//         : "Current is 0A while voltage exists — Possible line break / open circuit.";

//       const newEvent = {
//         id: Date.now(),
//         timestamp: new Date().toLocaleString("en-IN", { hour12: false }),
//         current,
//         voltage,
//         reason
//       };

//       setFaultHistory(prev => {
//         const updated = [newEvent, ...prev].slice(0, 20);
//         localStorage.setItem("faultHistory", JSON.stringify(updated));
//         return updated;
//       });
//     }

//     lastRiskyRef.current = isRisky;

//   }, [latest]);

  
//   return (
//   <div className="min-h-screen w-full px-10 py-10 text-white">

//     {/* Center content wrapper */}
//     <div className="max-w-6xl  space-y-10"> 

//       {/* 🧑‍💻 User Header */}
//       <div className="flex flex-col gap-1">
//         <h1 className="text-3xl font-semibold">👋 Hello, {username}!</h1>
//         <p className="text-gray-300 text-sm">
//           User ID: <span className="text-blue-400">{userId}</span> ·
//           Substation: <span className="text-green-400">{stationId}</span>
//         </p>
//       </div>

//       {/* Metrics Section - aligned properly */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <FaultMonitor current={latest.current} voltage={latest.voltage} />
//       </div>

//       {/* Live Graphs Section */}
//       <RealtimeMonitoring readings={readings} />

//       {/* Fault History */}
//       <FaultHistory events={faultHistory} />

//       {/* Weather */}
//       <WeatherSafety />
//     </div>
//   </div>
// );

// }

import { useEffect, useRef, useState } from "react";
import RealtimeMonitoring from "./RealtimeMonitoring";
import WeatherSafety from "./WeatherSafety";
import FaultMonitor from "./FaultMonitor";
import FaultHistory from "./FaultHistory";

export default function DashboardPage() {

  // 📌 Read logged-in user data from localStorage
  const auth = JSON.parse(localStorage.getItem("auth")) || {};

  const username = auth.userId || "Operator";
  const userId = auth.userId || "N/A";
  const stationId = auth.substationId || "N/A";

  // 📊 Shared live readings (used across dashboard)
  const [readings, setReadings] = useState([
    { time: "10s", current: 5, voltage: 230 },
    { time: "20s", current: 7, voltage: 229 },
    { time: "30s", current: 4, voltage: 230 },
    { time: "40s", current: 9, voltage: 228 },
    { time: "50s", current: 6, voltage: 228 },
  ]);

  // 🧾 Fault history: persistent via localStorage
  const [faultHistory, setFaultHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("faultHistory")) || [];
  });

  const lastRiskyRef = useRef(false); // detects transition from safe → risky

  // 🔁 Simulated live updates (later replaced with Arduino Serial/WebUSB fetch)
  useEffect(() => {
    const interval = setInterval(() => {
      setReadings(prev => {
        const nextIndex = prev.length + 1;
        const nextTime = `${nextIndex * 10}s`;

        const current = parseFloat((Math.random() * 10).toFixed(2));
        const isFault = Math.random() < 0.05; 
        const voltage = isFault ? 0 : 228 + (Math.random() * 2 - 1);

        const newPoint = {
          time: nextTime,
          current,
          voltage: parseFloat(voltage.toFixed(2)),
        };

        const updated = [...prev, newPoint];
        return updated.length > 20 ? updated.slice(-20) : updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const latest = readings[readings.length - 1];

  // 🚨 Fault detection + log to history
  useEffect(() => {
    if (!latest) return;

    const { current, voltage } = latest;

    const currentZero = current <= 0.1;
    const voltageZero = voltage <= 1;
    const voltagePresent = voltage > 10;

    const isRisky = (currentZero && voltagePresent) || voltageZero;

    if (isRisky && !lastRiskyRef.current) {
      const reason = voltageZero
        ? "Voltage dropped to 0V — Possible short circuit."
        : "Current is 0A while voltage exists — Possible line break / open circuit.";

      const newEvent = {
        id: Date.now(),
        timestamp: new Date().toLocaleString("en-IN", { hour12: false }),
        current,
        voltage,
        reason
      };

      setFaultHistory(prev => {
        const updated = [newEvent, ...prev].slice(0, 20);
        localStorage.setItem("faultHistory", JSON.stringify(updated));
        return updated;
      });
    }

    lastRiskyRef.current = isRisky;
  }, [latest]);


  return (
    <div className="min-h-screen w-full px-10 py-10 text-white">

      {/* Center wrapper */}
      <div className="max-w-6xl space-y-10">

        {/* 🧑‍💻 User Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold">👋 Hello, {username}!</h1>
          <p className="text-gray-300 text-sm">
            User ID: <span className="text-blue-400">{userId}</span> ·
            Substation: <span className="text-green-400">{stationId}</span>
          </p>
        </div>


        {/* Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FaultMonitor current={latest.current} voltage={latest.voltage} />
        </div>


        {/* Live Graphs Section */}
        <RealtimeMonitoring readings={readings} />

        {/* Fault History */}
        <FaultHistory events={faultHistory} />

        {/* Weather */}
        <WeatherSafety />

      </div>
    </div>
  );
}
