export default function Layout({ children }) {
  return (
    <div className=" relative text-white">
      {/* Base radial gradient from bg.ibelick */}
      <div
        className="fixed inset-0 -z-50 w-screen h-screen
        [background:radial-gradient(125%_125%_at_50%_10%,#020617_40%,#312e81_100%)]"
      />

      {/* Soft moving glow */}
      <div className="pointer-events-none fixed inset-0 -z-40 animate-slow-float opacity-40">
        <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-4rem] h-72 w-72 rounded-full bg-indigo-500/40 blur-3xl" />
      </div>

      {/* Very subtle star grid */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[radial-gradient(circle_at_1px_1px,#1f2937_1px,transparent_0)] bg-[size:24px_24px] opacity-30" />

      {/* Page content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
