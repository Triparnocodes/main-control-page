// src/router/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../assets/pages/Login";
import Register from "../assets/pages/Register";
import Maps from "../assets/pages/Maps";
import Manager from "../assets/components/Manager";
import AuthPage from "@/assets/pages/AuthPage";
import Layout from "@/assets/components/Layout";

// Simple protected route using localStorage "token"
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        {/* Public pages */}
        <Route path="/login" element={<Login/>} />
        {/* <Route path="/register" element={<Register />} /> */}

        {/* Protected pages */}
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

        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      </Layout>
    </BrowserRouter>
  );
}
