#requires -Version 5.1
<#
.SYNOPSIS
  Build the app and serve a production preview locally on port 3001.

.DESCRIPTION
  - Kills any process listening on port 3001.
  - Runs `npm run build`.
  - Starts the production server on port 3001 in a new PowerShell window.
  - Opens http://localhost:3001 in the default browser.
#>

$ErrorActionPreference = 'Stop'

$port = 3001
$url = "http://localhost:$port"

# Resolve project root (parent of this scripts/ folder)
$projectRoot = Split-Path -Parent $PSScriptRoot

Write-Host "Project root: $projectRoot"

# 1. Kill any process listening on the preview port
Write-Host "Checking for processes on port $port..."
try {
    $connections = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction Stop
    foreach ($conn in $connections) {
        $procId = $conn.OwningProcess
        if ($procId -and $procId -ne 0) {
            Write-Host "Stopping process $procId on port $port..."
            Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
        }
    }
} catch {
    Write-Host "No process listening on port $port."
}

# 2. Build
Write-Host "Running npm run build..."
Push-Location $projectRoot
try {
    npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "npm run build failed with exit code $LASTEXITCODE"
    }
} finally {
    Pop-Location
}

# 3. Start production server on port 3001 in a new PowerShell window
Write-Host "Starting production server on port $port in a new window..."
$startCommand = "Set-Location -LiteralPath '$projectRoot'; npm run start -- -p $port"
Start-Process powershell -ArgumentList '-NoExit', '-Command', $startCommand

# 4. Open the browser
Write-Host "Opening $url ..."
Start-Sleep -Seconds 3
Start-Process $url

Write-Host "Preview launching at $url"
