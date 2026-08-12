import React, { useEffect, useState, useCallback } from 'react'
import { fetchWeatherByCoords, fetchGeocoding } from './services/weatherService'
import { UnitToggle } from './components/UnitToggle'
import { SearchBar } from './components/SearchBar'
import { WeatherCard } from './components/WeatherCard'
import { Forecast } from './components/Forecast'
import { HourlyChart } from './components/HourlyChart'
import { Loading } from './components/Loading'
import { ErrorState } from './components/ErrorState'
import { SettingsPanel } from './components/SettingsPanel'
import { Favorites } from './components/Favorites'
import dayjs from 'dayjs'

import type { WeatherResponse, Place } from './types'

const STORAGE_KEYS = {
  lastLocation: 'rxw:lastLocation',
  unit: 'rxw:unit',
  favorites: 'rxw:favorites',
  recent: 'rxw:recent',
}

export default function App() {
  const [unit, setUnit] = useState<'metric'|'imperial'>(() => (localStorage.getItem(STORAGE_KEYS.unit) as any) || 'metric')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<WeatherResponse | null>(null)
  const [place, setPlace] = useState<Place | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.lastLocation)
    return raw ? JSON.parse(raw) : null
  })
  const [lastUpdated, setLastUpdated] = useState<number | null>(null)
  const [showSettings, setShowSettings] = useState(false)

  const loadWeather = useCallback(async (lat: number, lon: number, label?: Place) => {
    setLoading(true)
    setError(null)
    try {
      const w = await fetchWeatherByCoords(lat, lon, unit)
      setData(w)
      setPlace(label || { name: w.timezone ?? 'Unknown', lat, lon })
      localStorage.setItem(STORAGE_KEYS.lastLocation, JSON.stringify({ name: label?.name ?? w.timezone, lat, lon }))
      setLastUpdated(Date.now())
    } catch (err: any) {
      setError(err?.message || 'Failed to load weather')
    } finally {
      setLoading(false)
    }
  }, [unit])

  useEffect(() => {
    const autoRefresh = setInterval(() => {
      if (place) loadWeather(place.lat, place.lon, place)
    }, 1000 * 60 * 10) // every 10 minutes
    return () => clearInterval(autoRefresh)
  }, [place, loadWeather])

  useEffect(() => {
    if (place) loadWeather(place.lat, place.lon, place)
  }, [unit])

  useEffect(() => {
    const tryGeolocation = async () => {
      if (place) return
      if (!('geolocation' in navigator)) return
      setLoading(true)
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          await loadWeather(pos.coords.latitude, pos.coords.longitude)
        } catch (e) {
          console.warn(e)
        }
      }, (err) => {
        console.warn('Location permission denied or unavailable', err)
        // fallback: nothing, user can search
        setLoading(false)
      }, { timeout: 8000 })
    }
    tryGeolocation()
  }, [])

  const onSearchSelect = async (p: Place) => {
    setError(null)
    await loadWeather(p.lat, p.lon, p)
  }

  const onSearchByName = async (q: string) => {
    setLoading(true)
    try {
      const res = await fetchGeocoding(q)
      if (res.length === 0) throw new Error('Location not found')
      const p = res[0]
      await onSearchSelect(p)
    } catch (e: any) {
      setError(e.message || 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  const refresh = async () => {
    if (place) await loadWeather(place.lat, place.lon, place)
  }

  if (loading && !data) return <Loading />
  if (error && !data) return <ErrorState message={error} onRetry={() => refresh()} />

  return (
    <div className="min-h-screen p-safe flex flex-col items-center justify-start bg-gradient-to-br from-[#05060a] via-[#071022] to-[#0b1020] text-slate-100">
      <div className="w-full max-w-5xl p-4 md:p-8">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">RajnX Weather</h1>
            <span className="text-sm text-slate-400">Futuristic Glass UI</span>
          </div>
          <div className="flex items-center gap-3">
            <UnitToggle unit={unit} onChange={(u) => { setUnit(u); localStorage.setItem(STORAGE_KEYS.unit, u) }} />
            <button aria-label="Settings" onClick={() => setShowSettings(v => !v)} className="glass-btn">⚙️</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="glass-card p-4 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <SearchBar onSelect={onSearchSelect} onSearch={onSearchByName} />
                  <div className="mt-4">
                    {data && place ? (
                      <WeatherCard data={data} place={place} unit={unit} onRefresh={refresh} lastUpdated={lastUpdated} />
                    ) : <div className="text-slate-400">No weather data yet — search a city or allow location.</div>}
                  </div>
                </div>

                <div className="w-60 hidden md:block">
                  <Favorites onSelect={onSearchSelect} />
                </div>
              </div>

              {data && (
                <div className="mt-6">
                  <Forecast daily={data.daily} unit={unit} />
                </div>
              )}
            </div>

            {data && (
              <div className="mt-6 glass-card p-4">
                <HourlyChart hourly={data.hourly} unit={unit} />
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="glass-card p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Details</h3>
                <button className="text-sm text-slate-400" onClick={() => refresh()}>Refresh</button>
              </div>
              {data && <div className="mt-3">
                <ul className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                  <li>Humidity: {data.current.humidity}%</li>
                  <li>Pressure: {data.current.pressure} hPa</li>
                  <li>Wind: {Math.round(data.current.wind_speed)} {unit === 'metric' ? 'm/s' : 'mph'}</li>
                  <li>Visibility: {data.current.visibility/1000} km</li>
                  <li>UV Index: {data.current.uvi}</li>
                  <li>Sunrise: {dayjs.unix(data.current.sunrise).format('HH:mm')}</li>
                  <li>Sunset: {dayjs.unix(data.current.sunset).format('HH:mm')}</li>
                </ul>
              </div>}
            </div>

            <div className="glass-card p-4">
              <h3 className="font-medium">Recent</h3>
              <div className="mt-3 text-sm text-slate-300">• Last updated: {lastUpdated ? dayjs(lastUpdated).fromNow() : '—'}</div>
            </div>

            <div className="glass-card p-4">
              <SettingsPanel open={showSettings} onClose={() => setShowSettings(false)} unit={unit} onUnitChange={(u) => { setUnit(u); localStorage.setItem(STORAGE_KEYS.unit, u) }} />
            </div>
          </aside>
        </div>

        <footer className="mt-8 text-center text-sm text-slate-500">© RajnX Weather — Premium Glassmorphism UI</footer>
      </div>
    </div>
  )
}
