"use client"

import { motion } from "framer-motion"

export default function AIRecommendations() {
  const recommendations = [
    { id: 1, message: "Inventory low for item A in Hub 2", type: "warning" },
    { id: 2, message: "Route optimization suggested for Delivery 156", type: "info" },
    { id: 3, message: "Vehicle 078 requires maintenance", type: "danger" },
  ]

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">AI Recommendations</h2>
      {recommendations.map((rec, index) => (
        <motion.div
          key={rec.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`p-4 mb-4 rounded-lg ${
            rec.type === "warning" ? "bg-yellow-800" : rec.type === "info" ? "bg-blue-800" : "bg-red-800"
          }`}
        >
          {rec.message}
        </motion.div>
      ))}
    </div>
  )
}

