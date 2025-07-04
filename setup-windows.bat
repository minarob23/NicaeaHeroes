@echo off
title Nicaea Heroes - Windows Setup
echo ============================================
echo    Nicaea Heroes - Windows Setup Script
echo ============================================
echo.

:: Check if Node.js is installed
echo [1/7] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org
    pause
    exit /b 1
)
echo ✓ Node.js is installed

:: Check if PostgreSQL is installed
echo [2/7] Checking PostgreSQL installation...
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: PostgreSQL is not installed!
    echo Please download and install PostgreSQL from: https://www.postgresql.org/download/windows/
    pause
    exit /b 1
)
echo ✓ PostgreSQL is installed

:: Setup environment file
echo [3/7] Setting up environment configuration...
if not exist .env (
    if exist .env.local (
        copy .env.local .env >nul
        echo ✓ Environment file created from template
    ) else (
        echo WARNING: No .env template found. Creating basic .env file...
        (
            echo DATABASE_URL=postgresql://postgres:password@localhost:5432/nicaea_heroes
            echo PGHOST=localhost
            echo PGPORT=5432
            echo PGDATABASE=nicaea_heroes
            echo PGUSER=postgres
            echo PGPASSWORD=password
            echo NODE_ENV=development
            echo PORT=5000
            echo SESSION_SECRET=windows-dev-secret-key
        ) > .env
        echo ✓ Basic .env file created
    )
) else (
    echo ✓ Environment file already exists
)

:: Install dependencies
echo [4/7] Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo ✓ Dependencies installed

:: Check database connection
echo [5/7] Testing database connection...
psql -h localhost -U postgres -d postgres -c "\q" >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: Cannot connect to PostgreSQL
    echo Please ensure PostgreSQL is running and credentials are correct
    echo You may need to create the database manually
    echo.
    echo To create the database:
    echo 1. Open Command Prompt as Administrator
    echo 2. Run: psql -U postgres
    echo 3. Run: CREATE DATABASE nicaea_heroes;
    echo 4. Run: \q
    echo.
    set /p continue="Continue anyway? (y/n): "
    if /i "%continue%" neq "y" (
        exit /b 1
    )
) else (
    echo ✓ Database connection successful
)

:: Create database if it doesn't exist
echo [6/7] Setting up database schema...
npm run db:push >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Database schema created
) else (
    echo WARNING: Could not create database schema
    echo You may need to create the database manually
)

:: Final setup
echo [7/7] Final setup...
echo ✓ Setup completed!
echo.
echo ============================================
echo           Setup Complete!
echo ============================================
echo.
echo To start the development server:
echo   npm run dev
echo.
echo To build for production:
echo   npm run build
echo   npm start
echo.
echo Application will be available at:
echo   http://localhost:5000
echo.
echo For troubleshooting, see: WINDOWS-SETUP.md
echo.
pause