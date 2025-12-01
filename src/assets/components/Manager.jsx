
// import React from "react";
// import DashboardPage from "./DashboardPage";

// const Manager = () => {
//   return (
//     <>
//     <div className="relative min-h-[64] w-screen overflow-x-hidden">

//       {/* FULL SCREEN BACKGROUND */}
//       <div
//         className="fixed inset-0 -z-10 w-screen h-screen
//         [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
//         />

      

//       {/* CONTENT */}
//       {/* <div className="w-full">
//         <DashboardPage />
//         </div> */}

//     </div>
//     <DashboardPage/>
//         </>
//   );
// };

// export default Manager;


// src/assets/components/Manager.jsx
import React from "react";
import Navbar from "./Navbar";
import DashboardPage from "./DashboardPage";

const Manager = () => {
  return (
    <div className="relative min-h-screen  overflow-x-hidden">
      {/* Navbar always visible on protected pages */}
      <Navbar />

      {/* FULL SCREEN BACKGROUND */}
      <div
        className="fixed inset-0 -z-10 w-screen h-screen
        [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
      />

      {/* DASHBOARD CONTENT */}
      <DashboardPage />
    </div>
  );
};

export default Manager;

