from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
from database import engine, get_db
from auth import verify_password, get_password_hash, create_access_token

# Crear las tablas en la base de datos
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Bolivariano API",
    description="API de autenticación para el Asistente Académico Bolivariano",
    version="1.0.0"
)

# Configurar CORS para permitir requests desde Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://bolivariano.vercel.app",
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    """
    Endpoint raíz para verificar que la API está funcionando.
    """
    return {
        "message": "Bolivariano API - Sistema de Autenticación",
        "version": "1.0.0",
        "status": "active"
    }


@app.get("/health")
def health_check():
    """
    Endpoint de health check para monitoreo.
    """
    return {"status": "healthy"}


# ===== ENDPOINTS DE AUTENTICACIÓN =====

@app.post("/api/auth/login/student", response_model=schemas.TokenResponse)
def login_student(
    credentials: schemas.StudentLoginRequest,
    db: Session = Depends(get_db)
):
    """
    Endpoint de login para estudiantes.
    Valida el código estudiantil y contraseña.
    """
    # Buscar estudiante por student_id
    student = db.query(models.Student).filter(
        models.Student.student_id == credentials.student_id
    ).first()
    
    if not student:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Código estudiantil o contraseña incorrectos"
        )
    
    # Verificar contraseña
    if not verify_password(credentials.password, student.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Código estudiantil o contraseña incorrectos"
        )
    
    # Verificar que el usuario esté activo
    if not student.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Usuario inactivo. Contacta al administrador."
        )
    
    # Crear token JWT
    access_token = create_access_token(
        data={
            "sub": student.student_id,
            "role": "student",
            "user_id": student.id
        }
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": "student",
        "user": {
            "id": student.id,
            "student_id": student.student_id,
            "full_name": student.full_name,
            "email": student.email
        }
    }


@app.post("/api/auth/login/admin", response_model=schemas.TokenResponse)
def login_admin(
    credentials: schemas.AdminLoginRequest,
    db: Session = Depends(get_db)
):
    """
    Endpoint de login para administradores.
    Valida el username y contraseña.
    """
    # Buscar admin por username
    admin = db.query(models.Admin).filter(
        models.Admin.username == credentials.username
    ).first()
    
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario o contraseña incorrectos"
        )
    
    # Verificar contraseña
    if not verify_password(credentials.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario o contraseña incorrectos"
        )
    
    # Verificar que el usuario esté activo
    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Usuario inactivo. Contacta al superadministrador."
        )
    
    # Crear token JWT
    access_token = create_access_token(
        data={
            "sub": admin.username,
            "role": "admin",
            "user_id": admin.id,
            "is_superuser": admin.is_superuser
        }
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": "admin",
        "user": {
            "id": admin.id,
            "username": admin.username,
            "full_name": admin.full_name,
            "email": admin.email,
            "is_superuser": admin.is_superuser
        }
    }


# ===== ENDPOINTS DE REGISTRO (OPCIONAL - PARA TESTING) =====

@app.post("/api/students/register", response_model=schemas.StudentResponse)
def register_student(
    student: schemas.StudentCreate,
    db: Session = Depends(get_db)
):
    """
    Registra un nuevo estudiante.
    (En producción, esto debería estar protegido o deshabilitado)
    """
    # Verificar si ya existe
    existing = db.query(models.Student).filter(
        (models.Student.student_id == student.student_id) |
        (models.Student.email == student.email)
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El código estudiantil o email ya están registrados"
        )
    
    # Crear nuevo estudiante
    db_student = models.Student(
        student_id=student.student_id,
        full_name=student.full_name,
        email=student.email,
        hashed_password=get_password_hash(student.password)
    )
    
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    
    return db_student


@app.post("/api/admins/register", response_model=schemas.AdminResponse)
def register_admin(
    admin: schemas.AdminCreate,
    db: Session = Depends(get_db)
):
    """
    Registra un nuevo administrador.
    (En producción, esto debería estar muy protegido)
    """
    # Verificar si ya existe
    existing = db.query(models.Admin).filter(
        (models.Admin.username == admin.username) |
        (models.Admin.email == admin.email)
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El username o email ya están registrados"
        )
    
    # Crear nuevo admin
    db_admin = models.Admin(
        username=admin.username,
        full_name=admin.full_name,
        email=admin.email,
        hashed_password=get_password_hash(admin.password),
        is_superuser=admin.is_superuser
    )
    
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    
    return db_admin


# ===== ENDPOINTS DE INFORMACIÓN =====

@app.get("/api/students/me", response_model=schemas.StudentResponse)
def get_current_student(
    token: str,
    db: Session = Depends(get_db)
):
    """
    Obtiene información del estudiante actual basado en el token.
    """
    from auth import decode_access_token
    
    payload = decode_access_token(token)
    if not payload or payload.get("role") != "student":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado"
        )
    
    student = db.query(models.Student).filter(
        models.Student.student_id == payload.get("sub")
    ).first()
    
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Estudiante no encontrado"
        )
    
    return student


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

