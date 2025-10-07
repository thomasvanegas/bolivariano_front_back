# ⚡ Comandos Rápidos - Bolivariano API

Guía de referencia rápida con los comandos más utilizados.

---

## 🚀 Inicio Rápido (3 pasos)

### 1. Instalar dependencias
```bash
pip install -r requirements.txt
```

### 2. Inicializar base de datos
```bash
python init_db.py
```

### 3. Iniciar servidor
```bash
uvicorn main:app --reload
```

**Servidor disponible en:** http://127.0.0.1:8000/docs

---

## 📦 Instalación

### Instalar todas las dependencias
```bash
pip install -r requirements.txt
```

### Instalar dependencias específicas (si hay errores)
```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv
pip install passlib==1.7.4 bcrypt==4.2.1
pip install python-jose[cryptography] pydantic[email] python-multipart
```

### Verificar instalación
```bash
pip list | grep -E "fastapi|uvicorn|sqlalchemy"
```

---

## 🗄️ Base de Datos

### Inicializar base de datos con usuarios de prueba
```bash
python init_db.py
```

### Conectar y verificar base de datos
```bash
python -c "from database import engine; print('✅ Conexión exitosa')"
```

---

## 🖥️ Servidor

### Iniciar servidor (modo desarrollo)
```bash
uvicorn main:app --reload
```

### Iniciar en puerto específico
```bash
uvicorn main:app --reload --port 8001
```

### Iniciar con host accesible desde red
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Verificar si el servidor está corriendo

**PowerShell:**
```powershell
Invoke-WebRequest -Uri http://127.0.0.1:8000 -UseBasicParsing
```

**cURL (Git Bash/Linux/Mac):**
```bash
curl http://127.0.0.1:8000
```

---

## 🧪 Pruebas de API

### Login de Estudiante

**PowerShell:**
```powershell
Invoke-WebRequest -Uri http://127.0.0.1:8000/api/auth/login/student -Method POST -Headers @{'Content-Type'='application/json'} -Body '{"student_id":"000287429","password":"thomas123"}' -UseBasicParsing
```

**cURL:**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/student \
  -H "Content-Type: application/json" \
  -d '{"student_id":"000287429","password":"thomas123"}'
```

### Login de Administrador

**PowerShell:**
```powershell
Invoke-WebRequest -Uri http://127.0.0.1:8000/api/auth/login/admin -Method POST -Headers @{'Content-Type'='application/json'} -Body '{"username":"admin.upb","password":"admin123"}' -UseBasicParsing
```

**cURL:**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/admin \
  -H "Content-Type: application/json" \
  -d '{"username":"admin.upb","password":"admin123"}'
```

### Prueba con token (ejemplo)

**Primero obtener token:**
```bash
TOKEN=$(curl -X POST http://127.0.0.1:8000/api/auth/login/student \
  -H "Content-Type: application/json" \
  -d '{"student_id":"000287429","password":"thomas123"}' | jq -r .access_token)
```

**Usar token en petición protegida:**
```bash
curl http://127.0.0.1:8000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🔍 Diagnóstico

### Ver procesos Python corriendo

**PowerShell:**
```powershell
Get-Process python
```

**Linux/Mac:**
```bash
ps aux | grep python
```

### Ver qué está usando el puerto 8000

**PowerShell:**
```powershell
netstat -ano | findstr :8000
```

**Linux/Mac:**
```bash
lsof -i :8000
```

### Detener servidor

**Windows (PowerShell):**
```powershell
# Obtener PID primero con netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
# Obtener PID primero con lsof -i :8000
kill -9 <PID>
```

**O simplemente:** `CTRL + C` en la terminal donde corre el servidor

---

## 🔧 Solución Rápida de Problemas

### Error: ModuleNotFoundError
```bash
pip install -r requirements.txt
```

### Error: bcrypt 72 bytes
```bash
pip install bcrypt==4.2.1 passlib==1.7.4
```

### Error: DATABASE_URL no configurada
```bash
# Crear .env en backend/ con:
echo "DATABASE_URL=postgresql://..." > .env
echo "SECRET_KEY=tu_clave_aqui" >> .env
```

### Reinstalar todo desde cero
```bash
pip uninstall -y -r requirements.txt
pip install -r requirements.txt
```

### Limpiar caché de Python
```bash
find . -type d -name __pycache__ -exec rm -rf {} +
find . -type f -name "*.pyc" -delete
```

**Windows (PowerShell):**
```powershell
Get-ChildItem -Path . -Recurse -Directory -Filter __pycache__ | Remove-Item -Recurse -Force
Get-ChildItem -Path . -Recurse -File -Filter *.pyc | Remove-Item -Force
```

---

## 📊 URLs Importantes

| Recurso | URL |
|---------|-----|
| **API Base** | http://127.0.0.1:8000 |
| **Documentación Swagger** | http://127.0.0.1:8000/docs |
| **Documentación ReDoc** | http://127.0.0.1:8000/redoc |
| **OpenAPI Schema** | http://127.0.0.1:8000/openapi.json |

---

## 🔑 Credenciales de Prueba

### Estudiantes
```
000287429 / thomas123
000478320 / maria123
000356473 / carlos123
```

### Administradores
```
admin.upb / admin123 (Superusuario)
soporte.upb / soporte123
```

---

## 🐍 Python - Comandos Útiles

### Generar SECRET_KEY nueva
```python
python -c "import secrets; print(secrets.token_hex(32))"
```

### Verificar versión de Python
```bash
python --version
```

### Verificar paquetes instalados
```bash
pip list
pip freeze
```

### Crear requirements.txt desde entorno actual
```bash
pip freeze > requirements.txt
```

---

## 🔄 Actualización de Dependencias

### Actualizar pip
```bash
python -m pip install --upgrade pip
```

### Actualizar todas las dependencias
```bash
pip install --upgrade -r requirements.txt
```

### Actualizar paquete específico
```bash
pip install --upgrade fastapi
```

---

## 📝 Variables de Entorno (.env)

### Contenido del archivo .env
```bash
DATABASE_URL=postgresql://user:password@host:port/database
SECRET_KEY=tu_clave_secreta_aqui
PORT=8000
```

### Ver variables cargadas (DEBUG)
```python
python -c "from dotenv import load_dotenv; import os; load_dotenv(); print(os.getenv('DATABASE_URL'))"
```

---

## 🚦 Estado del Sistema

### Verificar todo está funcionando
```bash
# 1. Verificar Python
python --version

# 2. Verificar dependencias
pip check

# 3. Verificar conexión BD
python -c "from database import engine; print('DB OK')"

# 4. Verificar servidor
curl http://127.0.0.1:8000
```

---

## 📦 Exportar/Importar Base de Datos

### Exportar datos (backup)
```bash
pg_dump -h host -U user -d database > backup.sql
```

### Importar datos
```bash
psql -h host -U user -d database < backup.sql
```

---

## 🔐 Seguridad

### Generar hash de contraseña
```python
python -c "from auth import get_password_hash; print(get_password_hash('mi_password'))"
```

### Verificar contraseña
```python
python -c "from auth import verify_password; print(verify_password('mi_password', 'hash_aqui'))"
```

---

## 📚 Documentación Completa

- **Guía detallada:** `GUIA_INICIO_RAPIDO.md`
- **README principal:** `README.md`
- **Instrucciones deployment:** `INSTRUCCIONES_DEPLOYMENT.md`

---

**Tip:** Guarda este archivo en tus marcadores para acceso rápido 🚀

