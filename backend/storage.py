"""
Servicio de almacenamiento en la nube para documentos.
Soporta AWS S3 y Cloudflare R2.
"""

import os
import uuid
from typing import Tuple, Optional
import boto3
from botocore.exceptions import ClientError
from botocore.config import Config
from fastapi import UploadFile, HTTPException
import mimetypes

# Variables de entorno para configuración
STORAGE_PROVIDER = os.getenv("STORAGE_PROVIDER", "r2")  # "s3" o "r2"
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION", "us-east-1")
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

# Para Cloudflare R2
R2_ACCOUNT_ID = os.getenv("R2_ACCOUNT_ID")
R2_ACCESS_KEY_ID = os.getenv("R2_ACCESS_KEY_ID")
R2_SECRET_ACCESS_KEY = os.getenv("R2_SECRET_ACCESS_KEY")
R2_BUCKET_NAME = os.getenv("R2_BUCKET_NAME")

# Configuración de tipos de archivo permitidos
ALLOWED_EXTENSIONS = {'.pdf', '.doc', '.docx', '.txt'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB en bytes


class StorageService:
    """Servicio para gestionar almacenamiento en la nube"""
    
    def __init__(self):
        self.provider = STORAGE_PROVIDER
        self.client = self._init_client()
        self.bucket_name = self._get_bucket_name()
    
    def _init_client(self):
        """Inicializa el cliente de S3 o R2"""
        if self.provider == "r2":
            # Cloudflare R2 es compatible con S3, pero usa un endpoint diferente
            if not all([R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY]):
                raise ValueError("Faltan credenciales de Cloudflare R2 en variables de entorno")
            
            endpoint_url = f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
            
            return boto3.client(
                's3',
                endpoint_url=endpoint_url,
                aws_access_key_id=R2_ACCESS_KEY_ID,
                aws_secret_access_key=R2_SECRET_ACCESS_KEY,
                config=Config(signature_version='s3v4'),
                region_name='auto'
            )
        else:
            # AWS S3
            if not all([AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY]):
                raise ValueError("Faltan credenciales de AWS S3 en variables de entorno")
            
            return boto3.client(
                's3',
                aws_access_key_id=AWS_ACCESS_KEY_ID,
                aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                region_name=AWS_REGION,
                config=Config(signature_version='s3v4')
            )
    
    def _get_bucket_name(self) -> str:
        """Obtiene el nombre del bucket según el proveedor"""
        if self.provider == "r2":
            if not R2_BUCKET_NAME:
                raise ValueError("R2_BUCKET_NAME no configurado")
            return R2_BUCKET_NAME
        else:
            if not S3_BUCKET_NAME:
                raise ValueError("S3_BUCKET_NAME no configurado")
            return S3_BUCKET_NAME
    
    def _validate_file(self, file: UploadFile) -> None:
        """Valida el archivo antes de subirlo"""
        # Verificar extensión
        file_ext = os.path.splitext(file.filename)[1].lower()
        if file_ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=f"Tipo de archivo no permitido. Extensiones permitidas: {', '.join(ALLOWED_EXTENSIONS)}"
            )
        
        # Verificar tamaño (FastAPI ya valida esto con File, pero doble verificación)
        file.file.seek(0, 2)  # Ir al final del archivo
        file_size = file.file.tell()
        file.file.seek(0)  # Volver al inicio
        
        if file_size > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"El archivo es demasiado grande. Tamaño máximo: {MAX_FILE_SIZE / 1024 / 1024} MB"
            )
    
    def _generate_storage_key(self, filename: str) -> str:
        """Genera una key única para el storage"""
        file_ext = os.path.splitext(filename)[1].lower()
        unique_id = str(uuid.uuid4())
        # Estructura: documents/{uuid}{extension}
        return f"documents/{unique_id}{file_ext}"
    
    def upload_file(self, file: UploadFile) -> Tuple[str, str, int]:
        """
        Sube un archivo al storage.
        
        Returns:
            Tuple[str, str, int]: (storage_url, storage_key, file_size)
        """
        try:
            # Validar archivo
            self._validate_file(file)
            
            # Generar key única
            storage_key = self._generate_storage_key(file.filename)
            
            # Obtener content type
            content_type = file.content_type or mimetypes.guess_type(file.filename)[0] or 'application/octet-stream'
            
            # Obtener tamaño del archivo
            file.file.seek(0, 2)
            file_size = file.file.tell()
            file.file.seek(0)
            
            # Subir archivo
            self.client.upload_fileobj(
                file.file,
                self.bucket_name,
                storage_key,
                ExtraArgs={
                    'ContentType': content_type,
                    'Metadata': {
                        'original-filename': file.filename
                    }
                }
            )
            
            # Generar URL pública
            storage_url = self._generate_public_url(storage_key)
            
            return storage_url, storage_key, file_size
            
        except ClientError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error al subir archivo: {str(e)}"
            )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error inesperado: {str(e)}"
            )
    
    def _generate_public_url(self, storage_key: str) -> str:
        """Genera la URL pública del archivo"""
        if self.provider == "r2":
            # Para R2, necesitas configurar un dominio público o usar URL firmadas
            # Por ahora, retornamos la URL del endpoint
            return f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com/{self.bucket_name}/{storage_key}"
        else:
            # Para S3
            return f"https://{self.bucket_name}.s3.{AWS_REGION}.amazonaws.com/{storage_key}"
    
    def delete_file(self, storage_key: str) -> bool:
        """Elimina un archivo del storage"""
        try:
            self.client.delete_object(
                Bucket=self.bucket_name,
                Key=storage_key
            )
            return True
        except ClientError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error al eliminar archivo: {str(e)}"
            )
    
    def generate_presigned_url(self, storage_key: str, expiration: int = 3600) -> str:
        """
        Genera una URL firmada temporalmente para descargar el archivo.
        
        Args:
            storage_key: Key del archivo en el storage
            expiration: Tiempo de expiración en segundos (default: 1 hora)
        
        Returns:
            str: URL firmada
        """
        try:
            url = self.client.generate_presigned_url(
                'get_object',
                Params={
                    'Bucket': self.bucket_name,
                    'Key': storage_key
                },
                ExpiresIn=expiration
            )
            return url
        except ClientError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error al generar URL de descarga: {str(e)}"
            )


# Instancia global del servicio
storage_service = StorageService()

