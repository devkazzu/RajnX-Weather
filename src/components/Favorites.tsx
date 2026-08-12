import React from 'react'

export const Favorites: React.FC<{ onSelect: (p: any) => void }> = ({ onSelect }) => {
  const favs = JSON.parse(localStorage.getItem('rxw:favorites') || '[]')
  return (
    <div>
      <h3 className="font-medium">Favorites</h3>
      <div className="mt-3 flex flex-col gap-2">
        {favs.length === 0 && <div className="text-slate-400 text-sm">No favorites yet.</div>}
        {favs.map((f: any, i: number) => (
          <button key={i} className="text-left p-2 rounded hover:bg-white/3" onClick={() => onSelect(f)}>{f.name}</button>
        ))}
      </div>
    </div>
  )
}
