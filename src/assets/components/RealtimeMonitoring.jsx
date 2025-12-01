
// import { Line } from "react-chartjs-2";

// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Filler
// } from "chart.js";

// // REGISTER ALL REQUIRED ELEMENTS
// ChartJS.register(
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Filler
// );

// export default function RealtimeMonitoring() {
//   const data = {
//     labels: ["10s", "20s", "30s", "40s", "50s"],
//     datasets: [
//       {
//         label: "Voltage",
//         data: [390, 392, 395, 397, 394],
//         borderColor: "rgba(0, 200, 255, 0.9)",
//         backgroundColor: "rgba(0, 200, 255, 0.3)",
//         borderWidth: 2,
//         fill: true,
//         tension: 0.4
//       }
//     ]
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         ticks: { color: "#ccc" },
//         grid: { color: "rgba(255,255,255,0.1)" }
//       },
//       x: {
//         ticks: { color: "#ccc" },
//         grid: { color: "rgba(255,255,255,0.1)" }
//       }
//     },
//     plugins: {
//       legend: {
//         labels: {
//           color: "#fff"
//         }
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold text-white mb-3">
//         Real-Time Monitoring
//       </h2>

//       <div className="bg-[#111827] p-6 rounded-xl h-64">
//         <Line data={data} options={options} />
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";

// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Filler
// } from "chart.js";

// // REGISTER ALL REQUIRED ELEMENTS
// ChartJS.register(
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Filler
// );

// export default function RealtimeMonitoring() {
//   // ---- Mock live data structure (replace later with Arduino API) ----
//   const [readings, setReadings] = useState([
//     { time: "10s", current: 5, voltage: 230 },
//     { time: "20s", current: 7, voltage: 229 },
//     { time: "30s", current: 4, voltage: 230 },
//     { time: "40s", current: 9, voltage: 228 },
//     { time: "50s", current: 6, voltage: 228 }
//   ]);

//   // OPTIONAL: Simulate live update every 3 seconds (replace with backend polling later)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setReadings(prev => [
//         ...prev.slice(-19),
//         {
//           time: `${prev.length * 10}s`,
//           current: Math.random() * 10,  // fluctuating current
//           voltage: 228 + (Math.random() > 0.96 ? -200 : 0) // rare spike drop to simulate fault
//         }
//       ]);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   // ----- Extract chart data -----
//   const labels = readings.map(r => r.time);

//   const currentGraphData = {
//     labels,
//     datasets: [
//       {
//         label: "Current (A)",
//         data: readings.map(r => r.current),
//         borderColor: "rgba(0, 200, 255, 0.9)",
//         backgroundColor: "rgba(0, 200, 255, 0.3)",
//         borderWidth: 2,
//         fill: true,
//         tension: 0.4
//       }
//     ]
//   };

//   const voltageGraphData = {
//     labels,
//     datasets: [
//       {
//         label: "Voltage (V)",
//         data: readings.map(r => r.voltage),
//         borderColor: "rgba(255, 220, 70, 0.9)",
//         backgroundColor: "rgba(255, 220, 70, 0.25)",
//         borderWidth: 2,
//         fill: true,
//         tension: 0.25 // smoother & flatter
//       }
//     ]
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         ticks: { color: "#ccc" },
//         grid: { color: "rgba(255,255,255,0.1)" }
//       },
//       x: {
//         ticks: { color: "#ccc" },
//         grid: { color: "rgba(255,255,255,0.1)" }
//       }
//     },
//     plugins: {
//       legend: {
//         labels: { color: "#fff" }
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold text-white mb-4">
//         Real-Time Monitoring
//       </h2>

//       {/* Two graphs side-by-side (stack on small screens) */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Current Graph */}
//         <div className="bg-[#111827] p-6 rounded-xl h-64">
//           <h3 className="text-gray-300 text-sm mb-2">Current Trend (Live)</h3>
//           <Line data={currentGraphData} options={options} />
//         </div>

//         {/* Voltage Graph */}
//         <div className="bg-[#111827] p-6 rounded-xl h-64">
//           <h3 className="text-gray-300 text-sm mb-2">Voltage Trend (Live)</h3>
//           <Line data={voltageGraphData} options={options} />
//         </div>

//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";

// // REGISTER ALL REQUIRED ELEMENTS
// ChartJS.register(
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Filler
// );

// export default function RealtimeMonitoring() {
//   // readings: array of { time, current, voltage }
//   const [readings, setReadings] = useState([
//     { time: "10s", current: 5, voltage: 230 },
//     { time: "20s", current: 7, voltage: 229 },
//     { time: "30s", current: 4, voltage: 230 },
//     { time: "40s", current: 9, voltage: 228 },
//     { time: "50s", current: 6, voltage: 228 },
//   ]);

//   // 🔁 Simulate live updates now (replace with backend polling later)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setReadings((prev) => {
//         const lastIndex = prev.length;
//         const nextTime = `${(lastIndex + 1) * 10}s`;

//         // Simulate:
//         // - current: fluctuates a lot
//         // - voltage: mostly stable (~228–230V) with rare drop to 0 to mimic short circuit
//         const current = parseFloat((Math.random() * 10).toFixed(2));
//         const isFaultEvent = Math.random() < 0.05; // 5% chance of short-circuit
//         const voltage = isFaultEvent ? 0 : 228 + (Math.random() * 2 - 1); // around 228–230

//         const next = {
//           time: nextTime,
//           current,
//           voltage: parseFloat(voltage.toFixed(2)),
//         };

