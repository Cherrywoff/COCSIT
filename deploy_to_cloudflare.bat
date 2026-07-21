@echo off
echo =======================================================
echo    COCSIT College ERP - Cloudflare Deployment Script
echo =======================================================
echo.

echo [1/3] Navigating to frontend directory...
cd frontend || exit /b

echo [2/3] Building the production assets (React SPA)...
call npm run build
if %errorlevel% neq 0 (
    echo Error: Build failed!
    pause
    exit /b
)

echo [3/3] Deploying to Cloudflare Pages...
echo Note: If this is your first time, a browser window will open asking you to log into Cloudflare.
call npx wrangler pages deploy dist --project-name cocsitcollege

echo.
echo =======================================================
echo    Deployment Complete!
echo    Your live URL should be: https://cocsitcollege.pages.dev
echo =======================================================
pause
