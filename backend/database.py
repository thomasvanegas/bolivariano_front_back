"""
Módulo de configuración de base de datos.

Este módulo maneja:
- Conexión a PostgreSQL (Neon DB)
- Configuración de SQLAlchemy
- Gestión de sesiones de base de datos
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# ============================================================================
# CONFIGURACIÓN DE BASE DE DATOS
# ============================================================================

# DATABASE_URL: URL de conexión a PostgreSQL
# - Busca la variable DATABASE_URL en el archivo .env
# - Formato esperado: postgresql://user:password@host:port/database?params
# - IMPORTANTE: Debe estar definida en .env con tus credenciales de Neon DB
DATABASE_URL = os.getenv('DATABASE_URL')

# Validar que la URL de base de datos esté configurada
if not DATABASE_URL:
    raise ValueError("DATABASE_URL no está configurada en las variables de entorno")

# Motor de SQLAlchemy - gestiona las conexiones a la base de datos
engine = create_engine(DATABASE_URL)

# Fábrica de sesiones - crea nuevas sesiones de base de datos
# - autocommit=False: Las transacciones deben confirmarse explícitamente
# - autoflush=False: Los cambios no se envían automáticamente a la BD
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Clase base para los modelos ORM de SQLAlchemy
Base = declarative_base()


def get_db():
    """
    Genera una sesión de base de datos para usar en los endpoints de FastAPI.
    
    Esta función es un generador que se usa como dependencia en FastAPI.
    Crea una sesión, la proporciona al endpoint, y luego la cierra automáticamente.
    
    Yields:
        Session: Sesión de SQLAlchemy para realizar operaciones en la base de datos
    
    Ejemplo de uso en FastAPI:
        @app.get("/users")
        def get_users(db: Session = Depends(get_db)):
            return db.query(User).all()
    
    Nota:
        El bloque finally garantiza que la sesión siempre se cierre,
        incluso si ocurre un error durante la ejecución del endpoint.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

