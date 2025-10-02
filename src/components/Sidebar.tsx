import React from 'react';
import { MessageCircle, History, Quote, HelpCircle, Bell } from 'lucide-react';
import { BolivarianoLogo } from './BolivarianoLogo';
import { Screen } from '../app/App';

interface SidebarProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export function Sidebar({ currentScreen, onScreenChange }: SidebarProps) {
  const menuItems = [
    { id: 'chat' as Screen, icon: MessageCircle, label: 'Chat Académico', badge: null },
    { id: 'history' as Screen, icon: History, label: 'Historial', badge: null },
    { id: 'citation' as Screen, icon: Quote, label: 'Citaciones', badge: 'Próximamente' },
    { id: 'examples' as Screen, icon: HelpCircle, label: 'Preguntas Ejemplo', badge: null },
    { id: 'notifications' as Screen, icon: Bell, label: 'Notificaciones', badge: 3 },
  ];

  return (
    <aside className="w-72 bg-card border-r border-bolivariano-blue-200 shadow-sm flex flex-col">
      <div className="p-6 flex-1">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BolivarianoLogo size="lg" variant="tile" />
            <div>
              <h2 className="font-medium text-black">Bolivariano</h2>
              <p className="text-xs text-bolivariano-blue-600">Asistente Académico</p>
            </div>
          </div>
          <div className="inline-flex items-center px-3 py-1.5 bg-bolivariano-blue-100 text-bolivariano-blue-700 rounded-full border border-bolivariano-blue-200">
            <span className="w-2 h-2 bg-bolivariano-primary rounded-full mr-2"></span>
            <span className="text-sm font-medium">Portal Estudiantil</span>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onScreenChange(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl ${
                  isActive
                    ? 'text-bolivariano-blue-700 font-medium'
                    : 'text-bolivariano-dark'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-bolivariano-primary text-white text-xs px-2 py-1 rounded-full">
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