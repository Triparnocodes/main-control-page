// import ImageCarousel from '@/landing/components/ImageCarousel';
// import AuthForms from '@/landing/components/AuthForms';
// // import ImageCarousel from '@/landing/components/ImageCarousel';

// export default function Index() {
//   return (
//     <div className="min-h-screen bg-background">
//       <div className="flex flex-col lg:flex-row min-h-screen">
//         {/* Left side - Image Carousel */}
//         <div className="hidden lg:block lg:w-1/2 xl:w-3/5 relative">
//           <ImageCarousel />
//         </div>

//         {/* Right side - Auth Forms */}
//         <div className="w-full lg:w-1/2 xl:w-2/5 min-h-screen flex items-center justify-center bg-card border-l border-border/50">
//           {/* Mobile logo - shown only on small screens */}
//           <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
//             <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
//               <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//             </div>
//             <span className="font-display text-xl font-bold text-foreground">
//               POWER<span className="text-primary">GRID</span>
//             </span>
//           </div>
          
//           <AuthForms />
//         </div>
//       </div>
//     </div>
//   );
// }
import ImageCarousel from '@/landing/components/ImageCarousel';
import AuthForms from '@/landing/components/AuthForms';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0f18] to-[#111] text-white">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left side - Image Carousel */}
        <div className="hidden lg:block lg:w-1/2 xl:w-3/5 relative">
          <ImageCarousel />
        </div>

        {/* Right side - Auth Forms */}
        <div className="w-full lg:w-1/2 xl:w-2/5 min-h-screen flex items-center justify-center">
          
          {/* Floating Logo (Mobile Only) */}
          <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-[#1f2937]/60 backdrop-blur-md flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-display text-xl font-bold text-white">
              POWER<span className="text-blue-400">GRID</span>
            </span>
          </div>

          {/* Glass Login Box */}
          <div className="w-full max-w-md bg-[#0f1625]/70 backdrop-blur-xl border border-white/10 shadow-2xl p-10 rounded-2xl">
            <AuthForms />
          </div>

        </div>
      </div>
    </div>
  );
}
