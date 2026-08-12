# RajnX-Weather

Premium futuristic Weather App with Glassmorphism UI.

Features
- Dark, glassmorphism UI with dynamic gradients and animations
- Current weather, hourly chart, 7-8 day forecast
- Search with autocomplete (OpenWeather geocoding)
- Unit toggle °C/°F
- Local storage for last location and favorites
- Service-layer design so provider can be swapped
- Responsive mobile-first layout

Setup
1. Copy .env.example to .env and set VITE_OPENWEATHER_API_KEY with your OpenWeather API key.
2. Install dependencies: npm install
3. Run: npm run dev

Notes
- API key is loaded from VITE_OPENWEATHER_API_KEY — never hardcode your key.
- The app uses OpenWeatherMap One Call API and Geocoding.

Testing flow
1. Open app
2. Allow location access (or search a city)
3. Weather loads
4. Search another city
5. Switch °C/°F
6. View hourly and 7-day forecasts
7. Refresh weather

License
MIT
