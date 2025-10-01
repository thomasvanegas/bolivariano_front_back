import React from 'react';
import { Database, Send, BarChart3, Settings, MessageCircle } from 'lucide-react';
import { BolivarianoLogo } from './BolivarianoLogo';
import { Screen } from '../app/App';

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
    <aside className="w-72 bg-card border-r border-bolivariano-blue-200 shadow-sm flex flex-col">
      <div className="p-6 flex-1">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BolivarianoLogo size="lg" variant="gradient" />
            <div>
              <h2 className="font-medium text-bolivariano-dark">Bolivariano</h2>
              <p className="text-xs text-bolivariano-blue-600">Panel Administrativo</p>
            </div>
          </div>
          <div className="inline-flex items-center px-3 py-1.5 bg-bolivariano-blue-100 text-bolivariano-blue-700 rounded-full border border-bolivariano-blue-200">
            <span className="w-2 h-2 bg-bolivariano-primary rounded-full mr-2"></span>
            <span className="text-sm font-medium">Panel de Administrador</span>
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
                    ? 'bg-bolivariano-primary text-white shadow-sm'
                    : isDisabled
                    ? 'text-bolivariano-blue-400 cursor-not-allowed opacity-60'
                    : 'text-bolivariano-dark hover:bg-bolivariano-blue-100 hover:text-bolivariano-blue-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.badge === 'Próximo' 
                      ? 'bg-bolivariano-blue-200 text-bolivariano-blue-600'
                      : 'bg-bolivariano-primary text-white'
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