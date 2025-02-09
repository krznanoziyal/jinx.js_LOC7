"use client"

import { motion } from "framer-motion"

const inventoryData = [
  { id: 1, name: "Metro Station Hub", stock: 85 },
  { id: 2, name: "Mall Hub", stock: 62 },
  { id: 3, name: "Kirana Store Hub", stock: 73 },
]

export default function InventoryHub() {
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Micro Fulfillment Hubs</h2>
      {inventoryData.map((hub, index) => (
        <motion.div
          key={hub.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gray-800 p-4 mb-4 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="font-bold">{hub.name}</h3>
          <p>Stock Level: {hub.stock}%</p>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${hub.stock}%` }}></div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

