// WeatherSafety.jsx
import { Cloud, Thermometer, Droplets, Wind, Shield } from "lucide-react";

export default function WeatherSafety() {
  return (
    <section className="text-gray-200 space-y-6">
      <h1 className="text-3xl font-bold">Weather & Safety Information</h1>
      <p className="text-gray-400">
        Environmental conditions affecting safe voltage levels
      </p>

      {/* Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Metric icon={<Thermometer />} label="Temperature" value="28.3°C" />
        <Metric icon={<Droplets />} label="Humidity" value="70%" />
        <Metric icon={<Wind />} label="Wind Speed" value="11.8 km/h" />
        <Metric icon={<Cloud />} label="Condition" value="Partly Cloudy" />
      </div>

      {/* Safety Voltage */}
      <div className="bg-[#0c1118] border border-white/10 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-md bg-green-500/10 text-green-400">
            <Shield size={22} />
          </span>

          <div>
            <h2 className="text-xl font-semibold">Recommended Safe Voltage</h2>
            <p className="text-gray-400 text-sm">Based on current weather conditions</p>
          </div>
        </div>

        <div className="bg-[#0d141d] border border-white/5 rounded-md p-6">
          <p className="text-5xl font-bold text-blue-400">
            420 <span className="text-gray-300 text-3xl">V</span>
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Maximum recommended operating voltage
          </p>
        </div>
      </div>
    </section>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="bg-[#0c1118] border border-white/10 rounded-xl p-5">
      <div className="text-blue-400 mb-2">{icon}</div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-3xl font-semibold mt-1">{value}</p>
    </div>
  );
}
