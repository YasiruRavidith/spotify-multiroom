#!/usr/bin/env pwsh
# Setup script for Spotify Multi-Room Player

Write-Host "🎵 Spotify Multi-Room Player - Setup Script" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Cyan
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Node.js $nodeVersion detected" -ForegroundColor Green
Write-Host ""

# Install backend dependencies
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Cyan
Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
Set-Location ..
Write-Host ""

# Install frontend dependencies
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
Set-Location ..
Write-Host ""

# Check if .env files exist
Write-Host "🔍 Checking configuration files..." -ForegroundColor Cyan
if (-not (Test-Path "backend\.env")) {
    Write-Host "⚠️  backend\.env not found, copying from example..." -ForegroundColor Yellow
    Copy-Item "backend\.env.example" "backend\.env"
    Write-Host "📝 Please edit backend\.env with your Spotify credentials" -ForegroundColor Yellow
}

if (-not (Test-Path "frontend\.env")) {
    Write-Host "⚠️  frontend\.env not found, copying from example..." -ForegroundColor Yellow
    Copy-Item "frontend\.env.example" "frontend\.env"
}
Write-Host "✅ Configuration files ready" -ForegroundColor Green
Write-Host ""

# Check for Spotify credentials
$envContent = Get-Content "backend\.env" -Raw
if ($envContent -match "your_client_id_here") {
    Write-Host "⚠️  You need to add Spotify credentials!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Go to https://developer.spotify.com/dashboard" -ForegroundColor White
    Write-Host "2. Create a new app" -ForegroundColor White
    Write-Host "3. Copy Client ID and Client Secret" -ForegroundColor White
    Write-Host "4. Edit backend\.env and add them" -ForegroundColor White
    Write-Host "5. Run: cd backend; npm start" -ForegroundColor White
    Write-Host "6. Visit http://localhost:3001/auth/url to authorize" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "✅ Spotify credentials found in .env" -ForegroundColor Green
    Write-Host ""
    
    # Check for refresh token
    if ($envContent -match "SPOTIFY_REFRESH_TOKEN=\s*$") {
        Write-Host "⚠️  No refresh token found!" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Run: cd backend; npm start" -ForegroundColor White
        Write-Host "2. Visit http://localhost:3001/auth/url" -ForegroundColor White
        Write-Host "3. Authorize with your Spotify Premium account" -ForegroundColor White
        Write-Host "4. Copy the refresh token to backend\.env" -ForegroundColor White
        Write-Host "5. Restart the backend server" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "✅ Refresh token configured" -ForegroundColor Green
        Write-Host ""
        Write-Host "🎉 Setup complete! Ready to run!" -ForegroundColor Green
        Write-Host ""
        Write-Host "To start the application:" -ForegroundColor Cyan
        Write-Host "Terminal 1: cd backend; npm start" -ForegroundColor White
        Write-Host "Terminal 2: cd frontend; npm run dev" -ForegroundColor White
        Write-Host ""
        Write-Host "Then open http://localhost:5173 in your browser!" -ForegroundColor Green
        Write-Host ""
    }
}

Write-Host "============================================" -ForegroundColor Green
Write-Host "For detailed instructions, see SETUP.md" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Green
