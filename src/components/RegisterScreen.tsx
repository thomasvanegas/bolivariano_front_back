import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { User, Mail, Lock, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { api } from '@/lib/api';
import { Alert, AlertDescription } from './ui/alert';
import Image from 'next/image';

/**
 * Props de la pantalla de registro.
 */
interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onBackToLogin: () => void;
}

/**
 * Pantalla de registro para nuevos estudiantes.
 * Permite crear una cuenta usando el código estudiantil, email institucional y contraseña.
 */
export function RegisterScreen({ onRegisterSuccess, onBackToLogin }: RegisterScreenProps) {
  // Estado del formulario
  const [formData, setFormData] = useState({
    student_id: '',
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Estados de UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  /**
   * Valida el formulario antes de enviar
   */
  const validateForm = (): string | null => {
    if (!formData.student_id || !formData.full_name || !formData.email || !formData.password) {
      return 'Todos los campos son obligatorios';
    }

    if (formData.password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Las contraseñas no coinciden';
    }

    if (!formData.email.includes('@')) {
      return 'Ingresa un email válido';
    }

    return null;
  };

  /**
   * Maneja el envío del formulario de registro
   */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar formulario
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // Llamar a la API para registrar
      await api.registerStudent({
        student_id: formData.student_id,
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
      });

      // Mostrar mensaje de éxito
      setSuccess(true);

      // Esperar 2 segundos y volver al login
      setTimeout(() => {
        onRegisterSuccess();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Error al registrar. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Actualiza un campo del formulario
   */
  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setError(''); // Limpiar error al escribir
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo y encabezado */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Image 
              src="/Logo-UPB-2022.png" 
              alt="Universidad Pontificia Bolivariana" 
              width={120} 
              height={120}
              className="w-auto h-24 object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl tracking-tight text-black font-bold">Bolivariano</h1>
            <p className="text-sm text-gray-700 mt-1 font-medium">
              Asistente Académico Inteligente
            </p>
          </div>
        </div>

        {/* Card de registro */}
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={onBackToLogin}
                className="p-1 hover:bg-gray-100 rounded-full transition-smooth"
                type="button"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <CardTitle className="text-xl">Crear Cuenta</CardTitle>
            </div>
            <CardDescription>
              Regístrate con tus credenciales institucionales
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {/* Mensaje de éxito */}
            {success && (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  ¡Registro exitoso! Redirigiendo al inicio de sesión...
                </AlertDescription>
              </Alert>
            )}

            {/* Mensaje de error */}
            {error && !success && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Formulario de registro */}
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Campo: Código Estudiantil */}
              <div className="space-y-2">
                <Label htmlFor="student_id">Código Estudiantil</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="student_id"
                    type="text"
                    placeholder="Ej: 2024123456"
                    value={formData.student_id}
                    onChange={(e) => updateField('student_id', e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading || success}
                  />
                </div>
              </div>

              {/* Campo: Nombre Completo */}
              <div className="space-y-2">
                <Label htmlFor="full_name">Nombre Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="full_name"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.full_name}
                    onChange={(e) => updateField('full_name', e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading || success}
                  />
                </div>
              </div>

              {/* Campo: Email Institucional */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Institucional</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu.correo@upb.edu.co"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading || success}
                  />
                </div>
              </div>

              {/* Campo: Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading || success}
                  />
                </div>
              </div>

              {/* Campo: Confirmar Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repite tu contraseña"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading || success}
                  />
                </div>
              </div>

              {/* Botón de registro */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#DD198D] to-[#B934E3] hover:opacity-90 transition-smooth text-white font-semibold"
                disabled={isLoading || success}
              >
                {isLoading ? 'Registrando...' : success ? 'Registro Exitoso' : 'Crear Cuenta'}
              </Button>
            </form>

            {/* Link para volver al login */}
            <div className="text-center text-sm text-gray-600 mt-4">
              <p>
                ¿Ya tienes cuenta?{' '}
                <button
                  onClick={onBackToLogin}
                  className="text-[#DD198D] hover:text-[#B934E3] font-semibold transition-smooth"
                  disabled={isLoading}
                >
                  Inicia Sesión
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pie de página */}
        <div className="text-center text-xs text-gray-600 space-y-1">
          <p>Universidad Pontificia Bolivariana (UPB) | Medellín, Colombia</p>
          <p className="text-[#B934E3] font-medium">Bolivariano: Asistente Académico Inteligente</p>
        </div>
      </div>
    </div>
  );
}
