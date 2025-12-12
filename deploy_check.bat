@echo off
echo ==========================================
echo ACTA - Deploy Check & Push Script
echo ==========================================

echo [1/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] npm install failed.
    pause
    exit /b %errorlevel%
)

echo [2/4] Building project...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed.
    pause
    exit /b %errorlevel%
)

if not exist dist\index.html (
    echo [ERROR] Build artifacts missing (dist/index.html).
    pause
    exit /b 1
)

echo [SUCCESS] Build verified.

echo [3/4] Git Operations...
git status
echo Adding files...
git add .
echo Committing...
git commit -m "Chore: Refactorización de arquitectura (Src/Server/Public) y Configuración de Build para Hostinger"

echo [4/4] Pushing to Remote...
git push origin main

if %errorlevel% neq 0 (
    echo [ERROR] Git push failed. Please check your credentials.
    pause
    exit /b %errorlevel%
)

echo ==========================================
echo ✅ Repositorio actualizado y listo.
echo ==========================================
pause
