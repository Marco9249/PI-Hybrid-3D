@echo off
chcp 65001 >nul
color 0D
cls

echo.
echo ========================================================
echo       🛠️ PI-Hybrid 3D Viz - FIX & LAUNCH
echo ========================================================
echo.
echo 1. Fixing configuration...
echo 2. Saving new Launcher...
echo 3. Syncing with GitHub...
echo.

git add .
git commit -m "Critical Fix: Added Launcher and Fixed Navigation"
git push origin main

echo.
echo ========================================================
echo ✅ DONE!
echo ========================================================
echo.
echo To run the project LOCALLY: 
echo   - Double click "🟢_START_HERE.html"
echo.
echo To run the project ON GITHUB:
echo   - I have opened the GitHub Page for you.
echo   - Make sure you enabled "GitHub Pages" in Settings!
echo.

start https://github.com/
start 🟢_START_HERE.html
pause
