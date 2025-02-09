"use client"

import { motion } from "framer-motion"

const orders = [
  { id: 1, status: "In Transit", location: "Mumbai", time: "2h 15m", mode: "Standard" },
  { id: 2, status: "Delivered", location: "Delhi", time: "1h 30m", mode: "Super Fast" },
  { id: 3, status: "Pending", location: "Bangalore", time: "3h 45m", mode: "Eco-Friendly" },
]

interface OrderListProps {
  onSelectOrder: (order: any) => void
}

export default function OrderList({ onSelectOrder }: OrderListProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {orders.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gray-800 p-4 mb-4 rounded-lg cursor-pointer"
          onClick={() => onSelectOrder(order)}
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="font-bold">Order #{order.id}</h3>
          <p>Status: {order.status}</p>
          <p>Location: {order.location}</p>
          <p>Time: {order.time}</p>
          <p>Mode: {order.mode}</p>
        </motion.div>
      ))}
    </div>
  )
}

