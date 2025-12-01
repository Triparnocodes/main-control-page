// import { Menu } from "lucide-react";
// import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

// export default function Navbar() {
//   return (
//     <nav className="w-full fixed top-0 left-0 z-50 bg-[#0b0e16]/90 backdrop-blur-md border-b border-white/10">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

//         {/* LOGO */}
//         <h1 className="text-white text-xl font-semibold tracking-wide">
//           KSEBL
//         </h1>

//         {/* DESKTOP MENU */}
//         <ul className="hidden md:flex items-center space-x-8">
//           {["Home", "About", "Contact"].map((item) => (
//             <li key={item}>
//               <a
//                 href="#"
//                 className="text-gray-300 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
//               >
//                 {item}
//               </a>
//             </li>
//           ))}
//         </ul>

//         {/* MOBILE MENU (shadcn sheet) */}
//         <div className="md:hidden">
//           <Sheet>
//             <SheetTrigger>
//               <Menu className="text-white" size={28} />
//             </SheetTrigger>

//             <SheetContent side="right" className="bg-[#0b0e16] border-l border-white/10">
//               <div className="mt-10 space-y-6">
//                 {["Home", "About", "Contact"].map((item) => (
//                   <a
//                     key={item}
//                     href="#"
//                     className="block text-gray-300 text-lg hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
//                   >
//                     {item}
//                   </a>
//                 ))}
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </nav>
//   );
// }

// src/assets/components/Navbar.jsx
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const username = localStorage.getItem("username");

  return (
    <nav className="w-full px-20 py-3 flex items-center justify-between bg-black/70 backdrop-blur-md text-white">
      <div className="font-semibold text-lg">
        ⚡ KSEBL
      </div>

      <div className="flex items-center gap-6 text-sm">
        <button onClick={() => navigate("/dashboard")} className="hover:text-blue-400">
          Dashboard
        </button>
        <button onClick={() => navigate("/maps")} className="hover:text-blue-400">
          Maps
        </button>
        <span className="text-gray-300">
          {username ? `Hello, ${username}` : ""}
        </span>
        <button
          onClick={logout}
          className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-xs"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
