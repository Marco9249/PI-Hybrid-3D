@echo off
chcp 65001 >nul
color 0B
cls

echo.
echo      / \__
echo     (    @\___
echo     /         O
echo    /   (____/
echo   /_____/   U
echo.
echo ========================================================
echo 🚀 PI-Hybrid 3D Viz - Updating Repository
echo ========================================================
echo.
echo 📦 Adding new changes...
git add .
git commit -m "Update: Added Neural Navigation Dock (Glassmorphism)"

echo.
echo 🌍 Pushing to GitHub...
git push origin main

echo.
echo ========================================================
echo ✅ DONE! Your repository is updated.
echo ========================================================
echo.
pause
