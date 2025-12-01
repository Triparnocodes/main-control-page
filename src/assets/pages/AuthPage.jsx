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
      
      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 opacity-40 blur-3xl bg-[radial-gradient(circle_at_top,#0077ff,#1e1b4b,#000)]" />

      {/* 🖼 IMAGE CAROUSEL */}
      <div className="w-1/2 h-full relative">
        <img 
          src={images[index]} 
          className="w-full h-full object-cover rounded-r-3xl transition-all duration-700" 
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      </div>

      {/* 🔐 FORM SECTION */}
      <div className="w-1/2 h-full flex justify-center items-center">
        <AuthForm 
          isRegister={isRegister} 
          toggle={() => setIsRegister(!isRegister)} 
        />
      </div>
    </div>
  );
}
