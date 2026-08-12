import { Geolocation } from '@capacitor/geolocation'

export async function requestLocationPermission(): Promise<boolean> {
  try {
    const status = await Geolocation.checkPermissions()
    if (status.location === 'granted') return true
    const requested = await Geolocation.requestPermissions()
    return requested.location === 'granted'
  } catch (error) {
    console.warn('Geolocation permission check failed', error)
    return false
  }
}

export async function getCurrentPosition(): Promise<{ lat: number; lon: number } | null> {
  try {
    const pos = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    })
    return { lat: pos.coords.latitude, lon: pos.coords.longitude }
  } catch (error) {
    console.warn('Capacitor geolocation failed', error)
    return null
  }
}
