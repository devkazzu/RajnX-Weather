import React from 'react'
import dayjs from 'dayjs'
import type { WeatherResponse } from '../types'

export const WeatherCard: React.FC<{ data: WeatherResponse; place: { name: string }; unit: string; onRefresh?: () => void; lastUpdated?: number | null }> = ({ data, place, unit, onRefresh, lastUpdated }) => {
  const cur = data.current
  const icon = cur.weather?.[0]?.icon ?? '01d'
  const temp = Math.round(cur.temp)
  const feels = Math.round(cur.feels_like)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-2">
        <div className="flex items-center gap-4">
          <div className="w-28 h-28 flex items-center justify-center bg-white/5 rounded-lg">
            <img src={`https://openweathermap.org/img/wn/${icon}@4x.png`} alt="weather" className="w-20 h-20" />
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-semibold">{temp}° {unit === 'metric' ? 'C' : 'F'}</div>
            <div className="text-slate-300">Feels like {feels}°</div>
            <div className="mt-2 text-slate-400">{place.name} • {data.timezone}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        <div className="text-sm text-slate-300">Today • High {Math.round(data.daily?.[0]?.temp?.max ?? temp)} / Low {Math.round(data.daily?.[0]?.temp?.min ?? temp)}</div>
        <div className="text-sm text-slate-300">Humidity {cur.humidity}%</div>
        <div className="text-sm text-slate-300">Wind {Math.round(cur.wind_speed)} {unit === 'metric' ? 'm/s' : 'mph'}</div>
        <div className="flex items-center gap-2">
          <button className="btn" onClick={onRefresh}>Refresh</button>
          <div className="text-xs text-slate-400">{lastUpdated ? dayjs(lastUpdated).format('HH:mm:ss') : '—'}</div>
        </div>
      </div>
    </div>
  )
}
