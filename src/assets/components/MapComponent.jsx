import { Fragment, useEffect, useState, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import InfoPanel from "./InfoPanel";

function MapContent() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 150);
  }, [map]);
  return null;
}

export default function MapComponent() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  // Fix Leaflet icon loading (required)
  useEffect(() => {
    if (!isClient) return;
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      crossOrigin: true,
    });
  }, [isClient]);

  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedLT, setSelectedLT] = useState(null);

  // Custom icons
  const substationIcon = useMemo(() => {
    if (!isClient) return null;
    return L.divIcon({
      className: "substation-icon",
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      html: '<div class="substation-icon__box">SS</div>',
    });
  }, [isClient]);

  const ltIcon = useMemo(() => {
    if (!isClient) return null;
    return L.divIcon({
      className: "lt-icon",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      html: '<div class="lt-icon__box">LT</div>',
    });
  }, [isClient]);

  const substationPosition = [10.8505, 76.2711];

  const [ltNodes, setLtNodes] = useState(() => {
    const [lat, lng] = substationPosition;
    const radius = 0.18;

    return Array.from({ length: 7 }, (_, i) => {
      const angle = (2 * Math.PI * i) / 7;
      const pos = [
        lat + radius * Math.cos(angle),
        lng + radius * Math.sin(angle),
      ];
      return {
        id: `LT-${i + 1}`,
        name: `LT-${i + 1}`,
        position: pos,
        breakers: [
          { name: `CB-${i + 1}-1`, voltage: "11 kV", current: "140 A", status: "ON" },
          { name: `CB-${i + 1}-2`, voltage: "13 kV", current: "160 A", status: "ON" },
          { name: `CB-${i + 1}-3`, voltage: "15 kV", current: "180 A", status: "ON" },
        ],
      };
    });
  });

  const ltBranchLines = useMemo(() => {
    const segments = [];
    const branchLength = 0.34;
    const spread = Math.PI / 6;

    ltNodes.forEach((node, index) => {
      const [lat, lng] = node.position;
      const baseAngle = (2 * Math.PI * index) / ltNodes.length;

      for (let b = 0; b < 3; b++) {
        const angle = baseAngle + (b - 1) * spread;
        const endLat = lat + branchLength * Math.cos(angle);
        const endLng = lng + branchLength * Math.sin(angle);

        const dots = Array.from({ length: 3 }, () => {
          const t = 0.2 + Math.random() * 0.6;
          return [lat + (endLat - lat) * t, lng + (endLng - lng) * t];
        });

        segments.push({
          key: `line-${index}-${b}`,
          ltId: node.id,
          breakerIndex: b,
          positions: [[lat, lng], [endLat, endLng]],
          dots,
        });
      }
    });

    return segments;
  }, [ltNodes]);

  function toggleBreaker(ltId, breakerIndex) {
    setLtNodes((prev) =>
      prev.map((lt) =>
        lt.id === ltId
          ? {
              ...lt,
              breakers: lt.breakers.map((b, i) =>
                i === breakerIndex ? { ...b, status: b.status === "ON" ? "OFF" : "ON" } : b
              ),
            }
          : lt
      )
    );

    setSelectedLT((prev) =>
      prev
        ? {
            ...prev,
            breakers: prev.breakers.map((b, i) =>
              i === breakerIndex ? { ...b, status: b.status === "ON" ? "OFF" : "ON" } : b
            ),
          }
        : prev
    );
  }

  return (
    <div className="map-screen">
      <div className="map-container">
        {isClient ? (
          <MapContainer
            center={[10.8505, 76.2711]}
            zoom={10}
            className="leaflet-map"
            scrollWheelZoom
          >
            <MapContent />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker position={substationPosition} icon={substationIcon}>
              <Popup>Substation</Popup>
            </Marker>

            {ltNodes.map((node) => (
              <Fragment key={node.id}>
                <Marker
                  position={node.position}
                  icon={ltIcon}
                  eventHandlers={{
                    click: () => {
                      setSelectedLT(node);
                      setPanelOpen(true);
                    },
                  }}
                >
                  <Popup>{node.id}</Popup>
                </Marker>

                <Polyline
                  positions={[substationPosition, node.position]}
                  pathOptions={{ color: "#28a745", weight: 3 }}
                />
              </Fragment>
            ))}

            {ltBranchLines.map((s) => {
              const lt = ltNodes.find((n) => n.id === s.ltId);
              const breakerStatus = lt.breakers[s.breakerIndex].status;

              return (
                <Fragment key={s.key}>
                  <Polyline
                    positions={s.positions}
                    pathOptions={{
                      color: breakerStatus === "ON" ? "#009dff" : "red",
                      weight: 2,
                    }}
                  />

                  {s.dots.map((dot, idx) => (
                    <CircleMarker
                      key={idx}
                      center={dot}
                      radius={3}
                      pathOptions={{
                        color: breakerStatus === "ON" ? "#007bff" : "red",
                        fillOpacity: 1,
                      }}
                    />
                  ))}
                </Fragment>
              );
            })}
          </MapContainer>
        ) : (
          <div className="loading-message">Loading map…</div>
        )}
      </div>

      <InfoPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        selectedLT={selectedLT}
        toggleBreaker={toggleBreaker}
      />
    </div>
  );
}
