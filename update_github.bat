@echo off
echo ==========================================
echo       UPDATING GITHUB REPOSITORY
echo ==========================================
echo.
echo 1. Adding files...
git add .
echo.
echo 2. Committing changes...
set /p msg="Enter commit message (Press Enter for 'Update project improvements'): "
if "%msg%"=="" set msg=Update project improvements
git commit -m "%msg%"
echo.
echo 3. Pushing to GitHub...
git push
echo.
echo ==========================================
echo       UPDATE COMPLETE!
echo ==========================================
pause
