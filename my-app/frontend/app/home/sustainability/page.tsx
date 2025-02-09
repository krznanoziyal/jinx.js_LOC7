"use client"
import Navigation from "@/components/Navigation"
import SustainabilityInsights from "@/components/SustainabilityInsights"

export default function SustainabilityPage() {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-48">
        <h1 className="text-4xl font-bold mb-8">Sustainability Insights</h1>
        <SustainabilityInsights />
      </main>
    </div>
  )
}

