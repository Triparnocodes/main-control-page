// import React from 'react'
// import DashboardPage from './DashboardPage'

// const Manager = () => {
//   return (
//     <div>

//     <div><div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div></div>

//     <DashboardPage/>
//     </div>
//   )
  
// }

// export default Manager
// import React from "react";
// import DashboardPage from "./DashboardPage";

// const Manager = () => {
//   return (
//     <div className="relative min-h-screen w-screen overflow-x-hidden">
      
//       {/* FULL SCREEN BACKGROUND */}
//       <div
//         className="fixed inset-0 -z-10 w-screen h-screen
//         [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
//       />

//       {/* CONTENT */}
//       {/* <div className="w-full flex justify-center">
//         <DashboardPage />
//       </div> */}
//     </div>
//   );
// };

// export default Manager;

import React from "react";
import DashboardPage from "./DashboardPage";

const Manager = () => {
  return (
    <>
    <div className="relative min-h-[64] w-screen overflow-x-hidden">

      {/* FULL SCREEN BACKGROUND */}
      <div
        className="fixed inset-0 -z-10 w-screen h-screen
        [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
        />

      

      {/* CONTENT */}
      {/* <div className="w-full">
        <DashboardPage />
        </div> */}

    </div>
    <DashboardPage/>
        </>
  );
};

export default Manager;

