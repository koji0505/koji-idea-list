@echo off
echo Starting mobile app (Expo)...
echo.
echo Note: For real device testing, change API_URL in mobile\src\config\api.js
echo to your PC's IP address
echo.
cd mobile
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)
call npm start
