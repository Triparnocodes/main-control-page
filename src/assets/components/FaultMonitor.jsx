
// import React, { useEffect, useState } from "react";
// import { AlertTriangle, Zap, Activity } from "lucide-react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// const FaultMonitor = ({ current, voltage, condition }) => {
//   const [showAlert, setShowAlert] = useState(false);

//   useEffect(() => {
//     if (condition === "Risky") setShowAlert(true);
//   }, [condition]);

//   return (
//     <>
//       {/* MAIN GRID */}
//       <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">

//         {/* CURRENT */}
//         <div className="bg-[#0d1117] border border-gray-700 rounded-xl px-6 py-5 shadow-md">
//           <div className="flex items-center space-x-3">
//             <Activity className="text-blue-400" size={28} />
//             <h2 className="text-xl font-semibold text-white">Current</h2>
//           </div>
//           <p className="text-4xl font-bold text-blue-300 mt-3">{current} A</p>
//         </div>

//         {/* VOLTAGE */}
//         <div className="bg-[#0d1117] border border-gray-700 rounded-xl px-6 py-5 shadow-md">
//           <div className="flex items-center space-x-3">
//             <Zap className="text-yellow-400" size={28} />
//             <h2 className="text-xl font-semibold text-white">Voltage</h2>
//           </div>
//           <p className="text-4xl font-bold text-yellow-300 mt-3">{voltage} V</p>
//         </div>

//         {/* CONDITION */}
//         <div
//           className={`rounded-xl px-6 py-5 shadow-md border ${
//             condition === "Risky"
//               ? "bg-red-900/40 border-red-700"
//               : "bg-green-900/40 border-green-700"
//           }`}
//         >
//           <div className="flex items-center space-x-3">
//             <AlertTriangle
//               className={`${condition === "Risky" ? "text-red-400" : "text-green-400"}`}
//               size={28}
//             />
//             <h2 className="text-xl font-semibold text-white">Condition</h2>
//           </div>
//           <p
//             className={`text-4xl font-bold mt-3 ${
//               condition === "Risky" ? "text-red-400" : "text-green-300"
//             }`}
//           >
//             {condition}
//           </p>
//         </div>
//       </div>

//       {/* POPUP (must come LAST so it's above everything) */}
//       <Dialog open={showAlert} onOpenChange={setShowAlert}>
//         <DialogContent className="z-[99999] bg-[#0d1117] border border-red-700 text-white">
//           <DialogHeader>
//             <DialogTitle className="flex items-center space-x-3 text-red-400">
//               <AlertTriangle size={28} />
//               <span>⚠ Risky Condition Detected</span>
//             </DialogTitle>
//           </DialogHeader>

//           <p className="text-gray-300 mt-2">
//             The fault detection system has detected a dangerous state.
//             Immediate check recommended.
//           </p>

//           <div className="flex justify-end mt-6">
//             <Button
//               className="bg-red-600 hover:bg-red-700 text-white"
//               onClick={() => (window.location.href = "/maps")}
//             >
//               SEE MAPS
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default FaultMonitor;

// import React, { useEffect, useState, useMemo } from "react";
// import { AlertTriangle, Zap, Activity } from "lucide-react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// const FaultMonitor = ({ current, voltage, condition }) => {
//   const [showAlert, setShowAlert] = useState(false);

//   // 🔍 Derived fault logic (more robust than just "condition" prop)
//   // 1) current ≈ 0 and voltage is present  -> risky
//   // 2) voltage ≈ 0                         -> risky
//   const isRisky = useMemo(() => {
//     const currentIsZero = current <= 0.1;
//     const voltageIsZero = voltage <= 1;
//     const voltagePresent = voltage > 10;

//     return (currentIsZero && voltagePresent) || voltageIsZero;
//   }, [current, voltage]);

//   // Final condition text shown in UI
//   const displayCondition = isRisky ? "Risky" : "Stable";

//   // 🎯 Open popup whenever state becomes risky
//   useEffect(() => {
//     if (isRisky) {
//       setShowAlert(true);
//     }
//   }, [isRisky]);

