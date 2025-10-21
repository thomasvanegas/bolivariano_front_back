from sqlalchemy import Column, String, DateTime, Boolean, Integer, Text, Enum
from sqlalchemy.sql import func
from database import Base
import enum


class DocumentStatus(str, enum.Enum):
    """Estados posibles de un documento"""
    PROCESSING = "processing"
    READY = "ready"
    ERROR = "error"


class Student(Base):
    """
    Modelo para estudiantes.
    Usa el código estudiantil como identificador único para login.
    """
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(String, unique=True, index=True, nullable=False)  # Código estudiantil (ej: 000287429)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Admin(Base):
    """
    Modelo para administradores.
    Usa un username como identificador para login.
    """
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Document(Base):
    """
    Modelo para documentos de la base de conocimiento.
    Almacena metadata de documentos subidos al storage en la nube.
    """
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)  # Nombre original del archivo
    file_type = Column(String, nullable=False)  # PDF, DOC, DOCX
    file_size = Column(Integer, nullable=False)  # Tamaño en bytes
    category = Column(String, default="Sin categoría")  # Categoría del documento
    status = Column(Enum(DocumentStatus), default=DocumentStatus.PROCESSING)
    
    # URLs y paths en el storage
    storage_url = Column(String, nullable=False)  # URL pública del documento
    storage_key = Column(String, nullable=False, unique=True)  # Key/path único en el storage
    
    # Información del uploader
    uploaded_by = Column(Integer, nullable=True)  # ID del admin que subió
    uploaded_by_type = Column(String, nullable=True)  # "admin" o "student"
    
    # Metadata adicional
    description = Column(Text, nullable=True)
    tags = Column(String, nullable=True)  # Tags separados por comas
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    processed_at = Column(DateTime(timezone=True), nullable=True)  # Cuando se completó el procesamiento