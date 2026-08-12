#!/usr/bin/env bash
set -euo pipefail
npm run build:web
npx cap sync android
cd android
./gradlew assembleDebug
echo "APK: android/app/build/outputs/apk/debug/"
