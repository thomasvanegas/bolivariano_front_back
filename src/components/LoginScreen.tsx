import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent } from './ui/tabs';
import { BolivarianoLogo } from './BolivarianoLogo';
import { GraduationCap, Shield, User, Lock } from 'lucide-react';

/**
 * Props de la pantalla de inicio de sesión.
 * - onLogin: callback invocado cuando la autenticación es exitosa, con el rol elegido.
 */
interface LoginScreenProps {
  onLogin: (role: 'student' | 'admin') => void;
}

/**
 * Pantalla de autenticación para usuarios Estudiante y Administrador.
 * Gestiona formularios separados por rol mediante pestañas y simula el proceso de login.
 */
export function LoginScreen({ onLogin }: LoginScreenProps) {
  // Estado para el formulario de Estudiante: id institucional y contraseña
  const [studentForm, setStudentForm] = useState({ id: '', password: '' });
  // Estado para el formulario de Administrador: usuario y contraseña
  const [adminForm, setAdminForm] = useState({ username: '', password: '' });
  // Bandera global de carga durante la "verificación" de credenciales
  const [isLoading, setIsLoading] = useState(false);
  // Rol seleccionado actualmente para mostrar el formulario correspondiente
  const [selectedRole, setSelectedRole] = useState<'student' | 'admin'>('student');

  /**
   * Maneja el envío del formulario de Estudiante.
   * Simula una verificación asíncrona y, si es "exitosa", notifica el rol 'student'.
   */
  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular autenticación
    setTimeout(() => {
      setIsLoading(false);
      onLogin('student');
    }, 1000);
  };

  /**
   * Maneja el envío del formulario de Administrador.
   * Simula una verificación asíncrona y, si es "exitosa", notifica el rol 'admin'.
   */
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular autenticación
    setTimeout(() => {
      setIsLoading(false);
      onLogin('admin');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bolivariano-blue-50 to-bolivariano-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo y encabezado de la aplicación */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <BolivarianoLogo size="xl" variant="tile" className="shadow-lg" />
          </div>
          <div>
            <h1 className="text-3xl tracking-tight text-black font-bold">Bolivariano</h1>
            <p className="text-sm text-bolivariano-blue-700 mt-1 font-medium">
              Asistente Académico Inteligente
            </p>
          </div>
        </div>

        {/* Contenedor principal con tabs para seleccionar el tipo de cuenta (Estudiante/Administrador). */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
              Accede con tu cuenta institucional
            </CardDescription>
            <CardDescription className="text-center">
            (ID y contraseña habituales de la universidad)
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            {/* Selector visual de rol para mostrar el formulario correspondiente */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  selectedRole === 'student' 
                    ? 'text-bolivariano-blue-700 font-semibold' 
                    : 'text-foreground hover:text-bolivariano-blue-600'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Estudiante
              </button>
              <span className="text-muted-foreground">/</span>
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  selectedRole === 'admin' 
                    ? 'text-bolivariano-blue-700 font-semibold' 
                    : 'text-foreground hover:text-bolivariano-blue-600'
                }`}
              >
                <Shield className="w-4 h-4" />
                Admin
              </button>
            </div>

            <Tabs value={selectedRole} className="w-full">

              {/* Formulario para Estudiante: solicita código y contraseña institucional. */}
              <TabsContent value="student" className="space-y-4 mt-0">
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  {/* Campo: Código Estudiantil */}
                  <div className="space-y-2">
                    <Label htmlFor="student-id">Código Estudiantil</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="student-id"
                        type="text"
                        placeholder="Ej: 2024123456"
                        value={studentForm.id}
                        onChange={(e) => setStudentForm({ ...studentForm, id: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  {/* Campo: Contraseña del estudiante */}
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="student-password"
                        type="password"
                        placeholder="Tu contraseña"
                        value={studentForm.password}
                        onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  {/* Acción: enviar formulario de estudiante */}
                  <Button 
                    type="submit"
                    className="w-full"
                    variant="black"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Verificando...' : 'Acceder como Estudiante'}
                  </Button>
                </form>

                
                <div className="text-center text-sm text-muted-foreground mt-4">
                  <p>¿Olvidaste tu contraseña?</p>
                  <button className="text-primary hover:underline">
                    Recuperar acceso (Próximamente)
                  </button>
                </div>
                
                
              </TabsContent>

              {/* Formulario para Administrador: solicita usuario administrativo y contraseña. */}
              <TabsContent value="admin" className="space-y-4 mt-0">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  {/* Campo: Usuario administrativo */}
                  <div className="space-y-2">
                    <Label htmlFor="admin-username">Usuario Administrativo</Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-username"
                        type="text"
                        placeholder="usuario.admin"
                        value={adminForm.username}
                        onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  {/* Campo: Contraseña administrativa */}
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-password"
                        type="password"
                        placeholder="Contraseña administrativa"
                        value={adminForm.password}
                        onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  {/* Acción: enviar formulario de administrador */}
                  <Button 
                    type="submit"
                    className="w-full"
                    variant="black"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Verificando...' : 'Acceder como Administrador'}
                  </Button>
                </form>
                <div className="text-center text-sm text-muted-foreground mt-4">
                  <p>Acceso restringido al personal autorizado</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Pie de página con información institucional y sello de la aplicación. */}
        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>Universidad Pontificia Bolivariana (UPB) | Medellín, Colombia</p>
          <p className="text-bolivariano-blue-700">Bolivariano: Asistente Académico Inteligente</p>
        </div>
      </div>
    </div>
  );
}