import React from 'react'

export const SettingsPanel: React.FC<{ open: boolean; onClose: () => void; unit: string; onUnitChange: (u: 'metric'|'imperial') => void }> = ({ open, onClose, unit, onUnitChange }) => {
  if (!open) return null
  return (
    <div className="p-3">
      <h3 className="font-medium">Settings</h3>
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>Units</div>
          <div className="flex gap-2">
            <button className={`px-2 py-1 rounded ${unit==='metric'?'bg-white/8':''}`} onClick={() => onUnitChange('metric')}>°C</button>
            <button className={`px-2 py-1 rounded ${unit==='imperial'?'bg-white/8':''}`} onClick={() => onUnitChange('imperial')}>°F</button>
          </div>
        </div>
        <div className="text-sm text-slate-400">Theme and other settings coming soon.</div>
        <div className="mt-3"><button className="btn" onClick={onClose}>Close</button></div>
      </div>
    </div>
  )
}
