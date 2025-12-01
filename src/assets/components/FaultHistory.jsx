// FaultHistory.jsx
import React from "react";

const FaultHistory = ({ events }) => {
  const hasEvents = events && events.length > 0;

  return (
    <section className="text-gray-200 space-y-4">
      <h2 className="text-2xl font-semibold">Fault History</h2>
      <p className="text-gray-400 text-sm">
        Recent detected faults based on live current and voltage readings.
      </p>

      {!hasEvents && (
        <div className="bg-[#0c1118] border border-white/10 rounded-xl p-4 text-sm text-gray-400">
          No faults detected yet.
        </div>
      )}

      {hasEvents && (
        <div className="bg-[#0c1118] border border-white/10 rounded-xl p-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/10">
                <th className="py-2 pr-4">Time</th>
                <th className="py-2 pr-4">Current (A)</th>
                <th className="py-2 pr-4">Voltage (V)</th>
                <th className="py-2 pr-4">Reason</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-white/5 last:border-b-0"
                >
                  <td className="py-2 pr-4 text-gray-300">
                    {event.timestamp}
                  </td>
                  <td className="py-2 pr-4 text-blue-300">
                    {event.current.toFixed
                      ? event.current.toFixed(2)
                      : event.current}
                  </td>
                  <td className="py-2 pr-4 text-yellow-300">
                    {event.voltage.toFixed
                      ? event.voltage.toFixed(2)
                      : event.voltage}
                  </td>
                  <td className="py-2 pr-4 text-red-300 max-w-xs">
                    {event.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default FaultHistory;
