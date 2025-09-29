import React from 'react';
import { MessageCircle, History, Quote, HelpCircle, Bell } from 'lucide-react';
import { Screen } from '../App';

interface SidebarProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export function Sidebar({ currentScreen, onScreenChange }: SidebarProps) {
  const menuItems = [
    { id: 'chat' as Screen, icon: MessageCircle, label: 'Chat Académico', badge: null },
    { id: 'history' as Screen, icon: History, label: 'Historial', badge: null },
    { id: 'citation' as Screen, icon: Quote, label: 'Citaciones', badge: null },
    { id: 'examples' as Screen, icon: HelpCircle, label: 'Preguntas Ejemplo', badge: null },
    { id: 'notifications' as Screen, icon: Bell, label: 'Notificaciones', badge: 3 },
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
              <p className="text-xs text-muted-foreground">Asistente Académico</p>
            </div>
          </div>
          <div className="inline-flex items-center px-3 py-1.5 bg-accent text-accent-foreground rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            <span className="text-sm">Portal Estudiantil</span>
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
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
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