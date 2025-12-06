

// import React, { useEffect, useState, useMemo } from "react";
// import { AlertTriangle, Zap, Activity } from "lucide-react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// const FaultMonitor = ({ current, voltage }) => {
//   const [showAlert, setShowAlert] = useState(false);

//   // ⚠️ Determine if system is risky
//   const isRisky = useMemo(() => {
//     const currentIsZero = current <= 0.1;
//     const voltageIsZero = voltage <= 1;
//     const voltagePresent = voltage > 10;

//     return (currentIsZero && voltagePresent) || voltageIsZero;
//   }, [current, voltage]);

//   const displayCondition = isRisky ? "Risky" : "Stable";

//   // 🔔 Auto-popup when risky detected
//   useEffect(() => {
//     if (isRisky) setShowAlert(true);
//   }, [isRisky]);

//   return (
//     <>
//       {/* 🔹 Current */}
//       <div className="bg-[#0d1117] border border-gray-700 rounded-xl px-6 py-5 shadow-lg">
//         <div className="flex items-center space-x-3">
//           <Activity className="text-blue-400" size={28} />
//           <h2 className="text-xl font-semibold text-white">Current</h2>
//         </div>
//         <p className="text-4xl font-bold text-blue-300 mt-3">
//           {current.toFixed ? current.toFixed(2) : current} A
//         </p>
//       </div>

//       {/* 🔹 Voltage */}
//       <div className="bg-[#0d1117] border border-gray-700 rounded-xl px-6 py-5 shadow-lg">
//         <div className="flex items-center space-x-3">
//           <Zap className="text-yellow-400" size={28} />
//           <h2 className="text-xl font-semibold text-white">Voltage</h2>
//         </div>
//         <p className="text-4xl font-bold text-yellow-300 mt-3">
//           {voltage.toFixed ? voltage.toFixed(2) : voltage} V
//         </p>
//       </div>

//       {/* 🔹 Condition */}
//       <div
//         className={`rounded-xl px-6 py-5 shadow-lg border relative overflow-hidden ${
//           isRisky ? "bg-red-900/40 border-red-700" : "bg-green-900/40 border-green-700"
//         }`}
//       >
//         <div className="flex items-center space-x-3">
//           {/* LED indicator */}
//           <span
//             className={`w-3 h-3 rounded-full ${
//               isRisky ? "bg-red-500 animate-pulse" : "bg-emerald-400"
//             }`}
//           />
//           <AlertTriangle className={isRisky ? "text-red-400" : "text-green-400"} size={24} />
//           <h2 className="text-xl font-semibold text-white">Condition</h2>
//         </div>

//         <p
//           className={`text-4xl font-bold mt-3 ${
//             isRisky ? "text-red-400" : "text-green-300"
//           }`}
//         >
//           {displayCondition}
//         </p>

//         {/* Extra hint text when risky */}
//         {isRisky && (
//           <p className="mt-2 text-sm text-red-200">
//             {voltage <= 1
//               ? "⚡ Voltage = 0V → Possible short circuit or power failure."
//               : "🔌 Current = 0A while voltage exists → Possible line cut or open circuit."}
//           </p>
//         )}
//       </div>

//       {/* POPUP ALERT */}
//       <Dialog open={showAlert} onOpenChange={setShowAlert}>
//         <DialogContent
//           className="z-[99999] bg-[#0d1117] border border-red-700 text-white max-w-md"
//         >
//           <DialogHeader>
//             <DialogTitle className="flex items-center space-x-3 text-red-400">
//               <AlertTriangle size={28} />
//               <span>⚠ Fault Detected</span>
//             </DialogTitle>
//           </DialogHeader>

//           <p className="text-gray-300">
//             The system detected abnormal readings requiring attention.
//           </p>

//           <div className="mt-4 space-y-1 text-gray-400 text-sm">
//             <p>• Current: <span className="text-blue-300">{current.toFixed(2)} A</span></p>
//             <p>• Voltage: <span className="text-yellow-300">{voltage.toFixed(2)} V</span></p>
//             <p>• Status: <span className="text-red-400">{displayCondition}</span></p>
//           </div>

//           <p className="text-xs text-red-300 mt-3">
//             Recommend immediate inspection and troubleshooting.
//           </p>

//           <div className="flex justify-end gap-3 mt-6">
//             <Button
//               variant="outline"
//               className="border-gray-500 text-gray-300 hover:bg-gray-800"
//               onClick={() => setShowAlert(false)}
//             >
//               Close
//             </Button>

