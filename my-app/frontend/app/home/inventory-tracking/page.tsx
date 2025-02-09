"use client"

import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import InventoryHub from "@/components/InventoryHub"
import dynamic from "next/dynamic"

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false })

export default function InventoryTrackingPage() {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-48">
        <h1 className="text-4xl font-bold mb-8">Inventory & Micro Fulfillment Hub Tracking</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <InventoryHub />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
   
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MapComponent />
          </motion.div>
        </div>
      </main>
    </div>
  )
}

