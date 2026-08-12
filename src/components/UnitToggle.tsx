import React from 'react'

export const UnitToggle: React.FC<{ unit: 'metric'|'imperial'; onChange: (u: 'metric'|'imperial') => void }> = ({ unit, onChange }) => {
  return (
    <div className="p-1 bg-white/3 rounded-full flex items-center text-sm">
      <button onClick={() => onChange('metric')} className={`px-3 py-1 rounded-full ${unit==='metric'?'bg-white/8':''}`}>°C</button>
      <button onClick={() => onChange('imperial')} className={`px-3 py-1 rounded-full ${unit==='imperial'?'bg-white/8':''}`}>°F</button>
    </div>
  )
}
