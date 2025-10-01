import React from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from './ui/sheet';
import { Menu, MessageCircle, History, Quote, HelpCircle, Bell, BookOpen, Send, LogOut } from 'lucide-react';
import { Screen, UserRole } from '../app/App';

interface MobileNavProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  userRole: UserRole;
  onLogout: () => void;
}

export function MobileNav({ currentScreen, onScreenChange, userRole, onLogout }: MobileNavProps) {
  const studentMenuItems = [
    { id: 'chat' as Screen, icon: MessageCircle, label: 'Chat Académico' },
    { id: 'history' as Screen, icon: History, label: 'Historial' },
    { id: 'citation' as Screen, icon: Quote, label: 'Citaciones' },
    { id: 'examples' as Screen, icon: HelpCircle, label: 'Preguntas Ejemplo' },
    { id: 'notifications' as Screen, icon: Bell, label: 'Notificaciones' },
  ];

  const adminMenuItems = [
    { id: 'chat' as Screen, icon: MessageCircle, label: 'Chat Académico' },
    { id: 'knowledge-base' as Screen, icon: BookOpen, label: 'Base de Conocimiento' },
    { id: 'notification-manager' as Screen, icon: Send, label: 'Gestionar Notificaciones' },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : studentMenuItems;

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SheetTitle className="sr-only">
            Menú de navegación {userRole === 'admin' ? 'administrativo' : 'estudiantil'}
          </SheetTitle>
          <SheetDescription className="sr-only">
            Navega entre las diferentes secciones de la aplicación Bolivariano
          </SheetDescription>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-sm text-white">B</span>
                </div>
                <div>
                  <h2 className="font-medium">Bolivariano</h2>
                  <p className="text-xs text-muted-foreground">
                    {userRole === 'admin' ? 'Panel Administrativo' : 'Asistente Académico'}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="px-3 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onScreenChange(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      currentScreen === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <Button
                variant="ghost"
                onClick={onLogout}
                className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}