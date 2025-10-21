import React from 'react';
import { Button } from './ui/button';
import { MobileNav } from './MobileNav';
import { LogOut } from 'lucide-react';
import { Screen, UserRole } from '../app/App';
import Image from 'next/image';

interface HeaderProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  onLogout: () => void;
}

export function Header({ userRole, onRoleChange, currentScreen, onScreenChange, onLogout }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <MobileNav 
          currentScreen={currentScreen}
          onScreenChange={onScreenChange}
          userRole={userRole}
          onLogout={onLogout}
        />
        <div className="flex items-center gap-3">
          <Image 
            src="/Logo-UPB-2022.svg" 
            alt="UPB" 
            width={40} 
            height={40}
            className="w-10 h-10 object-contain"
          />
          <div className="hidden sm:block">
            <h1 className="font-semibold text-black">Bolivariano</h1>
            <p className="text-xs text-gray-600">
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
            className={`text-xs transition-smooth ${userRole === 'student' ? 'text-[#DD198D] font-semibold' : 'text-gray-600 hover:text-[#DD198D]'}`}
          >
            Estudiante
          </button>
          <span className="text-gray-400"> / </span>
          <button
            onClick={() => onRoleChange('admin')}
            className={`text-xs transition-smooth ${userRole === 'admin' ? 'text-[#B934E3] font-semibold' : 'text-gray-600 hover:text-[#B934E3]'}`}
          >
            Admin
          </button>
        </div>
        
        {/* Desktop logout - hidden on mobile */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="hidden md:flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-xs">Cerrar Sesión</span>
        </Button>
      </div>
    </header>
  );
}