//   return (
//     <>
//       {/* MAIN GRID */}
//       <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">

//         {/* CURRENT */}
//         <div className="bg-[#0d1117] border border-gray-700 rounded-xl px-6 py-5 shadow-md">
//           <div className="flex items-center space-x-3">
//             <Activity className="text-blue-400" size={28} />
//             <h2 className="text-xl font-semibold text-white">Current</h2>
//           </div>
//           <p className="text-4xl font-bold text-blue-300 mt-3">
//             {current.toFixed ? current.toFixed(2) : current} A
//           </p>
//         </div>

//         {/* VOLTAGE */}
//         <div className="bg-[#0d1117] border border-gray-700 rounded-xl px-6 py-5 shadow-md">
//           <div className="flex items-center space-x-3">
//             <Zap className="text-yellow-400" size={28} />
//             <h2 className="text-xl font-semibold text-white">Voltage</h2>
//           </div>
//           <p className="text-4xl font-bold text-yellow-300 mt-3">
//             {voltage.toFixed ? voltage.toFixed(2) : voltage} V
//           </p>
//         </div>

//         {/* CONDITION */}
//         <div
//           className={`rounded-xl px-6 py-5 shadow-md border relative overflow-hidden ${
//             isRisky
//               ? "bg-red-900/40 border-red-700"
//               : "bg-green-900/40 border-green-700"
//           }`}
//         >
//           <div className="flex items-center space-x-3">
//             {/* Live LED indicator */}
//             <span
//               className={`w-3 h-3 rounded-full ${
//                 isRisky ? "bg-red-500 animate-pulse" : "bg-emerald-400"
//               }`}
//             />
//             <AlertTriangle
//               className={isRisky ? "text-red-400" : "text-green-400"}
//               size={24}
//             />
//             <h2 className="text-xl font-semibold text-white">Condition</h2>
//           </div>
//           <p
//             className={`text-4xl font-bold mt-3 ${
//               isRisky ? "text-red-400" : "text-green-300"
//             }`}
//           >
//             {displayCondition}
//           </p>

//           {/* Extra info about why it's risky */}
//           {isRisky && (
//             <p className="mt-2 text-sm text-red-200">
//               {voltage <= 1
//                 ? "Voltage dropped to 0V – possible short circuit or supply failure."
//                 : "Current is 0A while voltage is present – possible open circuit or fault."}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* POPUP (Dialog appears whenever isRisky becomes true) */}
//       <Dialog open={showAlert} onOpenChange={setShowAlert}>
//         <DialogContent className="z-[99999] bg-[#0d1117] border border-red-700 text-white">
//           <DialogHeader>
//             <DialogTitle className="flex items-center space-x-3 text-red-400">
//               <AlertTriangle size={28} />
//               <span>⚠ Risky Condition Detected</span>
//             </DialogTitle>
//           </DialogHeader>

//           <p className="text-gray-300 mt-2">
//             The fault detection system has detected a dangerous state based on
//             live current and voltage readings.
//           </p>

//           <ul className="list-disc list-inside text-gray-400 text-sm mt-3 space-y-1">
//             <li>Current: <span className="text-blue-300">
//               {current.toFixed ? current.toFixed(2) : current} A
//             </span></li>
//             <li>Voltage: <span className="text-yellow-300">
//               {voltage.toFixed ? voltage.toFixed(2) : voltage} V
//             </span></li>
//             <li>
//               Condition:{" "}
//               <span className={isRisky ? "text-red-400" : "text-emerald-400"}>
//                 {displayCondition}
//               </span>
//             </li>
//           </ul>

//           <p className="text-gray-400 text-xs mt-3">
//             Please inspect the line and nearby distribution points. Use the map
//             view to locate the affected section quickly.
//           </p>

