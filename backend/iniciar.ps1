# Script de inicio para Bolivariano API - Windows PowerShell
# Uso: .\iniciar.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   BOLIVARIANO API - INICIO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "main.py")) {
    Write-Host "Error: Este script debe ejecutarse desde el directorio backend/" -ForegroundColor Red
    exit 1
}

# Paso 1: Verificar Python
Write-Host "[1/4] Verificando Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version
    Write-Host "  ✓ $pythonVersion instalado" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Python no está instalado" -ForegroundColor Red
    exit 1
}

# Paso 2: Instalar dependencias
Write-Host ""
Write-Host "[2/4] Instalando dependencias..." -ForegroundColor Yellow
pip install -r requirements.txt --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host "  ✗ Error al instalar dependencias" -ForegroundColor Red
    exit 1
}

# Paso 3: Verificar archivo .env
Write-Host ""
Write-Host "[3/4] Verificando configuración..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "  ✓ Archivo .env encontrado" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Archivo .env NO encontrado" -ForegroundColor Yellow
    Write-Host "  → Creando .env de ejemplo..." -ForegroundColor Yellow
    
    $envContent = @"
# Configuración de Base de Datos
DATABASE_URL=postgresql://user:password@host:port/database

# Clave secreta para JWT
SECRET_KEY=default_secret_key

# Puerto del servidor
PORT=8000
"@
    Set-Content -Path ".env" -Value $envContent
    Write-Host "  ✓ Archivo .env creado. ¡CONFIGÚRALO ANTES DE CONTINUAR!" -ForegroundColor Yellow
    Write-Host "  → Edita el archivo .env con tus credenciales de base de datos" -ForegroundColor Yellow
    
    $continue = Read-Host "¿Deseas continuar de todas formas? (s/n)"
    if ($continue -ne 's') {
        Write-Host "Proceso cancelado. Configura .env y vuelve a ejecutar." -ForegroundColor Red
        exit 0
    }
}

# Paso 4: Preguntar si desea inicializar la base de datos
Write-Host ""
Write-Host "[4/4] Inicialización de base de datos..." -ForegroundColor Yellow
$initDb = Read-Host "¿Deseas inicializar/actualizar la base de datos? (s/n)"

if ($initDb -eq 's') {
    Write-Host "  → Ejecutando init_db.py..." -ForegroundColor Yellow
    python init_db.py
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Base de datos inicializada" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Hubo un problema, pero continuamos..." -ForegroundColor Yellow
    }
} else {
    Write-Host "  → Omitiendo inicialización de BD" -ForegroundColor Gray
}

# Iniciar servidor
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   INICIANDO SERVIDOR FASTAPI" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Servidor disponible en:" -ForegroundColor Green
Write-Host "  → http://127.0.0.1:8000" -ForegroundColor White
Write-Host "  → http://127.0.0.1:8000/docs (Documentación)" -ForegroundColor White
Write-Host ""
Write-Host "Presiona CTRL+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""

# Iniciar uvicorn
uvicorn main:app --reload --port 8000

