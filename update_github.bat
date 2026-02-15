@echo off
echo ==========================================
echo       UPDATING GITHUB REPOSITORY
echo         [Advanced Sync Script]
echo ==========================================
echo.

echo 1. Checking status...
git status
echo.

echo 2. Staging all changes...
git add .
echo.

echo 3. Committing changes...
set /p msg="Enter commit message (Press Enter for 'Auto Update: %date% %time%'): "
if "%msg%"=="" set msg=Auto Update: %date% %time%
git commit -m "%msg%"
echo.

echo 4. Pulling latest changes (to avoid conflicts)...
git pull origin main
echo.

echo 5. Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed! Trying 'master' branch...
    git push origin master
)

echo.
echo ==========================================
echo       UPDATE COMPLETE!
echo       Check your repo online.
echo ==========================================
pause
