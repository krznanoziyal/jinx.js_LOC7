import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

export default function MapComponent({ route }) {
  const center = [39.8283, -98.5795] // Center of the US

  return (
    <MapContainer center={center} zoom={4} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {route && (
        <>
          <Polyline
            positions={[
              [route.from.lat, route.from.lng],
              [route.to.lat, route.to.lng],
            ]}
            color="red"
          />
          <Marker position={[route.from.lat, route.from.lng]} />
          <Marker position={[route.to.lat, route.to.lng]} />
        </>
      )}
    </MapContainer>
  )
}

