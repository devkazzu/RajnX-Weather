import React from 'react'

export const WeatherVisual: React.FC<{
  condition: string
  isNight?: boolean
}> = ({ condition, isNight = false }) => {
  const cond = (condition || '').toLowerCase()
  const isClear = cond.includes('clear')
  const isCloud = cond.includes('cloud')
  const isRain = cond.includes('rain') || cond.includes('drizzle')
  const isSnow = cond.includes('snow')
  const isThunder = cond.includes('thunder')

  return (
    <div className="weather-visual">
      <div className={`weather-visual__bg ${isNight ? 'night' : isClear ? 'clear' : isCloud ? 'cloud' : 'storm'}`} />
      {isClear && !isNight && <div className="weather-sun" aria-hidden="true" />}
      {isNight && <div className="weather-moon" aria-hidden="true" />}
      {(isCloud || isRain || isThunder) && <div className="weather-cloud weather-cloud--one" aria-hidden="true" />}
      {(isCloud || isRain || isThunder) && <div className="weather-cloud weather-cloud--two" aria-hidden="true" />}
      {isRain && <div className="weather-rain" aria-hidden="true">{Array.from({length: 18}, (_, i) => <i key={i} />)}</div>}
      {isSnow && <div className="weather-snow" aria-hidden="true">{Array.from({length: 16}, (_, i) => <i key={i}>✦</i>)}</div>}
      {isThunder && <div className="weather-lightning" aria-hidden="true" />}
    </div>
  )
}
