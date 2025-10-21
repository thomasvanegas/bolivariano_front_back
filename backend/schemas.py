from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional, List
from enum import Enum


# ===== ENUMS =====
class DocumentStatusEnum(str, Enum):
    PROCESSING = "processing"
    READY = "ready"
    ERROR = "error"


# ===== SCHEMAS PARA ESTUDIANTES =====
class StudentBase(BaseModel):
    student_id: str = Field(..., description="Código estudiantil único")
    full_name: str = Field(..., description="Nombre completo del estudiante")
    email: EmailStr


class StudentCreate(StudentBase):
    password: str = Field(..., min_length=6, description="Contraseña del estudiante")


class StudentResponse(StudentBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ===== SCHEMAS PARA ADMINISTRADORES =====
class AdminBase(BaseModel):
    username: str = Field(..., description="Nombre de usuario administrativo")
    full_name: str = Field(..., description="Nombre completo del administrador")
    email: EmailStr


class AdminCreate(AdminBase):
    password: str = Field(..., min_length=6, description="Contraseña del administrador")
    is_superuser: bool = False


class AdminResponse(AdminBase):
    id: int
    is_active: bool
    is_superuser: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ===== SCHEMAS PARA AUTENTICACIÓN =====
class StudentLoginRequest(BaseModel):
    student_id: str = Field(..., description="Código estudiantil")
    password: str = Field(..., description="Contraseña")


class AdminLoginRequest(BaseModel):
    username: str = Field(..., description="Usuario administrativo")
    password: str = Field(..., description="Contraseña")


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str  # "student" o "admin"
    user: dict  # Información básica del usuario


class MessageResponse(BaseModel):
    message: str
    detail: Optional[str] = None


# ===== SCHEMAS PARA DOCUMENTOS =====
class DocumentBase(BaseModel):
    name: str
    file_type: str
    category: str = "Sin categoría"
    description: Optional[str] = None
    tags: Optional[str] = None


class DocumentCreate(DocumentBase):
    file_size: int
    storage_url: str
    storage_key: str
    uploaded_by: Optional[int] = None
    uploaded_by_type: Optional[str] = None


class DocumentUpdate(BaseModel):
    category: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[str] = None
    status: Optional[DocumentStatusEnum] = None


class DocumentResponse(DocumentBase):
    id: int
    file_size: int
    status: DocumentStatusEnum
    storage_url: str
    storage_key: str
    uploaded_by: Optional[int] = None
    uploaded_by_type: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    processed_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class DocumentListResponse(BaseModel):
    total: int
    documents: List[DocumentResponse]

