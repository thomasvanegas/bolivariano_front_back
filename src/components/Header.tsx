import React from 'react';
import { Button } from './ui/button';
import { MobileNav } from './MobileNav';
import { LogOut } from 'lucide-react';
import { Screen, UserRole } from '../App';

interface HeaderProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  onLogout: () => void;
}

export function Header({ userRole, onRoleChange, currentScreen, onScreenChange, onLogout }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <MobileNav 
          currentScreen={currentScreen}
          onScreenChange={onScreenChange}
          userRole={userRole}
          onLogout={onLogout}
        />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-sm text-white">B</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-medium">Bolivariano</h1>
            <p className="text-xs text-muted-foreground">
              {userRole === 'admin' ? 'Panel Administrativo' : 'Asistente Académico'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Desktop role switcher - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant={userRole === 'student' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onRoleChange('student')}
            className="text-xs"
          >
            Estudiante
          </Button>
          <Button
            variant={userRole === 'admin' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onRoleChange('admin')}
            className="text-xs"
          >
            Admin
          </Button>
        </div>
        
        {/* Desktop logout - hidden on mobile */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-xs">Cerrar Sesión</span>
        </Button>
      </div>
    </header>
  );
}