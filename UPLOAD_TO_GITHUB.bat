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
echo       🚀 PI-Hybrid 3D Viz - GitHub Upload Wizard
echo ========================================================
echo.
echo This script will help you upload your project to GitHub.
echo.
echo We will:
echo  1. 👤 Configure your Git Identity
echo  2. 📦 Commit your files
echo  3. 🌍 Push to a new GitHub Repository
echo.
pause

cls
echo ========================================================
echo 👤 STEP 1: Git Identity
echo ========================================================
echo.
echo Enter your Name (e.g., Mohammed Ali):
set /p GitName="> "
git config user.name "%GitName%"

echo Enter your Email (e.g., email@example.com):
set /p GitEmail="> "
git config user.email "%GitEmail%"

cls
echo ========================================================
echo 📦 STEP 2: Commit Files
echo ========================================================
echo.
git init
git add .
git commit -m "Initial launch: PI-Hybrid 3D Solar Forecasting Visualization"
echo.
echo ✅ Files committed successfully!
echo.
pause

cls
echo ========================================================
echo 🌍 STEP 3: Connect to GitHub
echo ========================================================
echo.
echo I will now open GitHub for you to create the repository.
echo.
echo 1. Name the repository: PI-Hybrid-3D-Viz
echo 2. Descriptions: (Optional) 3D Solar Forecasting
echo 3. ⚠️  IMPORTANT: Do NOT check "Initialize with README/License"
echo 4. Click "Create repository"
echo 5. Copy the HTTPS URL (ends in .git) after creation.
echo.
echo Press any key to open GitHub...
pause >nul
start https://github.com/new

echo.
echo 🔗 Paste the HTTPS URL you just copied below:
set /p RepoURL="> "

echo.
echo 🚀 Connecting and Pushing...
git remote remove origin 2>nul
git remote add origin %RepoURL%
git branch -M main
git push -u origin main

cls
echo ========================================================
echo ✨ SUCCESS! Your project is now live on GitHub.
echo ========================================================
echo.
echo To enable the Live Site (GitHub Pages):
echo 1. Go to your Repo Settings > Pages
echo 2. Set "Source" to "Deploy from a branch" -> "main"
echo 3. Click Save!
echo.
pause
