"use client"

import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import Chart from "@/components/Chart"

export default function AnalyticsDashboardPage() {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-48">
        <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Chart
              title="Delivery Efficiency"
              type="line"
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                  {
                    label: "Average Delivery Time (minutes)",
                    data: [120, 115, 130, 110, 105, 100],
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
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Chart
              title="Cost Efficiency"
              type="bar"
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                  {
                    label: "Cost per Delivery ($)",
                    data: [5.2, 5.1, 4.9, 4.8, 4.7, 4.5],
                    backgroundColor: "rgba(153, 102, 255, 0.6)",
                  },
                ],
              }}
            />
          </motion.div>
        </div>
      </main>
    </div>
  )
}