//           <div className="flex justify-end mt-6 gap-3">
//             <Button
//               variant="outline"
//               className="border-gray-500 text-gray-200 hover:bg-gray-800"
//               onClick={() => setShowAlert(false)}
//             >
//               Dismiss
//             </Button>
//             <Button
//               className="bg-red-600 hover:bg-red-700 text-white"
//               onClick={() => (window.location.href = "/maps")}
//             >
//               SEE MAPS
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

  // Derived fault logic:
  // 1) current ≈ 0 AND voltage present  -> risky
  // 2) voltage ≈ 0                      -> risky
  const isRisky = useMemo(() => {
    const currentIsZero = current <= 0.1;
    const voltageIsZero = voltage <= 1;
    const voltagePresent = voltage > 10;

    return (currentIsZero && voltagePresent) || voltageIsZero;
  }, [current, voltage]);

  const displayCondition = isRisky ? "Risky" : "Stable";

  useEffect(() => {
    if (isRisky) setShowAlert(true);
  }, [isRisky]);

  return (
    <>
      {/* MAIN GRID */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
        {/* CURRENT */}
        <div className="bg-[#0d1117] border border-gray-700 rounded-xl px-6 py-5 shadow-md">
          <div className="flex items-center space-x-3">
            <Activity className="text-blue-400" size={28} />
            <h2 className="text-xl font-semibold text-white">Current</h2>
          </div>
          <p className="text-4xl font-bold text-blue-300 mt-3">
            {current.toFixed ? current.toFixed(2) : current} A
          </p>
        </div>

        {/* VOLTAGE */}
        <div className="bg-[#0d1117] border border-gray-700 rounded-xl px-6 py-5 shadow-md">
          <div className="flex items-center space-x-3">
            <Zap className="text-yellow-400" size={28} />
            <h2 className="text-xl font-semibold text-white">Voltage</h2>
          </div>
          <p className="text-4xl font-bold text-yellow-300 mt-3">
            {voltage.toFixed ? voltage.toFixed(2) : voltage} V
          </p>
        </div>

        {/* CONDITION */}
        <div
          className={`rounded-xl px-6 py-5 shadow-md border relative overflow-hidden ${
            isRisky
              ? "bg-red-900/40 border-red-700"
              : "bg-green-900/40 border-green-700"
          }`}
        >
          <div className="flex items-center space-x-3">
            {/* LED */}
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

          {isRisky && (
            <p className="mt-2 text-sm text-red-200">
              {voltage <= 1
                ? "Voltage dropped to 0V – possible short circuit or supply failure."
                : "Current is 0A while voltage is present – possible open circuit or fault."}
            </p>
          )}
        </div>
      </div>

      {/* POPUP */}
      <Dialog open={showAlert} onOpenChange={setShowAlert}>
        <DialogContent className="z-[99999] bg-[#0d1117] border border-red-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3 text-red-400">
              <AlertTriangle size={28} />
              <span>⚠ Risky Condition Detected</span>
            </DialogTitle>
          </DialogHeader>

          <p className="text-gray-300 mt-2">
            The fault detection system has detected a dangerous state based on
            live current and voltage readings.
          </p>

          <ul className="list-disc list-inside text-gray-400 text-sm mt-3 space-y-1">
            <li>
              Current:{" "}
              <span className="text-blue-300">
                {current.toFixed ? current.toFixed(2) : current} A
              </span>
            </li>
            <li>
              Voltage:{" "}
              <span className="text-yellow-300">
                {voltage.toFixed ? voltage.toFixed(2) : voltage} V
              </span>
            </li>
            <li>
              Condition:{" "}
              <span className={isRisky ? "text-red-400" : "text-emerald-400"}>
                {displayCondition}
              </span>
            </li>
          </ul>

          <p className="text-gray-400 text-xs mt-3">
            Please inspect the line and nearby distribution points. Use the map
            view to locate the affected section quickly.
          </p>

          <div className="flex justify-end mt-6 gap-3">
            <Button
              variant="outline"
              className="border-gray-500 text-gray-200 hover:bg-gray-800"
              onClick={() => setShowAlert(false)}
            >
              Dismiss
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => (window.location.href = "/maps")}
            >
              SEE MAPS
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FaultMonitor;

