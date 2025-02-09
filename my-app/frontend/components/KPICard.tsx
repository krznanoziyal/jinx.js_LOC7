"use client"

import { motion } from "framer-motion"

interface KPICardProps {
  title: string
  value: number | string
  change: number
}

export default function KPICard({ title, value, change }: KPICardProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-900 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className={`text-sm ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
        {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
      </p>
    </motion.div>
  )
}

