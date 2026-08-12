export type Place = { name: string; lat: number; lon: number }

export type WeatherResponse = {
  lat: number
  lon: number
  timezone: string
  current: {
    dt: number
    temp: number
    feels_like: number
    humidity: number
    pressure: number
    wind_speed: number
    wind_deg: number
    visibility: number
    uvi: number
    sunrise: number
    sunset: number
    weather: Array<{ id: number; main: string; description: string; icon: string }>
  }
  hourly: Array<any>
  daily: Array<any>
}