//         const updated = [...prev, next];
//         // Keep only last 20 points
//         return updated.length > 20 ? updated.slice(updated.length - 20) : updated;
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   const latest = readings[readings.length - 1] || {
//     time: "0s",
//     current: 0,
//     voltage: 0,
//   };

//   // ⚠️ Fault / condition logic
//   const isVoltageZero = latest.voltage <= 1;
//   const isCurrentZeroAndVoltagePresent = latest.current <= 0.1 && latest.voltage > 10;

//   const isFault = isVoltageZero || isCurrentZeroAndVoltagePresent;

//   const conditionText = isFault ? "Fault detected" : "Stable";
//   const conditionColor = isFault ? "text-red-400" : "text-emerald-400";
//   const ledColor = isFault ? "bg-red-500" : "bg-emerald-400";
//   const ledPulse = isFault ? "animate-pulse" : "";

//   // ----- Charts -----
//   const labels = readings.map((r) => r.time);

//   const currentGraphData = {
//     labels,
//     datasets: [
//       {
//         label: "Current (A)",
//         data: readings.map((r) => r.current),
//         borderColor: "rgba(0, 200, 255, 0.9)",
//         backgroundColor: "rgba(0, 200, 255, 0.3)",
//         borderWidth: 2,
//         fill: true,
//         tension: 0.4,
//       },
//     ],
//   };

//   const voltageGraphData = {
//     labels,
//     datasets: [
//       {
//         label: "Voltage (V)",
//         data: readings.map((r) => r.voltage),
//         borderColor: "rgba(255, 220, 70, 0.9)",
//         backgroundColor: "rgba(255, 220, 70, 0.25)",
//         borderWidth: 2,
//         fill: true,
//         tension: 0.25,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         ticks: { color: "#ccc" },
//         grid: { color: "rgba(255,255,255,0.1)" },
//       },
//       x: {
//         ticks: { color: "#ccc" },
//         grid: { color: "rgba(255,255,255,0.1)" },
//       },
//     },
//     plugins: {
//       legend: {
//         labels: {
//           color: "#fff",
//         },
//       },
//     },
//   };

//   return (
//     <div className="p-6">
//       {/* Header + live status */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
//         <h2 className="text-xl font-semibold text-white">
//           Real-Time Monitoring
//         </h2>

//         {/* Live status + LED indicator */}
//         <div className="flex items-center gap-3">
//           <div className={`w-3 h-3 rounded-full ${ledColor} ${ledPulse}`} />
//           <div className="text-sm text-gray-300">
//             <span className="font-medium">Status: </span>
//             <span className={conditionColor}>{conditionText}</span>
//           </div>
//           <div className="text-xs text-gray-500">
//             I:{" "}
//             <span className="text-blue-300">
//               {latest.current.toFixed(2)} A
//             </span>{" "}
//             | V:{" "}
//             <span className="text-yellow-300">
//               {latest.voltage.toFixed(2)} V
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Two graphs side-by-side (stack on small screens) */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Current Graph */}
//         <div className="bg-[#111827] p-6 rounded-xl h-64">
//           <h3 className="text-gray-300 text-sm mb-2">
//             Current Trend (Live)
//           </h3>
//           <Line data={currentGraphData} options={options} />
//         </div>

//         {/* Voltage Graph */}
//         <div className="bg-[#111827] p-6 rounded-xl h-64">
//           <h3 className="text-gray-300 text-sm mb-2">
//             Voltage Trend (Live)
//           </h3>
//           <Line data={voltageGraphData} options={options} />
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// REGISTER ALL REQUIRED ELEMENTS
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

export default function RealtimeMonitoring({ readings }) {
  const safeReadings =
    readings && readings.length
      ? readings
      : [{ time: "0s", current: 0, voltage: 0 }];

  const labels = safeReadings.map((r) => r.time);

  const currentGraphData = {
    labels,
    datasets: [
      {
        label: "Current (A)",
        data: safeReadings.map((r) => r.current),
        borderColor: "rgba(0, 200, 255, 0.9)",
        backgroundColor: "rgba(0, 200, 255, 0.3)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const voltageGraphData = {
    labels,
    datasets: [
      {
        label: "Voltage (V)",
        data: safeReadings.map((r) => r.voltage),
        borderColor: "rgba(255, 220, 70, 0.9)",
        backgroundColor: "rgba(255, 220, 70, 0.25)",
        borderWidth: 2,
        fill: true,
        tension: 0.25,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { color: "#ccc" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      x: {
        ticks: { color: "#ccc" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
    plugins: {
      legend: {
        labels: { color: "#fff" },
      },
    },
  };

  const latest = safeReadings[safeReadings.length - 1];

  return (
    <div className="p-6">
      {/* Header + live status */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-xl font-semibold text-white">
          Real-Time Monitoring
        </h2>

        {/* Quick readout of latest values */}
        <div className="text-xs text-gray-400">
          Latest – I:{" "}
          <span className="text-blue-300">
            {latest.current.toFixed ? latest.current.toFixed(2) : latest.current} A
          </span>{" "}
          | V:{" "}
          <span className="text-yellow-300">
            {latest.voltage.toFixed ? latest.voltage.toFixed(2) : latest.voltage} V
          </span>
        </div>
      </div>

      {/* Two graphs side-by-side (stack on small screens) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Graph */}
        <div className="bg-[#111827] p-6 rounded-xl h-64">
          <h3 className="text-gray-300 text-sm mb-2">
            Current Trend (Live)
          </h3>
          <Line data={currentGraphData} options={options} />
        </div>

        {/* Voltage Graph */}
        <div className="bg-[#111827] p-6 rounded-xl h-64">
          <h3 className="text-gray-300 text-sm mb-2">
            Voltage Trend (Live)
          </h3>
          <Line data={voltageGraphData} options={options} />
        </div>
      </div>
    </div>
  );
}
