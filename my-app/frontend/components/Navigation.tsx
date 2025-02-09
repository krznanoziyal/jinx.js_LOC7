"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const navItems = [
  { label: "Home", path: "/home" },
  { label: "Orders", path: "/home/order-management" },
  { label: "Inventory", path: "/home/inventory-tracking" },
  { label: "Analytics", path: "/home/analytics" },
  { label: "Sustainability", path: "/home/sustainability" },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-black text-white p-4 fixed left-0 top-0 h-full w-48">
      <h1 className="text-2xl font-bold mb-8">LogiYATRA</h1>
      <ul>
        {navItems.map((item) => (
          <li key={item.path} className="mb-4">
            <Link href={item.path} className="block">
              <motion.div
                whileHover={{ x: 5 }}
                className={`p-2 rounded ${pathname === item.path ? "bg-white text-black" : ""}`}
              >
                {item.label}
              </motion.div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

