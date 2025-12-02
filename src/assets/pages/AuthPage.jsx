import { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";

const images = [
  "/src/assets/auth/power1.jpg",
  "/src/assets/auth/power2.jpg",
  "/src/assets/auth/power3.jpg",
];

export default function AuthPage() {
  const [index, setIndex] = useState(0);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen flex bg-[#050b14] text-white relative overflow-hidden">

      {/* 🌌 Background glow (BEHIND EVERYTHING) */}
      <div className="absolute inset-0 opacity-40 blur-3xl bg-[radial-gradient(circle_at_top,#0077ff,#1e1b4b,#000)] z-0 pointer-events-none" />

      {/* 🖼 IMAGE CAROUSEL (NOT CLICKABLE) */}
      <div className="w-1/2 h-full relative z-0 pointer-events-none">
        <img
          src={images[index]}
          className="w-full h-full object-cover transition-all duration-700 rounded-r-3xl"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      {/* 🔐 FORM (INTERACTIVE) */}
      <div className="w-1/2 h-full flex justify-center items-center relative z-10 pointer-events-auto">
        <AuthForm isRegister={isRegister} toggle={() => setIsRegister(!isRegister)} />
      </div>
    </div>
  );
}
