import axios from 'axios'
import type { WeatherResponse, Place } from '../types'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
if (!API_KEY) console.warn('VITE_OPENWEATHER_API_KEY not set — please add it to .env')

const BASE = 'https://api.openweathermap.org'

export async function fetchGeocoding(query: string): Promise<Place[]> {
  const url = `${BASE}/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
  const res = await axios.get(url)
  return res.data.map((d: any) => ({ name: `${d.name}${d.state ? ', '+d.state : ''}, ${d.country}`, lat: d.lat, lon: d.lon }))
}

export async function reverseGeocoding(lat: number, lon: number): Promise<Place | null> {
  const url = `${BASE}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
  const res = await axios.get(url)
  const d = res.data?.[0]
  if (!d) return null
  return { name: `${d.name}${d.state ? ', '+d.state : ''}, ${d.country}`, lat: d.lat, lon: d.lon }
}

export async function fetchWeatherByCoords(lat: number, lon: number, units: 'metric'|'imperial' = 'metric'): Promise<WeatherResponse> {
  const url = `${BASE}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,alerts&appid=${API_KEY}`
  const res = await axios.get(url)
  return res.data
}

export const WeatherProvider = {
  fetchGeocoding,
  reverseGeocoding,
  fetchWeatherByCoords,
}
