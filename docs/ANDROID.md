# RajnX Weather — Android build

This Vite + React app can be packaged with Capacitor.

## Local build

1. `npm install`
2. Add the Android platform once: `npx cap add android`
3. `npm run build:web`
4. `npx cap sync android`
5. `cd android && ./gradlew assembleDebug`

The app ID is `com.devkazzu.rajnxweather`.

## GitHub Actions

The workflow `.github/workflows/android-debug.yml` builds the web app, syncs Capacitor, builds a debug APK, and uploads the APK as an artifact.

Add the repository secret `VITE_OPENWEATHER_API_KEY` before running the workflow.

Do not commit `.env` or API keys.
