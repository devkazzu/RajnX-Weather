import React from 'react'
import dayjs from 'dayjs'

export const Forecast: React.FC<{ daily: any[]; unit: string }> = ({ daily = [], unit }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3">
        {daily.slice(0, 8).map((d, i) => (
          <div key={i} className="w-32 p-3 bg-white/3 rounded-xl backdrop-blur-sm border border-white/6 shadow-glass flex-shrink-0">
            <div className="font-medium">{dayjs.unix(d.dt).format('ddd')}</div>
            <div className="mt-1"><img src={`https://openweathermap.org/img/wn/${d.weather?.[0]?.icon}@2x.png`} alt="icon" className="w-10 h-10 mx-auto" /></div>
            <div className="mt-2 text-sm text-slate-200">{Math.round(d.temp.max)}° / {Math.round(d.temp.min)}°</div>
            <div className="mt-1 text-xs text-slate-400">{Math.round((d.pop ?? 0) * 100)}% precip</div>
          </div>
        ))}
      </div>
    </div>
  )
}
