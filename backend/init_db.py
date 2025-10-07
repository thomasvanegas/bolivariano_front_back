"""
Script para inicializar la base de datos con usuarios de prueba.
Ejecuta este script una sola vez después de configurar tu base de datos.

Uso: python init_db.py

Nota sobre seguridad:
Las contraseñas se hashean usando SHA256 + bcrypt, lo que permite
contraseñas de cualquier longitud (sin el límite de 72 bytes de bcrypt).
"""

from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from auth import get_password_hash

def init_database():
    """
    Crea las tablas y agrega usuarios de prueba.
    """
    print("Creando tablas en la base de datos...")
    models.Base.metadata.create_all(bind=engine)
    print("Tablas creadas exitosamente")
    
    db: Session = SessionLocal()
    
    try:
        # Verificar si ya existen usuarios
        existing_students = db.query(models.Student).count()
        existing_admins = db.query(models.Admin).count()
        
        if existing_students > 0 or existing_admins > 0:
            print(" Ya existen usuarios en la base de datos")
            response = input("¿Deseas agregar usuarios de prueba de todas formas? (s/n): ")
            if response.lower() != 's':
                print("Operación cancelada")
                return
        
        # Creacion de estudiantes de prueba
        print("\nCreando estudiantes de prueba...")
        students_data = [
            {
                "student_id": "000287429",
                "full_name": "Thomas Camilo Vanegas Acevedo",
                "email": "thomas.vanegas@upb.edu.co",
                "password": "thomas123"
            },
            {
                "student_id": "000478320",
                "full_name": "María García López",
                "email": "maria.garcia@upb.edu.co",
                "password": "maria123"
            },
            {
                "student_id": "000356473",
                "full_name": "Carlos Rodríguez Martínez",
                "email": "carlos.rodriguez@upb.edu.co",
                "password": "carlos123"
            }
        ]
        
        for student_data in students_data:
            # Verificar si ya existe
            existing = db.query(models.Student).filter(
                models.Student.student_id == student_data["student_id"]
            ).first()
            
            if not existing:
                student = models.Student(
                    student_id=student_data["student_id"],
                    full_name=student_data["full_name"],
                    email=student_data["email"],
                    hashed_password=get_password_hash(student_data["password"])
                )
                db.add(student)
                print(f"Estudiante creado: {student_data['student_id']} - {student_data['full_name']}")
            else:
                print(f"Estudiante ya existe: {student_data['student_id']}")
        
        # Creacion de administradores de prueba
        print("\nCreando administradores de prueba...")
        admins_data = [
            {
                "username": "admin.upb",
                "full_name": "Administrador Principal",
                "email": "admin@upb.edu.co",
                "password": "admin123",
                "is_superuser": True
            },
            {
                "username": "soporte.upb",
                "full_name": "Soporte Técnico",
                "email": "soporte@upb.edu.co",
                "password": "soporte123",
                "is_superuser": False
            }
        ]
        
        for admin_data in admins_data:
            # Verificar si ya existe
            existing = db.query(models.Admin).filter(
                models.Admin.username == admin_data["username"]
            ).first()
            
            if not existing:
                admin = models.Admin(
                    username=admin_data["username"],
                    full_name=admin_data["full_name"],
                    email=admin_data["email"],
                    hashed_password=get_password_hash(admin_data["password"]),
                    is_superuser=admin_data["is_superuser"]
                )
                db.add(admin)
                print(f"Admin creado: {admin_data['username']} - {admin_data['full_name']}")
            else:
                print(f"Admin ya existe: {admin_data['username']}")
        
        # Guardar cambios
        db.commit()
        
        print("\nBase de datos inicializada correctamente!")
        print("\n" + "="*60)
        print("CREDENCIALES DE PRUEBA")
        print("="*60)
        print("\nESTUDIANTES:")
        print("  Código: 000287429 | Contraseña: thomas123")
        print("  Código: 000478320 | Contraseña: maria123")
        print("  Código: 000356473 | Contraseña: carlos123")
        print("\nADMINISTRADORES:")
        print("  Usuario: admin.upb    | Contraseña: admin123 (Superusuario)")
        print("  Usuario: soporte.upb  | Contraseña: soporte123")
        print("="*60)
        
    except Exception as e:
        print(f"\nError al inicializar la base de datos: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    print("="*60)
    print("INICIALIZACIÓN DE BASE DE DATOS - BOLIVARIANO")
    print("="*60)
    init_database()

