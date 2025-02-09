import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const inventoryData = [
  {
    id: 1,
    name: "Hub A",
    location: "New York",
    stock: 1000,
    route: {
      from: { lat: 40.7128, lng: -74.006 },
      to: { lat: 34.0522, lng: -118.2437 },
    },
  },
  {
    id: 2,
    name: "Hub B",
    location: "Los Angeles",
    stock: 800,
    route: {
      from: { lat: 34.0522, lng: -118.2437 },
      to: { lat: 41.8781, lng: -87.6298 },
    },
  },
  {
    id: 3,
    name: "Hub C",
    location: "Chicago",
    stock: 1200,
    route: {
      from: { lat: 41.8781, lng: -87.6298 },
      to: { lat: 29.7604, lng: -95.3698 },
    },
  },
]

export default function InventoryHub({ onHubSelect }) {
  return (
    <div className="grid gap-4">
      {inventoryData.map((hub) => (
        <Card key={hub.id} className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>{hub.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Location: {hub.location}</p>
            <p>Stock: {hub.stock}</p>
            <button
              onClick={() => onHubSelect(hub.route)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Show Route
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

