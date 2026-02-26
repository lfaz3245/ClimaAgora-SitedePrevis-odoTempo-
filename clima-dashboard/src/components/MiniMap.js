import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MiniMap({ coord, city }) {
  if (!coord) return null;

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[coord.lat, coord.lon]}
        zoom={11}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={[coord.lat, coord.lon]}>
          <Popup>{city}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}