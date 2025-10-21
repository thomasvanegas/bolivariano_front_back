import React from 'react';
import { MessageCircle, History, Quote, HelpCircle, Bell } from 'lucide-react';
import { Screen } from '../app/App';
import Image from 'next/image';

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
              <p className="text-xs text-gray-600">Asistente Académico</p>
            </div>
          </div>
          <div className="inline-flex items-center px-3 py-1.5 bg-pink-50 text-[#DD198D] rounded-full border border-pink-200">
            <span className="w-2 h-2 bg-[#DD198D] rounded-full mr-2"></span>
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
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-smooth ${
                  isActive
                    ? 'bg-gradient-to-r from-[#DD198D] to-[#B934E3] text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#DD198D]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#DD198D] text-white'
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