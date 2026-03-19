import { useState } from "react";
import Map from "./components/Map";
import NarrativePanel from "./components/NarrativePanel";
import IntroOverlay from "./components/IntroOverlay";
import { getNarrative } from "./api/client";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [selection, setSelection] = useState(null); // { lat, lng }
  const [narrative, setNarrative] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleMapClick(lat, lng) {
    setSelection({ lat, lng });
    setNarrative(null);
    setError(null);
    setLoading(true);

    try {
      const data = await getNarrative(lat, lng);
      setNarrative(data);
    } catch (err) {
      setError("Failed to load flood data for this location.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", position: "relative" }}>
      {showIntro && <IntroOverlay onDismiss={() => setShowIntro(false)} />}
      <Map onMapClick={handleMapClick} />
      {selection && (
        <NarrativePanel
          lat={selection.lat}
          lng={selection.lng}
          narrative={narrative}
          loading={loading}
          error={error}
          onClose={() => setSelection(null)}
        />
      )}
    </div>
  );
}
