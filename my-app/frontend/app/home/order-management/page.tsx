"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import OrderList from "@/components/OrderList"
import dynamic from "next/dynamic"

const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false })

export default function OrderManagementPage() {
  const [selectedOrder, setSelectedOrder] = useState(null)

  return (
    <div className="flex bg-black text-white min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-48">
        <h1 className="text-4xl font-bold mb-8">Order Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <OrderList onSelectOrder={setSelectedOrder} />
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

