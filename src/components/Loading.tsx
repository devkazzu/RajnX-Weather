import React from 'react'

export const Loading: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-8 flex flex-col items-center gap-4">
        <div className="loader w-16 h-16 rounded-full border-4 border-t-transparent border-slate-200/20"></div>
        <div className="text-slate-300">Loading weather…</div>
      </div>
    </div>
  )
}
