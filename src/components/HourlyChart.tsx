import React, { useMemo } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend } from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'
import dayjs from 'dayjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend)

export const HourlyChart: React.FC<{ hourly: any[]; unit: string }> = ({ hourly = [], unit }) => {
  const h24 = hourly.slice(0, 24)
  const labels = h24.map(h => dayjs.unix(h.dt).format('HH:mm'))
  const temps = h24.map(h => Math.round(h.temp))
  const pops = h24.map(h => Math.round((h.pop ?? 0) * 100))

  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: `Temp (${unit === 'metric' ? '°C' : '°F'})`,
        data: temps,
        borderColor: '#7dd3fc',
        backgroundColor: '#0369a1',
        tension: 0.3,
        yAxisID: 'y',
      },
      {
        type: 'bar' as const,
        label: 'Precip (%)',
        data: pops,
        backgroundColor: '#a78bfa88',
        yAxisID: 'y1',
      }
    ]
  }), [labels.join(','), temps.join(','), pops.join(','), unit])

  const options = {
    responsive: true,
    interaction: { mode: 'index' as const, intersect: false },
    scales: {
      y: { position: 'left', grid: { color: 'transparent' } },
      y1: { position: 'right', grid: { display: false }, min: 0, max: 100 }
    }
  }

  return (
    <div>
      <h4 className="font-medium mb-3">24 hr trend</h4>
      <div>
        <Line data={data} options={options as any} />
      </div>
    </div>
  )
}
