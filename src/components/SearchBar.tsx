import React, { useState, useEffect } from 'react'
import { fetchGeocoding } from '../services/weatherService'
import type { Place } from '../types'

export const SearchBar: React.FC<{ onSelect: (p: Place) => void; onSearch: (q: string) => void }> = ({ onSelect, onSearch }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Place[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) return setSuggestions([])
    const t = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetchGeocoding(query)
        setSuggestions(res)
      } catch (e) {
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(t)
  }, [query])

  return (
    <div>
      <div className="flex gap-2">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search city or ZIP" className="w-full input" />
        <button className="btn" onClick={() => onSearch(query)} aria-label="Search">Search</button>
      </div>
      {suggestions.length > 0 && (
        <div className="mt-2 p-2 bg-white/5 rounded-md backdrop-blur-sm shadow-inner">
          {suggestions.map((s, idx) => (
            <button key={idx} className="w-full text-left p-2 rounded hover:bg-white/3" onClick={() => { onSelect(s); setQuery('') }}>
              {s.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
