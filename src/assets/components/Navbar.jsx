import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0b0e16]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <h1 className="text-white text-xl font-semibold tracking-wide">
          KSEBL
        </h1>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center space-x-8">
          {["Home", "About", "Contact"].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* MOBILE MENU (shadcn sheet) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="text-white" size={28} />
            </SheetTrigger>

            <SheetContent side="right" className="bg-[#0b0e16] border-l border-white/10">
              <div className="mt-10 space-y-6">
                {["Home", "About", "Contact"].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block text-gray-300 text-lg hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
