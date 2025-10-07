# 📖 LÉEME PRIMERO - Bolivariano API Backend

¡Bienvenido al backend de la API Bolivariano! Esta guía te ayudará a comenzar rápidamente.

---

## 🚀 Inicio Rápido (Elige tu método)

### Método 1: Script Automático (Recomendado) ⚡

**Windows:**
```powershell
.\iniciar.ps1
```

**Linux/Mac:**
```bash
chmod +x iniciar.sh
./iniciar.sh
```

El script automáticamente:
1. ✅ Verifica Python
2. ✅ Instala dependencias
3. ✅ Verifica configuración
4. ✅ Pregunta si inicializar BD
5. ✅ Inicia el servidor

---

### Método 2: Manual (3 comandos)

```bash
# 1. Instalar dependencias
pip install -r requirements.txt

# 2. Inicializar base de datos
python init_db.py

# 3. Iniciar servidor
uvicorn main:app --reload
```

**Servidor disponible en:** http://127.0.0.1:8000/docs

---

## 📚 Documentación Disponible

| Archivo | Descripción | Para quién |
|---------|-------------|------------|
| **LEEME_PRIMERO.md** | Este archivo (inicio rápido) | 👤 Todos |
| **GUIA_INICIO_RAPIDO.md** | Guía completa paso a paso | 📖 Lectura detallada |
| **COMANDOS_RAPIDOS.md** | Referencia de comandos | 💻 Desarrollo diario |
| **README.md** | Documentación técnica completa | 🔧 Configuración avanzada |
| **INSTRUCCIONES_DEPLOYMENT.md** | Deploy a producción | 🚀 Deployment |

---

## ⚙️ Configuración Inicial (Solo primera vez)

### 1. Crear archivo `.env`

Crea un archivo llamado `.env` en este directorio (`backend/`) con:

```bash
# Base de Datos PostgreSQL (Neon)
DATABASE_URL=postgresql://neondb_owner:npg_XPkM4UzmLi9r@ep-steep-water-ad95jr9l-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Clave secreta JWT
SECRET_KEY=1e10c7b333bbf1cedaebfca69b038d14c7f949e4b311b6998c5c1ae47e89d643

# Puerto (opcional)
PORT=8000
```

**⚠️ Importante:**
- NO uses comillas en los valores
- En producción, genera una nueva SECRET_KEY

### 2. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 3. Inicializar base de datos

```bash
python init_db.py
```

Esto creará:
- 3 estudiantes de prueba
- 2 administradores de prueba

---

## 🔑 Credenciales de Prueba

### Estudiantes

| Código | Contraseña | Nombre |
|--------|------------|--------|
| 000287429 | thomas123 | Thomas Camilo Vanegas Acevedo |
| 000478320 | maria123 | María García López |
| 000356473 | carlos123 | Carlos Rodríguez Martínez |

### Administradores

| Usuario | Contraseña | Tipo |
|---------|------------|------|
| admin.upb | admin123 | Superusuario |
| soporte.upb | soporte123 | Admin Regular |

---

## 🌐 URLs del Servidor

Una vez iniciado el servidor:

| Recurso | URL |
|---------|-----|
| **Documentación Interactiva** | http://127.0.0.1:8000/docs |
| **Documentación ReDoc** | http://127.0.0.1:8000/redoc |
| **API Base** | http://127.0.0.1:8000 |

---

## 🧪 Probar la API

### Opción 1: Documentación Interactiva

1. Abre http://127.0.0.1:8000/docs
2. Busca el endpoint `/api/auth/login/student`
3. Click en "Try it out"
4. Ingresa credenciales:
   ```json
   {
     "student_id": "000287429",
     "password": "thomas123"
   }
   ```
5. Click en "Execute"

### Opción 2: Terminal (PowerShell)

```powershell
Invoke-WebRequest -Uri http://127.0.0.1:8000/api/auth/login/student -Method POST -Headers @{'Content-Type'='application/json'} -Body '{"student_id":"000287429","password":"thomas123"}' -UseBasicParsing
```

### Opción 3: Terminal (cURL)

```bash
curl -X POST http://127.0.0.1:8000/api/auth/login/student \
  -H "Content-Type: application/json" \
  -d '{"student_id":"000287429","password":"thomas123"}'
```

---

## 🛠️ Solución Rápida de Problemas

### Error: `ModuleNotFoundError: No module named 'dotenv'`

```bash
pip install python-dotenv
# O reinstalar todo:
pip install -r requirements.txt
```

### Error: `password cannot be longer than 72 bytes`

