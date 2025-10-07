#!/bin/bash
# Script de inicio para Bolivariano API - Linux/Mac
# Uso: chmod +x iniciar.sh && ./iniciar.sh

# Colores
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
GRAY='\033[0;90m'
NC='\033[0m' # No Color

echo -e "${CYAN}========================================"
echo -e "   BOLIVARIANO API - INICIO"
echo -e "========================================${NC}"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "main.py" ]; then
    echo -e "${RED}Error: Este script debe ejecutarse desde el directorio backend/${NC}"
    exit 1
fi

# Paso 1: Verificar Python
echo -e "${YELLOW}[1/4] Verificando Python...${NC}"
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo -e "${GREEN}  ✓ $PYTHON_VERSION instalado${NC}"
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_VERSION=$(python --version)
    echo -e "${GREEN}  ✓ $PYTHON_VERSION instalado${NC}"
    PYTHON_CMD="python"
else
    echo -e "${RED}  ✗ Python no está instalado${NC}"
    exit 1
fi

# Paso 2: Instalar dependencias
echo ""
echo -e "${YELLOW}[2/4] Instalando dependencias...${NC}"
if $PYTHON_CMD -m pip install -r requirements.txt --quiet; then
    echo -e "${GREEN}  ✓ Dependencias instaladas correctamente${NC}"
else
    echo -e "${RED}  ✗ Error al instalar dependencias${NC}"
    exit 1
fi

# Paso 3: Verificar archivo .env
echo ""
echo -e "${YELLOW}[3/4] Verificando configuración...${NC}"
if [ -f ".env" ]; then
    echo -e "${GREEN}  ✓ Archivo .env encontrado${NC}"
else
    echo -e "${YELLOW}  ⚠ Archivo .env NO encontrado${NC}"
    echo -e "${YELLOW}  → Creando .env de ejemplo...${NC}"
    
    cat > .env << 'EOF'
# Configuración de Base de Datos
DATABASE_URL=postgresql://user:password@host:port/database

# Clave secreta para JWT
SECRET_KEY=default_secret_key

# Puerto del servidor
PORT=8000
EOF
    
    echo -e "${YELLOW}  ✓ Archivo .env creado. ¡CONFIGÚRALO ANTES DE CONTINUAR!${NC}"
    echo -e "${YELLOW}  → Edita el archivo .env con tus credenciales de base de datos${NC}"
    
    read -p "¿Deseas continuar de todas formas? (s/n): " continue
    if [ "$continue" != "s" ]; then
        echo -e "${RED}Proceso cancelado. Configura .env y vuelve a ejecutar.${NC}"
        exit 0
    fi
fi

# Paso 4: Preguntar si desea inicializar la base de datos
echo ""
echo -e "${YELLOW}[4/4] Inicialización de base de datos...${NC}"
read -p "¿Deseas inicializar/actualizar la base de datos? (s/n): " init_db

if [ "$init_db" = "s" ]; then
    echo -e "${YELLOW}  → Ejecutando init_db.py...${NC}"
    if $PYTHON_CMD init_db.py; then
        echo -e "${GREEN}  ✓ Base de datos inicializada${NC}"
    else
        echo -e "${YELLOW}  ⚠ Hubo un problema, pero continuamos...${NC}"
    fi
else
    echo -e "${GRAY}  → Omitiendo inicialización de BD${NC}"
fi

# Iniciar servidor
echo ""
echo -e "${CYAN}========================================"
echo -e "   INICIANDO SERVIDOR FASTAPI"
echo -e "========================================${NC}"
echo ""
echo -e "${GREEN}Servidor disponible en:${NC}"
echo -e "  → http://127.0.0.1:8000"
echo -e "  → http://127.0.0.1:8000/docs (Documentación)"
echo ""
echo -e "${YELLOW}Presiona CTRL+C para detener el servidor${NC}"
echo ""

# Iniciar uvicorn
$PYTHON_CMD -m uvicorn main:app --reload --port 8000

