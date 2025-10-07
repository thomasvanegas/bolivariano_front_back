"""
Módulo de autenticación y seguridad.

Este módulo maneja toda la lógica relacionada con:
- Generación y verificación de tokens JWT
- Hash y verificación de contraseñas
- Configuración de seguridad de la aplicación
"""

from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
import os
from dotenv import load_dotenv
import hashlib

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# ============================================================================
# CONFIGURACIÓN DE SEGURIDAD
# ============================================================================

# SECRET_KEY: Clave secreta para firmar los tokens JWT
# - Busca primero en el archivo .env la variable SECRET_KEY
# - Si no existe en .env, usa el valor por defecto (segundo parámetro)
# - IMPORTANTE: En producción SIEMPRE debe estar definida en .env
SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")

# Algoritmo de encriptación para los tokens JWT
ALGORITHM = "HS256"

# Tiempo de expiración de los tokens de acceso (7 días)
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7

# Contexto de encriptación para hashear y verificar contraseñas
# Utiliza bcrypt como algoritmo de hash
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica si una contraseña en texto plano coincide con el hash almacenado.
    
    Primero convierte la contraseña a SHA256 (para manejar el límite de 72 bytes de bcrypt),
    luego verifica contra el hash bcrypt almacenado.
    
    Args:
        plain_password (str): La contraseña en texto plano proporcionada por el usuario
        hashed_password (str): El hash de la contraseña almacenado en la base de datos
    
    Returns:
        bool: True si la contraseña coincide, False en caso contrario
    
    Ejemplo:
        >>> verify_password("mi_password", "$2b$12$...")
        True
    """
    # Pre-hash con SHA256 para evitar el límite de 72 bytes de bcrypt
    password_sha256 = hashlib.sha256(plain_password.encode('utf-8')).hexdigest()
    return pwd_context.verify(password_sha256, hashed_password)


def get_password_hash(password: str) -> str:
    """
    Genera un hash seguro de la contraseña para almacenar en base de datos.
    
    Utiliza un enfoque de doble hash:
    1. Primero hace un hash SHA256 de la contraseña (evita el límite de 72 bytes de bcrypt)
    2. Luego hashea el resultado con bcrypt para mayor seguridad
    
    Este método permite contraseñas de cualquier longitud y añade seguridad adicional.
    Nunca se almacenan contraseñas en texto plano.
    
    Args:
        password (str): La contraseña en texto plano a hashear
    
    Returns:
        str: El hash bcrypt de la contraseña
    
    Ejemplo:
        >>> get_password_hash("mi_password")
        "$2b$12$KIXl.oPq7YK4mQ..."
    
    Nota:
        Bcrypt tiene un límite de 72 bytes. Al pre-hashear con SHA256,
        convertimos cualquier contraseña a exactamente 64 caracteres hexadecimales.
    """
    # Pre-hash con SHA256 para evitar el límite de 72 bytes de bcrypt
    # SHA256 siempre produce un hash de 64 caracteres hexadecimales (32 bytes)
    password_sha256 = hashlib.sha256(password.encode('utf-8')).hexdigest()
    return pwd_context.hash(password_sha256)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Crea un token JWT (JSON Web Token) con los datos proporcionados.
    
    El token incluye automáticamente un tiempo de expiración y se firma
    con la SECRET_KEY para garantizar su autenticidad.
    
    Args:
        data (dict): Diccionario con los datos a incluir en el token 
                    (ej: {"sub": "usuario@email.com", "role": "admin"})
        expires_delta (Optional[timedelta]): Tiempo personalizado de expiración.
                                            Si no se proporciona, usa ACCESS_TOKEN_EXPIRE_MINUTES
    
    Returns:
        str: El token JWT codificado como string
    
    Ejemplo:
        >>> create_access_token({"sub": "user@example.com"})
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    """
    to_encode = data.copy()
    
    # Calcular el tiempo de expiración
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # Agregar el tiempo de expiración al payload
    to_encode.update({"exp": expire})
    
    # Codificar el token JWT
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> Optional[dict]:
    """
    Decodifica y verifica un token JWT.
    
    Valida la firma del token y verifica que no haya expirado.
    
    Args:
        token (str): El token JWT a decodificar
    
    Returns:
        Optional[dict]: El payload del token si es válido, None si es inválido o ha expirado
    
    Ejemplo:
        >>> decode_access_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
        {"sub": "user@example.com", "exp": 1234567890}
    """
    try:
        # Decodificar y verificar el token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        # Token inválido, expirado o con firma incorrecta
        return None

