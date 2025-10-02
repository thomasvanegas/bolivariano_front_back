import React from 'react';
import { Button } from './ui/button';
import { MobileNav } from './MobileNav';
import { BolivarianoLogo } from './BolivarianoLogo';
import { LogOut } from 'lucide-react';
import { Screen, UserRole } from '../app/App';

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
          <BolivarianoLogo size="md" variant="tile" />
          <div className="hidden sm:block">
            <h1 className="font-medium text-foreground">Bolivariano</h1>
            <p className="text-xs text-muted-foreground">
              {userRole === 'admin' ? 'Panel Administrativo' : 'Asistente Académico'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Desktop role switcher - hidden on mobile */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onRoleChange('student')}
            className={`text-xs ${userRole === 'student' ? 'text-bolivariano-blue-700 font-medium' : 'text-foreground'}`}
          >
            Estudiante
          </button>
          <span className="text-muted-foreground"> / </span>
          <button
            onClick={() => onRoleChange('admin')}
            className={`text-xs ${userRole === 'admin' ? 'text-bolivariano-blue-700 font-medium' : 'text-foreground'}`}
          >
            Admin
          </button>
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