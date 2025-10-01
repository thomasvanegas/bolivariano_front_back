import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BolivarianoLogo } from './BolivarianoLogo';
import { GraduationCap, Shield, User, Lock } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (role: 'student' | 'admin') => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [studentForm, setStudentForm] = useState({ id: '', password: '' });
  const [adminForm, setAdminForm] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular autenticación
    setTimeout(() => {
      setIsLoading(false);
      onLogin('student');
    }, 1000);
  };

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
        {/* Logo y Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <BolivarianoLogo size="xl" variant="gradient" className="shadow-lg" />
          </div>
          <div>
            <h1 className="text-3xl tracking-tight text-bolivariano-dark font-bold">Bolivariano</h1>
            <p className="text-sm text-bolivariano-blue-700 mt-1 font-medium">
              Asistente Académico Inteligente
            </p>
          </div>
        </div>

        {/* Tabs de Login */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
              Accede con tu cuenta institucional
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Estudiante
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Administrador
                </TabsTrigger>
              </TabsList>

              {/* Login Estudiante */}
              <TabsContent value="student" className="space-y-4 mt-0">
                <form onSubmit={handleStudentLogin} className="space-y-4">
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
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Verificando...' : 'Acceder como Estudiante'}
                  </Button>
                </form>
                <div className="text-center text-sm text-muted-foreground mt-4">
                  <p>¿Olvidaste tu contraseña?</p>
                  <button className="text-primary hover:underline">
                    Recuperar acceso
                  </button>
                </div>
              </TabsContent>

              {/* Login Administrador */}
              <TabsContent value="admin" className="space-y-4 mt-0">
                <form onSubmit={handleAdminLogin} className="space-y-4">
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
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90" 
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

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground space-y-1">
          <p>Universidad Pontificia Bolivariana (UPB) | Medellín, Colombia</p>
          <p>Bolivariano: Asistente Académico Inteligente</p>
        </div>
      </div>
    </div>
  );
}