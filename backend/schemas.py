from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional


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

