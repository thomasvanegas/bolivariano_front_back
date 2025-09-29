import React from 'react';
import { Database, Send, BarChart3, Settings, MessageCircle } from 'lucide-react';
import { Screen } from '../App';

interface AdminSidebarProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export function AdminSidebar({ currentScreen, onScreenChange }: AdminSidebarProps) {
  const menuItems = [
    { id: 'chat' as Screen, icon: MessageCircle, label: 'Chat Académico', badge: null },
    { id: 'knowledge-base' as Screen, icon: Database, label: 'Base de Conocimiento', badge: null },
    { id: 'notification-manager' as Screen, icon: Send, label: 'Gestionar Notificaciones', badge: null },
    { id: 'analytics' as Screen, icon: BarChart3, label: 'Analíticas', badge: 'Próximo' },
    { id: 'settings' as Screen, icon: Settings, label: 'Configuración', badge: null },
  ];

  return (
    <aside className="w-72 bg-card border-r border-border shadow-sm flex flex-col">
      <div className="p-6 flex-1">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-lg text-white">B</span>
            </div>
            <div>
              <h2 className="font-medium text-foreground">Bolivariano</h2>
              <p className="text-xs text-muted-foreground">Panel Administrativo</p>
            </div>
          </div>
          <div className="inline-flex items-center px-3 py-1.5 bg-primary/10 text-primary rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            <span className="text-sm">Panel de Administrador</span>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            const isDisabled = item.badge === 'Próximo';
            
            return (
              <button
                key={item.id}
                onClick={() => !isDisabled && onScreenChange(item.id)}
                disabled={isDisabled}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : isDisabled
                    ? 'text-muted-foreground cursor-not-allowed opacity-60'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.badge === 'Próximo' 
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}