```bash
pip install bcrypt==4.2.1 passlib==1.7.4
```

### Error: `DATABASE_URL no está configurada`

1. Verifica que existe el archivo `.env` en `backend/`
2. Verifica que la variable `DATABASE_URL` esté definida (sin comillas)

### El servidor no inicia

1. Verifica que el puerto 8000 no esté en uso:
   ```powershell
   netstat -ano | findstr :8000
   ```
2. Usa otro puerto:
   ```bash
   uvicorn main:app --reload --port 8001
   ```

---

## 📁 Estructura del Proyecto

```
backend/
├── 📄 auth.py                    # Autenticación (JWT, bcrypt)
├── 📄 database.py                # Configuración BD
├── 📄 init_db.py                 # Script inicialización
├── 📄 main.py                    # Aplicación FastAPI
├── 📄 models.py                  # Modelos BD
├── 📄 schemas.py                 # Esquemas validación
├── 📄 requirements.txt           # Dependencias
├── 🔒 .env                       # Variables entorno (crear)
│
├── 📖 LEEME_PRIMERO.md          # Esta guía
├── 📖 GUIA_INICIO_RAPIDO.md     # Guía completa
├── 📖 COMANDOS_RAPIDOS.md       # Comandos referencia
├── 📖 README.md                  # Documentación técnica
│
├── ⚡ iniciar.ps1                # Script Windows
└── ⚡ iniciar.sh                 # Script Linux/Mac
```

---

## 🚦 Estado del Sistema - Checklist

Verifica que todo esté funcionando:

- [ ] Python instalado (3.9+)
- [ ] Dependencias instaladas (`pip list`)
- [ ] Archivo `.env` creado y configurado
- [ ] Base de datos inicializada (`python init_db.py`)
- [ ] Servidor iniciado (`uvicorn main:app --reload`)
- [ ] API responde en http://127.0.0.1:8000
- [ ] Login exitoso con credenciales de prueba

---

## 📞 Ayuda Adicional

### Si necesitas más información:

1. **Guía completa:** Lee `GUIA_INICIO_RAPIDO.md`
2. **Comandos:** Consulta `COMANDOS_RAPIDOS.md`
3. **Problemas técnicos:** Revisa la sección "Solución de Problemas" en la guía completa

### Verificar todo está OK:

```bash
# Verificar Python
python --version

# Verificar conexión BD
python -c "from database import engine; print('✅ BD OK')"

# Verificar servidor
curl http://127.0.0.1:8000
```

---

## 🎯 Próximos Pasos

Una vez que el servidor esté funcionando:

1. ✅ Explora la documentación en `/docs`
2. ✅ Prueba los endpoints de login
3. ✅ Integra con el frontend
4. ✅ Personaliza según tus necesidades

---

## 📝 Notas Importantes

### Seguridad
- Las contraseñas usan doble hash (SHA256 + bcrypt)
- Los tokens JWT expiran en 7 días (configurable)
- **NUNCA** subas el archivo `.env` a Git

### Desarrollo
- El servidor se recarga automáticamente (`--reload`)
- Los logs aparecen en la consola
- La documentación se genera automáticamente

### Producción
- Cambia `SECRET_KEY` a un valor único
- Configura variables de entorno en tu servidor
- Lee `INSTRUCCIONES_DEPLOYMENT.md` para deploy

---

## ✨ Scripts Disponibles

### Windows (PowerShell)

```powershell
# Iniciar todo automáticamente
.\iniciar.ps1

# Solo instalar dependencias
pip install -r requirements.txt

# Solo inicializar BD
python init_db.py

# Solo iniciar servidor
uvicorn main:app --reload
```

### Linux/Mac (Bash)

```bash
# Iniciar todo automáticamente
chmod +x iniciar.sh
./iniciar.sh

# Solo instalar dependencias
pip install -r requirements.txt

# Solo inicializar BD
python init_db.py

# Solo iniciar servidor
uvicorn main:app --reload
```

---

## 🔐 Seguridad del Sistema

El sistema implementa:
- ✅ Hash SHA256 + bcrypt para contraseñas
- ✅ Tokens JWT con expiración
- ✅ Autenticación basada en roles
- ✅ Protección contra SQL injection (SQLAlchemy)
- ✅ Validación de datos (Pydantic)

---

**¡Listo para comenzar! 🚀**

Si tienes problemas, consulta la documentación detallada o revisa la sección de solución de problemas.

---

**Última actualización:** Octubre 2025  
**Versión:** 1.0.0  
**Proyecto:** Sistema Bolivariano - UPB

