// // src/router/AppRouter.jsx
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "../assets/pages/Login";
// import Register from "../assets/pages/Register";
// import Maps from "../assets/pages/Maps";
// import Manager from "../assets/components/Manager";
// import AuthPage from "@/assets/pages/AuthPage";
// import Layout from "@/assets/components/Layout";
// import Index from "@/landing/pages/Index";
// import NotFound from "@/landing/pages/NotFound";

// // Simple protected route using localStorage "token"
// function PrivateRoute({ children }) {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/" />;
// }

// export default function AppRouter() {
//   return (
//     <BrowserRouter>
//     <Layout>
//       <Routes>
//         {/* Public pages */}
//         {/* <Route path="/login" element={<Login/>} /> */}
//         <Route path="/" element={<Index/>} />
//         {/* <Route path="/register" element={<Register />} /> */}
//         <Route path="*" element={<NotFound />} />
//         {/* Protected pages */}
//         <Route
//           path="/dashboard"
//           element={
//             // <PrivateRoute>
//               <Manager />
//             // </PrivateRoute>
//           }
//         />
//         <Route
//           path="/maps"
//           element={
//             <PrivateRoute>
//               <Maps />
//             </PrivateRoute>
//           }
//         />

//         {/* Default route */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//       </Layout>
//     </BrowserRouter>
//   );
// }
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Maps from "../assets/pages/Maps";
// import Manager from "../assets/components/Manager";
// import Layout from "@/assets/components/Layout";
// import Index from "@/landing/pages/Index";
// import NotFound from "@/landing/pages/NotFound";

// // 🔒 Auth guard
// function PrivateRoute({ children }) {
//   const auth = JSON.parse(localStorage.getItem("auth"));
//   return auth && auth.token ? children : <Navigate to="/" />;
// }

// export default function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Layout>
//         <Routes>
//           {/* Public Landing Page */}
//           <Route path="/" element={<Index />} />

//           {/* Protected Pages */}
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute>
//                 <Manager />
//               </PrivateRoute>
//             }
//           />

//           <Route
//             path="/maps"
//             element={
//               <PrivateRoute>
//                 <Maps />
//               </PrivateRoute>
//             }
//           />

//           {/* 404 Page */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Layout>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../assets/pages/Login";           // (still there if you ever use it)
import Register from "../assets/pages/Register";     // (optional)
import Maps from "../assets/pages/Maps";
import Manager from "../assets/components/Manager";
import AuthPage from "@/assets/pages/AuthPage";      // if used inside Index / elsewhere
import Layout from "@/assets/components/Layout";
import Index from "@/landing/pages/Index";
import NotFound from "@/landing/pages/NotFound";

// 🔒 Simple protected route using "auth" from localStorage
function PrivateRoute({ children }) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth && auth.token ? children : <Navigate to="/" />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public landing page */}
          <Route path="/" element={<Index />} />

          {/* (If you later want a separate /login route, you can map it to AuthPage or AuthForms) */}
          {/* <Route path="/login" element={<AuthPage />} /> */}

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Manager />
              </PrivateRoute>
            }
          />

          <Route
            path="/maps"
            element={
              <PrivateRoute>
                <Maps />
              </PrivateRoute>
            }
          />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
