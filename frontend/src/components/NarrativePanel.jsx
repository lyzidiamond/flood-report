export default function NarrativePanel({ lat, lng, narrative, loading, error, onClose }) {
  return (
    <div style={{
      position: "absolute",
      top: 0,
      right: 0,
      width: "400px",
      height: "100vh",
      background: "white",
      boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
      overflowY: "auto",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontSize: "16px" }}>
          {lat.toFixed(4)}, {lng.toFixed(4)}
        </h2>
        <button onClick={onClose} aria-label="Close" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px" }}>
          ×
        </button>
      </div>

      {loading && (
        <p style={{ color: "#666" }}>Analyzing flood history...</p>
      )}

      {error && (
        <p style={{ color: "#c00" }}>{error}</p>
      )}

      {narrative && (
        <>
          {narrative.flood_zone && (
            <div style={{
              display: "inline-block",
              padding: "4px 10px",
              borderRadius: "4px",
              background: floodZoneColor(narrative.flood_zone),
              color: "white",
              fontSize: "13px",
              fontWeight: "bold",
              alignSelf: "flex-start",
            }}>
              Zone {narrative.flood_zone}
            </div>
          )}
          <p style={{ margin: 0, lineHeight: "1.6" }}>{narrative.narrative}</p>
          <p style={{ margin: 0, fontSize: "12px", color: "#999" }}>
            {narrative.cached ? "Cached" : "Generated"} · {new Date(narrative.generated_at).toLocaleDateString()}
          </p>
        </>
      )}
    </div>
  );
}

function floodZoneColor(zone) {
  if (zone.startsWith("A") || zone.startsWith("V")) return "#c0392b";
  if (zone === "X") return "#27ae60";
  return "#7f8c8d";
}
