# Bolivariano API - Backend

API de autenticación para el Asistente Académico Bolivariano, construida con FastAPI y PostgreSQL.

## 🚀 Configuración Inicial

### 1. Crear Base de Datos PostgreSQL Gratuita

Recomendamos usar **Neon** (https://neon.tech) - PostgreSQL serverless gratuito:

1. Crea una cuenta en https://neon.tech
2. Crea un nuevo proyecto
3. Copia la connection string que te proporciona (formato: `postgresql://user:pass@host/db?sslmode=require`)

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en el directorio `/backend`:

```bash
cp .env.example .env
```

Edita el archivo `.env` y configura:
- `DATABASE_URL`: Tu connection string de Neon (o cualquier PostgreSQL)
- `SECRET_KEY`: Genera una clave segura (puedes usar: `openssl rand -hex 32`)

### 3. Instalar Dependencias

```bash
pip install -r requirements.txt
```

### 4. Inicializar Base de Datos

Este script crea las tablas y agrega usuarios de prueba:

```bash
python init_db.py
```

### 5. Ejecutar API Localmente

```bash
uvicorn main:app --reload
```

La API estará disponible en: http://localhost:8000

Documentación interactiva: http://localhost:8000/docs

## 📡 Endpoints Principales

### Autenticación

**Login de Estudiantes**
```http
POST /api/auth/login/student
Content-Type: application/json

{
  "student_id": "2024123456",
  "password": "estudiante123"
}
```

**Login de Administradores**
```http
POST /api/auth/login/admin
Content-Type: application/json

{
  "username": "admin.upb",
  "password": "admin123"
}
```

### Registro (Para testing)

**Registrar Estudiante**
```http
POST /api/students/register
Content-Type: application/json

{
  "student_id": "2024999999",
  "full_name": "Nombre Completo",
  "email": "email@upb.edu.co",
  "password": "micontraseña"
}
```

## 🌐 Deployment en Vercel

### Opción 1: Deployment del Backend Solo

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Desde el directorio raíz del proyecto:
```bash
vercel
```

3. Configura las variables de entorno en Vercel:
   - Ve a tu proyecto en Vercel Dashboard
   - Settings → Environment Variables
   - Agrega:
     - `DATABASE_URL`: Tu connection string de Neon
     - `SECRET_KEY`: Tu clave secreta

### Opción 2: Deployment con el Frontend

Si quieres desplegar el backend junto con tu frontend de Next.js:

1. Crea `vercel.json` en la raíz del proyecto:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/backend/main.py"
    }
  ]
}
```

2. Asegúrate de que el backend esté en `/backend`
3. Deploy normal con `vercel`

## 🔒 Credenciales de Prueba

Después de ejecutar `init_db.py`:

**Estudiantes:**
- Código: `2024123456` | Contraseña: `estudiante123`
- Código: `2024789012` | Contraseña: `estudiante123`
- Código: `2024345678` | Contraseña: `estudiante123`

**Administradores:**
- Usuario: `admin.upb` | Contraseña: `admin123` (Superusuario)
- Usuario: `soporte.upb` | Contraseña: `soporte123`

⚠️ **IMPORTANTE**: Cambia estas contraseñas en producción!

## 🛠️ Estructura del Proyecto

```
backend/
├── main.py           # Aplicación FastAPI principal
├── models.py         # Modelos SQLAlchemy (BD)
├── schemas.py        # Schemas Pydantic (validación)
├── database.py       # Configuración de BD
├── auth.py           # Utilidades de autenticación (JWT, bcrypt)
├── init_db.py        # Script de inicialización
├── requirements.txt  # Dependencias Python
├── vercel.json       # Configuración de Vercel
└── .env             # Variables de entorno (no incluir en git)
```

## 📚 Tecnologías

- **FastAPI**: Framework web moderno y rápido
- **SQLAlchemy**: ORM para PostgreSQL
- **Pydantic**: Validación de datos
- **JWT**: Autenticación con tokens
- **Bcrypt**: Hash seguro de contraseñas
- **PostgreSQL**: Base de datos relacional (Neon)

## 🔗 CORS

La API está configurada para aceptar requests desde:
- `https://bolivariano.vercel.app` (Producción)
- `http://localhost:3000` (Desarrollo)
- `http://localhost:3001` (Desarrollo alternativo)

## 📝 Notas de Seguridad

1. **Nunca** commits el archivo `.env` a git
2. Usa contraseñas fuertes en producción
3. Cambia el `SECRET_KEY` a algo realmente aleatorio
4. Considera deshabilitar los endpoints de registro en producción
5. Implementa rate limiting para prevenir ataques de fuerza bruta

## 🐛 Troubleshooting

**Error: DATABASE_URL no está configurada**
- Asegúrate de tener el archivo `.env` con la variable `DATABASE_URL`

**Error de conexión a la base de datos**
- Verifica que la connection string sea correcta
- Asegúrate de que incluya `?sslmode=require` para Neon

**Error en deployment en Vercel**
- Verifica que las variables de entorno estén configuradas en Vercel Dashboard
- Revisa los logs en Vercel para más detalles

