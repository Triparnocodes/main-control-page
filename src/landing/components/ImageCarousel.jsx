// import { useState, useEffect } from 'react';
// import powerGrid from '@/assets/auth/power1.jpg';
// import substationNight from '@/assets/auth/power2.jpg';
// import controlRoom from '@/assets/auth/power3.jpg';

// const images = [powerGrid, substationNight, controlRoom];

// const typewriterTexts = [
//   "Powering Tomorrow, Today",
//   "Reliable Energy Distribution",
//   "Smart Grid Solutions"
// ];

// export default function ImageCarousel() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [displayText, setDisplayText] = useState('');
//   const [isTyping, setIsTyping] = useState(true);
//   const [textIndex, setTextIndex] = useState(0);

//   // Image carousel effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Typewriter effect
//   useEffect(() => {
//     const currentText = typewriterTexts[textIndex];
    
//     if (isTyping) {
//       if (displayText.length < currentText.length) {
//         const timeout = setTimeout(() => {
//           setDisplayText(currentText.slice(0, displayText.length + 1));
//         }, 80);
//         return () => clearTimeout(timeout);
//       } else {
//         // Pause before deleting
//         const timeout = setTimeout(() => setIsTyping(false), 2000);
//         return () => clearTimeout(timeout);
//       }
//     } else {
//       if (displayText.length > 0) {
//         const timeout = setTimeout(() => {
//           setDisplayText(displayText.slice(0, -1));
//         }, 40);
//         return () => clearTimeout(timeout);
//       } else {
//         // Move to next text
//         setTextIndex((prev) => (prev + 1) % typewriterTexts.length);
//         setIsTyping(true);
//       }
//     }
//   }, [displayText, isTyping, textIndex]);

//   return (
//     <div className="relative h-full w-full overflow-hidden bg-background">
//       {/* Background images */}
//       {images.map((img, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//             index === currentIndex ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <img
//             src={img}
//             alt={`Power infrastructure ${index + 1}`}
//             className="h-full w-full object-cover"
//           />
//           {/* Overlay gradient */}
//           <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
//           <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
//         </div>
//       ))}

//       {/* Content overlay */}
//       <div className="relative z-10 flex h-full flex-col justify-center px-8 lg:px-12">
//         {/* Logo and brand */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center electric-glow">
//               <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//             </div>
//             <span className="font-display text-2xl font-bold text-foreground">
//               POWER<span className="text-primary">GRID</span>
//             </span>
//           </div>
//         </div>

//         {/* Typewriter heading */}
//         <div className="mb-6">
//           <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground leading-tight">
//             {displayText}
//             <span className="typewriter-cursor" />
//           </h1>
//         </div>

//         {/* Subtitle */}
//         <p className="text-muted-foreground text-lg max-w-md mb-8">
//           Secure access to your power distribution network. Monitor substations, 
//           track consumption, and manage your grid efficiently.
//         </p>

//         {/* Stats */}
//         <div className="flex gap-8">
//           <div>
//             <div className="text-3xl font-display font-bold text-primary">500+</div>
//             <div className="text-sm text-muted-foreground">Substations</div>
//           </div>
//           <div>
//             <div className="text-3xl font-display font-bold text-primary">99.9%</div>
//             <div className="text-sm text-muted-foreground">Uptime</div>
//           </div>
//           <div>
//             <div className="text-3xl font-display font-bold text-primary">24/7</div>
//             <div className="text-sm text-muted-foreground">Monitoring</div>
//           </div>
//         </div>

//         {/* Carousel indicators */}
//         <div className="absolute bottom-8 left-8 flex gap-2">
//           {images.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentIndex(index)}
//               className={`h-2 rounded-full transition-all duration-300 ${
//                 index === currentIndex 
//                   ? 'w-8 bg-primary' 
//                   : 'w-2 bg-muted-foreground/50 hover:bg-muted-foreground'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import powerGrid from '@/assets/auth/power1.jpg';
import substationNight from '@/assets/auth/power2.jpg';
import controlRoom from '@/assets/auth/power3.jpg';

const images = [powerGrid, substationNight, controlRoom];

const typewriterTexts = [
  "Powering Tomorrow ⚡",
  "AI-Driven Grid Monitoring",
  "Smart Fault Detection System"
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [textIndex, setTextIndex] = useState(0);

  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentText = typewriterTexts[textIndex];

    if (isTyping) {
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 70);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 1500);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setTextIndex(prev => (prev + 1) % typewriterTexts.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, textIndex]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#050a14]">

      {/* IMAGE SLIDES (with dark futuristic overlay) */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            currentIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <img
            src={img}
            alt="Electric Infra"
            className="h-full w-full object-cover brightness-[0.45] saturate-120"
          />

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f18]/90 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 backdrop-blur-[2px]" />
        </div>
      ))}

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col justify-center px-10 h-full">

        {/* BRAND */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-lg bg-blue-500/20 border border-blue-500/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.5)]">
            <svg className="w-7 h-7 text-blue-400" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-3xl font-bold tracking-wider text-white">
            POWER<span className="text-blue-500">GRID</span>
          </span>
        </div>

        {/* TYPEWRITER HEADLINE */}
        <h1 className="text-4xl lg:text-6xl font-bold text-white drop-shadow-xl">
          {displayText}
          <span className="animate-pulse text-blue-400">|</span>
        </h1>

        {/* SUBTEXT */}
        <p className="text-gray-300 max-w-lg mt-4 leading-relaxed">
          Monitor substations, analyze live grid flow, and manage electrical infrastructure with confidence.
        </p>

        {/* STATS */}
        <div className="flex gap-10 mt-10">
          {[
            { label: "Substations", value: "500+" },
            { label: "Uptime", value: "99.9%" },
            { label: "Monitoring", value: "24/7" },
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold text-blue-400">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* SLIDE INDICATORS */}
        <div className="absolute bottom-6 left-10 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-10 h-2 bg-blue-500 shadow-[0_0_10px_#00FFFF]"
                  : "w-2 h-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
