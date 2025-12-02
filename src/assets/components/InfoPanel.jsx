export default function InfoPanel({ open, onClose, selectedLT ,toggleBreaker }) {
  if (!selectedLT) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: open ? 0 : "-420px",
        width: "400px",
        height: "100vh",
        background: "linear-gradient(180deg, #0b1623, #0f1e33)",
        color: "white",
        padding: "24px",
        transition: "right 0.35s ease",
        boxShadow: open ? "-5px 0 20px rgba(0,0,0,0.4)" : "none",
        zIndex: 1000
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "18px",
          right: "18px",
          background: "rgba(255,255,255,0.1)",
          border: "none",
          color: "white",
          padding: "6px 10px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "18px"
        }}
      >
        ✕
      </button>

      <h2 style={{ marginTop: "40px", fontSize: "26px", fontWeight: "600" }}>
        LT Details
      </h2>

      <p style={{ marginTop: "6px", opacity: 0.7 }}>
        Showing status for <b>{selectedLT.name}</b>
      </p>

      <table
        style={{
          width: "100%",
          marginTop: "24px",
          borderCollapse: "collapse",
          fontSize: "15px"
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.3)" }}>
            <th style={{ textAlign: "left", padding: "8px 0" }}>Breaker</th>
            <th style={{ textAlign: "left" }}>Voltage</th>
            <th style={{ textAlign: "left" }}>Current</th>
            <th style={{ textAlign: "left" }}>Status</th>
          </tr>
        </thead>

        <tbody>
            {selectedLT.breakers.map((b, i) => (
  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
    <td style={{ padding: "10px 0" }}>{b.name}</td>
    <td>{b.voltage}</td>
    <td>{b.current}</td>

    {/* NEW STATUS BUTTON */}
    

    <td>
  <div
    onClick={() => toggleBreaker(selectedLT.id, i)}
    style={{
      width: "40px",
      height: "22px",
      background: b.status === "ON" ? "#4db8ff" : "#999",
      borderRadius: "20px",
      position: "relative",
      cursor: "pointer",
      transition: "background 0.3s",
      display: "flex",
      alignItems: "center",
      padding: "2px"
    }}
  >
    <div
      style={{
        width: "18px",
        height: "18px",
        background: "white",
        borderRadius: "50%",
        transition: "transform 0.3s",
        transform: b.status === "ON" ? "translateX(18px)" : "translateX(0)"
      }}
    ></div>
  </div>
</td>



  </tr>
))}

        </tbody>
      </table>
    </div>
  );
}