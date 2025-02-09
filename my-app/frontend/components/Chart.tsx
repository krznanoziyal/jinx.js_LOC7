"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line, Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

interface ChartProps {
  title: string
  type: "line" | "bar"
  data: any
}

export default function Chart({ title, type, data }: ChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      {type === "line" ? <Line options={options} data={data} /> : <Bar options={options} data={data} />}
    </div>
  )
}

