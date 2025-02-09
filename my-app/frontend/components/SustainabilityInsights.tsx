"use client"

import { motion } from "framer-motion"
import Chart from "./Chart"

export default function SustainabilityInsights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Chart
          title="Carbon Emissions by Category"
          type="bar"
          data={{
            labels: ["Transportation", "Warehousing", "Packaging", "Other"],
            datasets: [
              {
                label: "CO2 Emissions (tons)",
                data: [120, 80, 60, 40],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                ],
              },
            ],
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Chart
          title="Annual Carbon Footprint Trend"
          type="line"
          data={{
            labels: ["2018", "2019", "2020", "2021", "2022"],
            datasets: [
              {
                label: "CO2 Emissions (tons)",
                data: [350, 320, 300, 280, 250],
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="md:col-span-2"
      >
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">AI Recommendations for Reducing Emissions</h2>
          <ul className="list-disc list-inside">
            <li>Optimize delivery routes to reduce fuel consumption</li>
            <li>Increase the use of electric vehicles in urban areas</li>
            <li>Implement energy-efficient practices in warehouses</li>
            <li>Use eco-friendly packaging materials</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

