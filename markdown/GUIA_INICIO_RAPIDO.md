# 🚀 Guía de Inicio Rápido - Bolivariano API

Esta guía detalla paso a paso cómo configurar e iniciar el backend de la API de autenticación del sistema Bolivariano.

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#-requisitos-previos)
2. [Instalación](#-instalación)
3. [Configuración](#-configuración)
4. [Inicialización de Base de Datos](#-inicialización-de-base-de-datos)
5. [Ejecución del Servidor](#-ejecución-del-servidor)
6. [Pruebas de API](#-pruebas-de-api)
7. [Credenciales de Prueba](#-credenciales-de-prueba)
8. [Solución de Problemas](#-solución-de-problemas)

---

## ✅ Requisitos Previos

- **Python**: 3.9 o superior
- **PostgreSQL**: Base de datos Neon DB configurada
- **pip**: Gestor de paquetes de Python

Verificar versión de Python:
```bash
python --version
```

---

## 📦 Instalación

### Paso 1: Navegar al directorio backend

```bash
cd backend
```

### Paso 2: Instalar dependencias

```bash
pip install -r requirements.txt
```

**Dependencias instaladas:**
- `fastapi` - Framework web
- `uvicorn[standard]` - Servidor ASGI
- `sqlalchemy` - ORM para base de datos
- `psycopg2-binary` - Conector PostgreSQL
- `python-dotenv` - Variables de entorno
- `passlib==1.7.4` - Hash de contraseñas
- `bcrypt==4.2.1` - Algoritmo bcrypt (compatible)
- `python-jose[cryptography]` - Tokens JWT
- `pydantic[email]` - Validación de datos
- `python-multipart` - Soporte para formularios

---

## ⚙️ Configuración

### Paso 3: Crear archivo `.env`

Crear un archivo `.env` en el directorio `backend/` con el siguiente contenido:

```bash
# Configuración de Base de Datos PostgreSQL (Neon DB)
DATABASE_URL=postgresql://neondb_owner:npg_XPkM4UzmLi9r@ep-steep-water-ad95jr9l-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Clave secreta para JWT (cambiar en producción)
SECRET_KEY=1e10c7b333bbf1cedaebfca69b038d14c7f949e4b311b6998c5c1ae47e89d643

# Opcional: Puerto del servidor
PORT=8000
```

**⚠️ Importante:**
- **NO uses comillas** en los valores
- En producción, genera una nueva `SECRET_KEY` con:
  ```python
  import secrets
  print(secrets.token_hex(32))
  ```
- **NUNCA** subas el archivo `.env` a Git (ya está en `.gitignore`)

---

## 🗄️ Inicialización de Base de Datos

### Paso 4: Ejecutar script de inicialización

Este script crea las tablas en la base de datos y agrega usuarios de prueba.

```bash
python init_db.py
```

**Salida esperada:**
```
============================================================
INICIALIZACIÓN DE BASE DE DATOS - BOLIVARIANO
============================================================
Creando tablas en la base de datos...
Tablas creadas exitosamente

Creando estudiantes de prueba...
Estudiante creado: 000287429 - Thomas Camilo Vanegas Acevedo
Estudiante creado: 000478320 - María García López
Estudiante creado: 000356473 - Carlos Rodríguez Martínez

Creando administradores de prueba...
Admin creado: admin.upb - Administrador Principal
Admin creado: soporte.upb - Soporte Técnico

Base de datos inicializada correctamente!
```

**Notas:**
- Si ya existen usuarios, el script preguntará si deseas agregar más
- Las contraseñas se hashean con SHA256 + bcrypt (soporta contraseñas de cualquier longitud)
- Puedes ignorar el warning `(trapped) error reading bcrypt version` - es informativo y no afecta la funcionalidad

---

## 🚀 Ejecución del Servidor

### Paso 5: Iniciar el servidor FastAPI

**Opción A - Desde el directorio backend:**
```bash
uvicorn main:app --reload
```

**Opción B - Desde el directorio raíz del proyecto:**
```bash
cd backend
uvicorn main:app --reload --port 8000
```

**Opción C - Con Python module:**
```bash
python -m uvicorn main:app --reload --port 8000
```

**Salida esperada:**
```
INFO:     Will watch for changes in these directories: ['C:\\...\\backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [XXXX] using WatchFiles
INFO:     Started server process [XXXX]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**El servidor estará disponible en:**
- **API Base:** http://127.0.0.1:8000
- **Documentación Swagger:** http://127.0.0.1:8000/docs
- **Documentación ReDoc:** http://127.0.0.1:8000/redoc

Para detener el servidor: presiona `CTRL + C`

---

## 🧪 Pruebas de API

### Acceder a la documentación interactiva

Abre tu navegador en:
```
http://127.0.0.1:8000/docs
```

Desde ahí puedes probar todos los endpoints de forma interactiva.

### Pruebas desde la terminal

#### 1. Verificar que el servidor está corriendo

**PowerShell:**
```powershell
Invoke-WebRequest -Uri http://127.0.0.1:8000 -UseBasicParsing
```

**Respuesta esperada:**
```json
{
  "message": "Bolivariano API - Sistema de Autenticación",
  "version": "1.0.0",
  "status": "active"
}
```

#### 2. Login de Estudiante

**PowerShell:**
```powershell
Invoke-WebRequest -Uri http://127.0.0.1:8000/api/auth/login/student -Method POST -Headers @{'Content-Type'='application/json'} -Body '{"student_id":"000287429","password":"thomas123"}' -UseBasicParsing
```

**cURL (Git Bash / Linux / Mac):**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/student \
  -H "Content-Type: application/json" \
  -d '{"student_id":"000287429","password":"thomas123"}'
```

**Respuesta esperada:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "student_id": "000287429",
    "full_name": "Thomas Camilo Vanegas Acevedo",
    "email": "thomas.vanegas@upb.edu.co"
  }
}
```

#### 3. Login de Administrador

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

---

## 🔑 Credenciales de Prueba

### Estudiantes

| Código Estudiantil | Contraseña | Nombre |
|-------------------|------------|---------|
| `000287429` | `thomas123` | Thomas Camilo Vanegas Acevedo |
| `000478320` | `maria123` | María García López |
| `000356473` | `carlos123` | Carlos Rodríguez Martínez |

**Endpoint:** `POST /api/auth/login/student`

**Body:**
```json
{
  "student_id": "000287429",
  "password": "thomas123"
}
```

### Administradores

| Usuario | Contraseña | Nombre | Tipo |
|---------|------------|---------|------|
| `admin.upb` | `admin123` | Administrador Principal | Superusuario |
| `soporte.upb` | `soporte123` | Soporte Técnico | Admin Regular |

**Endpoint:** `POST /api/auth/login/admin`

**Body:**
```json
{
  "username": "admin.upb",
  "password": "admin123"
}
```

---

## 🛠️ Solución de Problemas

### Error: `ModuleNotFoundError: No module named 'dotenv'`

**Causa:** Falta instalar `python-dotenv`

**Solución:**
```bash
pip install python-dotenv
# O reinstalar todas las dependencias:
pip install -r requirements.txt
```

---

### Error: `password cannot be longer than 72 bytes`

**Causa:** Conflicto de versiones entre `bcrypt` y `passlib`

**Solución:**
```bash
pip install bcrypt==4.2.1 passlib==1.7.4
```

**Verificación:** El código ya incluye pre-hash SHA256 que soluciona este problema permanentemente.

---

### Error: `DATABASE_URL no está configurada en las variables de entorno`

**Causa:** Falta el archivo `.env` o la variable `DATABASE_URL`

**Solución:**
1. Crear archivo `.env` en el directorio `backend/`
2. Agregar la variable `DATABASE_URL` (ver [Paso 3](#paso-3-crear-archivo-env))

---

### Error: El servidor no inicia / No se conecta a la base de datos

**Verificaciones:**
1. ✅ Archivo `.env` existe en `backend/`
2. ✅ `DATABASE_URL` está correctamente configurada (sin comillas)
3. ✅ Base de datos Neon está activa y accesible
4. ✅ Todas las dependencias están instaladas

**Probar conexión:**
```bash
python -c "from database import engine; print('Conexión exitosa')"
```

---

### Warning: `(trapped) error reading bcrypt version`

**Causa:** Incompatibilidad menor entre bcrypt 4.x y passlib

**Solución:** Este warning es **informativo** y NO afecta la funcionalidad. Puedes ignorarlo de forma segura.

---

### Puerto 8000 ya está en uso

**Verificar proceso:**
```powershell
netstat -ano | findstr :8000
```

**Usar otro puerto:**
```bash
uvicorn main:app --reload --port 8001
```

**Detener proceso (Windows):**
```powershell
# Obtener PID del comando anterior
taskkill /PID <PID> /F
```

---

## 📚 Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/` | Información de la API |
| `GET` | `/docs` | Documentación Swagger UI |
| `GET` | `/redoc` | Documentación ReDoc |
| `POST` | `/api/auth/login/student` | Login de estudiantes |
| `POST` | `/api/auth/login/admin` | Login de administradores |
| `GET` | `/api/auth/me` | Información del usuario autenticado |
| `POST` | `/api/admin/citations` | Crear citación (admin) |
| `GET` | `/api/admin/citations` | Listar citaciones (admin) |
| `GET` | `/api/student/citations` | Mis citaciones (estudiante) |

**Nota:** Los endpoints protegidos requieren el token JWT en el header `Authorization: Bearer <token>`

---

## 🔐 Seguridad

### Hash de Contraseñas

El sistema utiliza un **doble hash** para máxima seguridad:

1. **SHA256**: Pre-hash de la contraseña (evita límite de 72 bytes de bcrypt)
2. **Bcrypt**: Hash final con salt automático

**Ventajas:**
- ✅ Soporta contraseñas de cualquier longitud
- ✅ Protección contra rainbow tables
- ✅ Salt automático por contraseña
- ✅ Doble capa de seguridad

### Tokens JWT

- **Algoritmo:** HS256
- **Expiración:** 7 días (configurable)
- **Payload incluye:** user_id, role, student_id/username

---

## 📁 Estructura del Proyecto Backend

```
backend/
├── auth.py                      # Lógica de autenticación (JWT, bcrypt)
├── database.py                  # Configuración de SQLAlchemy
├── init_db.py                   # Script de inicialización
├── main.py                      # Aplicación FastAPI
├── models.py                    # Modelos de base de datos
├── schemas.py                   # Esquemas Pydantic
├── requirements.txt             # Dependencias Python
├── .env                         # Variables de entorno (NO subir a Git)
├── GUIA_INICIO_RAPIDO.md       # Esta guía
└── README.md                    # Documentación completa
```

---

## 🚀 Próximos Pasos

1. ✅ Servidor funcionando
2. ✅ Base de datos inicializada
3. ✅ Pruebas de login exitosas

**Recomendaciones:**
- Integrar el frontend con el backend
- Configurar CORS si es necesario
- Implementar más endpoints según requisitos
- Configurar variables de entorno para producción
- Implementar logging y monitoreo

---

## 📞 Soporte

Si encuentras problemas:

1. Verifica la sección [Solución de Problemas](#-solución-de-problemas)
2. Revisa los logs del servidor
3. Consulta la documentación en `/docs`
4. Verifica el archivo `.env`

---

## 📄 Licencia

Este proyecto es parte del sistema Bolivariano - UPB.

---

**Última actualización:** Octubre 2025  
**Versión:** 1.0.0

