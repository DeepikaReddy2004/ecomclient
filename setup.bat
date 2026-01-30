@echo off
REM AZONMART Frontend - Setup & Run Script for Windows
REM This script will install dependencies and start the development server

echo.
echo ======================================================================
echo  🚀 Starting AZONMART Frontend Setup...
echo ======================================================================
echo.

REM Step 1: Check if node is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do (
    echo ✅ Node.js found: %%i
)
echo.

REM Step 2: Install dependencies
echo 📦 Installing dependencies...
echo    This may take a few minutes...
echo.
call npm install

if errorlevel 1 (
    echo.
    echo ❌ Failed to install dependencies
    echo    Check your internet connection and try again
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully
echo.

REM Step 3: Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    copy .env.example .env >nul
    echo ✅ .env file created
    echo    Please update VITE_BACKEND_API if needed
) else (
    echo ✅ .env file already exists
)

echo.
echo ======================================================================
echo  🎉 Setup Complete!
echo ======================================================================
echo.
echo 📋 Next Steps:
echo.
echo 1. Make sure your backend is running on port 3000:
echo    node server.js
echo.
echo 2. Start the development server:
echo    npm run dev
echo.
echo 3. Open your browser and navigate to:
echo    http://localhost:5173
echo.
echo ======================================================================
echo.
echo 📚 Available Commands:
echo    npm run dev     - Start development server
echo    npm run build   - Build for production
echo    npm run preview - Preview production build
echo    npm run lint    - Run ESLint
echo.
echo 🆘 Need Help?
echo    - Check QUICK_START.md for quick setup guide
echo    - Check FRONTEND_SETUP.md for detailed guide
echo    - Check BUILD_SUMMARY.md for complete feature list
echo.
echo ======================================================================
echo.
pause
