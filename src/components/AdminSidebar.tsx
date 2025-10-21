import React from 'react';
import { Database, Send, BarChart3, Settings, MessageCircle } from 'lucide-react';
import { Screen } from '../app/App';
import Image from 'next/image';

interface AdminSidebarProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export function AdminSidebar({ currentScreen, onScreenChange }: AdminSidebarProps) {
  const menuItems = [
    { id: 'chat' as Screen, icon: MessageCircle, label: 'Chat Académico', badge: null },
    { id: 'knowledge-base' as Screen, icon: Database, label: 'Base de Conocimiento', badge: null },
    { id: 'notification-manager' as Screen, icon: Send, label: 'Gestionar Notificaciones', badge: null },
    { id: 'analytics' as Screen, icon: BarChart3, label: 'Analíticas', badge: 'Próximamente' },
    { id: 'settings' as Screen, icon: Settings, label: 'Configuración', badge: 'Próximamente' },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 shadow-sm flex flex-col">
      <div className="p-6 flex-1">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Image 
              src="/Logo-UPB-2022.svg" 
              alt="UPB" 
              width={44} 
              height={44}
              className="w-11 h-11 object-contain"
            />
            <div>
              <h2 className="font-semibold text-black">Bolivariano</h2>
              <p className="text-xs text-gray-600">Panel Administrativo</p>
            </div>
          </div>
          <div className="inline-flex items-center px-3 py-1.5 bg-purple-50 text-[#B934E3] rounded-full border border-purple-200">
            <span className="w-2 h-2 bg-[#B934E3] rounded-full mr-2"></span>
            <span className="text-sm font-medium">Panel de Administrador</span>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            const isDisabled = item.badge === 'Próximamente';
            
            return (
              <button
                key={item.id}
                onClick={() => !isDisabled && onScreenChange(item.id)}
                disabled={isDisabled}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-smooth ${
                  isActive
                    ? 'bg-gradient-to-r from-[#B934E3] to-[#F3095A] text-white font-medium'
                    : isDisabled
                    ? 'text-gray-400 cursor-not-allowed opacity-60'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#B934E3]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.badge === 'Próximamente' 
                      ? 'bg-gray-200 text-gray-600'
                      : isActive 
                      ? 'bg-white/20 text-white'
                      : 'bg-[#B934E3] text-white'
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