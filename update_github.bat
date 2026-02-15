@echo off
chcp 65001 >nul
echo ==========================================
echo       تحديث مستودع GITHUB
echo       GitHub Repository Updater
echo ==========================================
echo.

echo 1. Pulling latest changes from online...
echo    (سحب التعديلات الجديدة لتجنب التعارض)
git pull origin main
echo.

echo 2. Adding all files...
echo    (تجهيز الملفات للرفع)
git add .
echo.

echo 3. Committing changes...
echo    (تأكيد التعديلات)
git commit -m "Auto-Update: New Features & Fixes"
echo.

echo 4. Pushing to GitHub...
echo    (رفع الملفات إلى الموقع)
git push origin main

echo.
echo ==========================================
echo       ✅ DONE! COMPLETED SUCCESSFULLY
echo       تم التحديث بنجاح!
echo ==========================================
echo.
echo You can close this window now.
pause
