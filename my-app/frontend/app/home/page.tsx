"use client"

import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import AIRecommendations from "@/components/AIRecommendations"
import KPICard from "@/components/KPICard"
import dynamic from "next/dynamic"

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false })

export default function HomePage() {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-48">
        <h1 className="text-4xl font-bold mb-8">Home Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <AIRecommendations />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MapComponent />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <KPICard title="Active Deliveries" value={152} change={5} />
          <KPICard title="Avg. Delivery Time" value="2h 15m" change={-10} />
          <KPICard title="Cost Efficiency" value="92%" change={3} />
        </motion.div>
      </main>
    </div>
  )
}

