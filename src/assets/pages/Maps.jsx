
import MapComponent from "../components/MapComponent";
import Header from "../components/Header";
export default function Maps() {
  return (
    // <div className="min-h-screen bg-[#0a0f15] text-white p-4">
    //   <h1 className="text-2xl font-bold mb-4">Fault Tracking Map</h1>
    //   <MapComponent />
    // </div>
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>

      {/* FIXED HEADER */}
      <Header
        stats={{
          substations: 1,
          ltHouses: 7,
          ltLines: 3,
          online: 5,
          warnings: 2,
          faults: 1
        }}
      />

      {/* MAP WRAPPER with padding so header won’t overlap */}
      <div style={{ paddingTop: "110px", height: "100%", width: "100%" }}>
        <MapComponent />
      </div>

    </div>
  );
}
