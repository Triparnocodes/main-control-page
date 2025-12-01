// // DashboardPage.jsx
// import RealtimeMonitoring from "./RealtimeMonitoring";
// import WeatherSafety from "./WeatherSafety";
// import FaultMonitor from "./FaultMonitor";

// export default function DashboardPage() {
//   // These values will later come from Arduino Serial Port
//   const current = 1;          // example
//   const voltage = 120;        // example
//   const condition = current === 0 && voltage > 0 ? "Risky" : "Stable";
//   return (
//     <div className="min-h-screen bg-[#0a0f15] px-6 py-10 space-y-16 ">
//       <FaultMonitor
//         current={current}
//         voltage={voltage}
//         condition={condition}
//       />
//       <RealtimeMonitoring />
//       <WeatherSafety />

//     </div>
//   );
// }

// DashboardPage.jsx
// DashboardPage.jsx
import { useEffect, useRef, useState } from "react";
import RealtimeMonitoring from "./RealtimeMonitoring";
import WeatherSafety from "./WeatherSafety";
import FaultMonitor from "./FaultMonitor";
import FaultHistory from "./FaultHistory";

export default function DashboardPage() {
  // 🔁 Shared live readings for the whole dashboard
  const [readings, setReadings] = useState([
    { time: "10s", current: 5, voltage: 230 },
    { time: "20s", current: 7, voltage: 229 },
    { time: "30s", current: 4, voltage: 230 },
    { time: "40s", current: 9, voltage: 228 },
    { time: "50s", current: 6, voltage: 228 },
  ]);

  // 🧾 Fault history: array of { id, timestamp, current, voltage, reason }
  const [faultHistory, setFaultHistory] = useState([]);
  const lastRiskyRef = useRef(false); // to detect transitions from Stable -> Risky

  // ⚠ For now: simulate live updates here (single source of truth)
  // Later: replace this with `fetch("http://localhost:5000/data")`
  useEffect(() => {
    const interval = setInterval(() => {
      setReadings((prev) => {
        const lastIndex = prev.length;
        const nextTime = `${(lastIndex + 1) * 10}s`;

        const current = parseFloat((Math.random() * 10).toFixed(2));

        const isFaultEvent = Math.random() < 0.05; // 5% chance of fault
        const voltage = isFaultEvent
          ? 0
          : 228 + (Math.random() * 2 - 1); // ~228–230V

        const next = {
          time: nextTime,
          current,
          voltage: parseFloat(voltage.toFixed(2)),
        };

        const updated = [...prev, next];
        return updated.length > 20 ? updated.slice(updated.length - 20) : updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const latest = readings[readings.length - 1] || {
    time: "0s",
    current: 0,
    voltage: 0,
  };

  // 🧠 Fault detection for history logging (same rules as FaultMonitor)
  useEffect(() => {
    if (!readings.length) return;

    const { current, voltage } = latest;

    const currentIsZero = current <= 0.1;
    const voltageIsZero = voltage <= 1;
    const voltagePresent = voltage > 10;

    const isRisky =
      (currentIsZero && voltagePresent) || voltageIsZero;

    // Only log when we transition from non-risky -> risky
    if (isRisky && !lastRiskyRef.current) {
      const reason = voltageIsZero
        ? "Voltage dropped to 0V – possible short circuit."
        : "Current is 0A while voltage is present – possible open circuit.";

      const event = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString("en-IN", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        current,
        voltage,
        reason,
      };

      setFaultHistory((prev) => [event, ...prev].slice(0, 10)); // keep last 10 events
    }

    lastRiskyRef.current = isRisky;
  }, [latest, readings]);

  return (
    <div className="min-h-screen bg-[#0a0f15] px-6 py-10 space-y-16">
      {/* FaultMonitor sees the same latest values as the graphs */}
      <FaultMonitor current={latest.current} voltage={latest.voltage} />

      {/* Live graphs */}
      <RealtimeMonitoring readings={readings} />

      {/* Fault history log */}
      <FaultHistory events={faultHistory} />

      <WeatherSafety />
    </div>
  );
}

