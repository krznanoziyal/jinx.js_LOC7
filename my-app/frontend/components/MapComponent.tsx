"use client"

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "400px",
}

const center = {
  lat: 20.5937,
  lng: 78.9629,
}

export default function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  })

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <></>
  )
}