//             <Button
//               className="bg-red-600 hover:bg-red-700 text-white"
//               onClick={() => (window.location.href = "/maps")}
//             >
//               View Map
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default FaultMonitor;


import React, { useEffect, useState, useMemo } from "react";
import { AlertTriangle, Zap, Activity } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const FaultMonitor = ({ current, voltage }) => {
  const [showAlert, setShowAlert] = useState(false);

  // Safeguard for undefined
  const safeCurrent = typeof current === "number" ? current : 0;
  const safeVoltage = typeof voltage === "number" ? voltage : 0;

  // ⚠️ Determine if system is risky
  const isRisky = useMemo(() => {
    const currentIsZero = safeCurrent <= 0.1;
    const voltageIsZero = safeVoltage <= 1;
    const voltagePresent = safeVoltage > 10;
    return (currentIsZero && voltagePresent) || voltageIsZero;
  }, [safeCurrent, safeVoltage]);

  const displayCondition = isRisky ? "Risky" : "Stable";

  // 🔔 Auto-popup when risky detected
  useEffect(() => {
    if (isRisky) setShowAlert(true);
  }, [isRisky]);

  return (
    <>
      {/* 🔹 Current */}
      <div className="bg-[#0d1117] border border-gray-700 rounded-xl px-6 py-5 shadow-lg">
        <div className="flex items-center space-x-3">
          <Activity className="text-blue-400" size={28} />
          <h2 className="text-xl font-semibold text-white">Current</h2>
        </div>
        <p className="text-4xl font-bold text-blue-300 mt-3">
          {safeCurrent.toFixed(2)} A
        </p>
      </div>

      {/* 🔹 Voltage */}
      <div className="bg-[#0d1117] border border-gray-700 rounded-xl px-6 py-5 shadow-lg">
        <div className="flex items-center space-x-3">
          <Zap className="text-yellow-400" size={28} />
          <h2 className="text-xl font-semibold text-white">Voltage</h2>
        </div>
        <p className="text-4xl font-bold text-yellow-300 mt-3">
          {safeVoltage.toFixed(2)} V
        </p>
      </div>

      {/* 🔹 Condition */}
      <div
        className={`rounded-xl px-6 py-5 shadow-lg border relative overflow-hidden ${
          isRisky ? "bg-red-900/40 border-red-700" : "bg-green-900/40 border-green-700"
        }`}
      >
        <div className="flex items-center space-x-3">
          {/* LED indicator */}
          <span
            className={`w-3 h-3 rounded-full ${
              isRisky ? "bg-red-500 animate-pulse" : "bg-emerald-400"
            }`}
          />
          <AlertTriangle
            className={isRisky ? "text-red-400" : "text-green-400"}
            size={24}
          />
          <h2 className="text-xl font-semibold text-white">Condition</h2>
        </div>

        <p
          className={`text-4xl font-bold mt-3 ${
            isRisky ? "text-red-400" : "text-green-300"
          }`}
        >
          {displayCondition}
        </p>

        {/* Extra hint text when risky */}
        {isRisky && (
          <p className="mt-2 text-sm text-red-200">
            {safeVoltage <= 1
              ? "⚡ Voltage = 0V → Possible short circuit or power failure."
              : "🔌 Current = 0A while voltage exists → Possible line cut or open circuit."}
          </p>
        )}
      </div>

      {/* POPUP ALERT */}
      <Dialog open={showAlert} onOpenChange={setShowAlert}>
        <DialogContent className="z-[99999] bg-[#0d1117] border border-red-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3 text-red-400">
              <AlertTriangle size={28} />
              <span>⚠ Fault Detected</span>
            </DialogTitle>
          </DialogHeader>

          <p className="text-gray-300">
            The system detected abnormal readings requiring attention.
          </p>

          <div className="mt-4 space-y-1 text-gray-400 text-sm">
            <p>
              • Current:{" "}
              <span className="text-blue-300">{safeCurrent.toFixed(2)} A</span>
            </p>
            <p>
              • Voltage:{" "}
              <span className="text-yellow-300">{safeVoltage.toFixed(2)} V</span>
            </p>
            <p>
              • Status: <span className="text-red-400">{displayCondition}</span>
            </p>
          </div>

          <p className="text-xs text-red-300 mt-3">
            Recommend immediate inspection and troubleshooting.
          </p>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              className="border-gray-500 text-gray-300 hover:bg-gray-800"
              onClick={() => setShowAlert(false)}
            >
              Close
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => (window.location.href = "/maps")}
            >
              View Map
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FaultMonitor;

