from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

import models
import schemas
from database import engine, get_db
from auth import verify_password, get_password_hash, create_access_token
from storage import storage_service

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


# ===== ENDPOINTS DE GESTIÓN DE DOCUMENTOS =====

@app.post("/api/documents/upload", response_model=schemas.DocumentResponse)
async def upload_document(
    file: UploadFile = File(...),
    category: str = Form("Sin categoría"),
    description: Optional[str] = Form(None),
    tags: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    """
    Endpoint para subir un nuevo documento a la base de conocimiento.
    El archivo se sube al storage en la nube (S3/R2) y se guarda la metadata en la BD.
    """
    try:
        # Subir archivo al storage
        storage_url, storage_key, file_size = storage_service.upload_file(file)
        
        # Determinar el tipo de archivo
        file_type = file.filename.split('.')[-1].upper()
        
        # Crear registro en la base de datos
        db_document = models.Document(
            name=file.filename,
            file_type=file_type,
            file_size=file_size,
            category=category,
            description=description,
            tags=tags,
            storage_url=storage_url,
            storage_key=storage_key,
            status=models.DocumentStatus.PROCESSING
        )
        
        db.add(db_document)
        db.commit()
        db.refresh(db_document)
        
        # Simular procesamiento automático (en producción, esto sería async)
        # Por ahora lo marcamos como ready inmediatamente
        db_document.status = models.DocumentStatus.READY
        db_document.processed_at = datetime.now()
        db.commit()
        db.refresh(db_document)
        
        return db_document
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error al procesar el documento: {str(e)}"
        )


@app.get("/api/documents", response_model=schemas.DocumentListResponse)
def list_documents(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Lista todos los documentos con filtros opcionales.
    """
    query = db.query(models.Document)
    
    # Aplicar filtros
    if category and category != "all":
        query = query.filter(models.Document.category == category)
    
    if status:
        query = query.filter(models.Document.status == status)
    
    if search:
        query = query.filter(models.Document.name.ilike(f"%{search}%"))
    
    # Ordenar por fecha de creación (más recientes primero)
    query = query.order_by(models.Document.created_at.desc())
    
    # Contar total
    total = query.count()
    
    # Aplicar paginación
    documents = query.offset(skip).limit(limit).all()
    
    return {
        "total": total,
        "documents": documents
    }


@app.get("/api/documents/{document_id}", response_model=schemas.DocumentResponse)
def get_document(
    document_id: int,
    db: Session = Depends(get_db)
):
    """
    Obtiene información detallada de un documento específico.
    """
    document = db.query(models.Document).filter(
        models.Document.id == document_id
    ).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Documento no encontrado"
        )
    
    return document


@app.put("/api/documents/{document_id}", response_model=schemas.DocumentResponse)
def update_document(
    document_id: int,
    document_update: schemas.DocumentUpdate,
    db: Session = Depends(get_db)
):
    """
    Actualiza la metadata de un documento.
    """
    document = db.query(models.Document).filter(
        models.Document.id == document_id
    ).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Documento no encontrado"
        )
    
    # Actualizar solo los campos proporcionados
    update_data = document_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(document, field, value)
    
    db.commit()
    db.refresh(document)
    
    return document


@app.delete("/api/documents/{document_id}")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db)
):
    """
    Elimina un documento de la base de conocimiento.
    Elimina tanto el archivo del storage como el registro de la BD.
    """
    document = db.query(models.Document).filter(
        models.Document.id == document_id
    ).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Documento no encontrado"
        )
    
    # Eliminar archivo del storage
    try:
        storage_service.delete_file(document.storage_key)
    except Exception as e:
        # Log el error pero continuar con la eliminación de la BD
        print(f"Error al eliminar archivo del storage: {str(e)}")
    
    # Eliminar registro de la BD
    db.delete(document)
    db.commit()
    
    return {
        "message": "Documento eliminado exitosamente",
        "document_id": document_id
    }


@app.get("/api/documents/{document_id}/download-url")
def get_download_url(
    document_id: int,
    db: Session = Depends(get_db)
):
    """
    Genera una URL firmada temporalmente para descargar el documento.
    """
    document = db.query(models.Document).filter(
        models.Document.id == document_id
    ).first()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Documento no encontrado"
        )
    
    # Generar URL firmada (válida por 1 hora)
    download_url = storage_service.generate_presigned_url(document.storage_key)
    
    return {
        "download_url": download_url,
        "document_id": document_id,
        "filename": document.name
    }


@app.get("/api/documents/categories/list")
def list_categories(db: Session = Depends(get_db)):
    """
    Retorna la lista de categorías únicas de documentos.
    """
    categories = db.query(models.Document.category).distinct().all()
    return {
        "categories": [cat[0] for cat in categories if cat[0]]
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

