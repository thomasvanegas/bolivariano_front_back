"use client"

import React, { useState } from 'react';
import { ChatInterface } from '../components/ChatInterface';
import { Sidebar } from '../components/Sidebar';
import { AdminSidebar } from '../components/AdminSidebar';
import { Header } from '../components/Header';
import { LoginScreen } from '../components/LoginScreen';
import { HistoryScreen } from '../components/HistoryScreen';
import { CitationScreen } from '../components/CitationScreen';
import { ExampleQuestionsScreen } from '../components/ExampleQuestionsScreen';
import { NotificationsScreen } from '../components/NotificationsScreen';
import { KnowledgeBaseScreen } from '../components/KnowledgeBaseScreen';
import { NotificationManagerScreen } from '../components/NotificationManagerScreen';

/**
 * Conjunto de pantallas disponibles en la aplicación.
 */
export type Screen = 'chat' | 'history' | 'citation' | 'examples' | 'notifications' | 'knowledge-base' | 'notification-manager';

/**
 * Roles admitidos para controlar la experiencia de usuario (permisos y navegación).
 */
export type UserRole = 'student' | 'admin';

/**
 * Componente raíz de la aplicación. Gestiona autenticación, rol y navegación entre pantallas.
 */
export default function App() {
  // Pantalla actualmente activa en el contenido principal
  const [currentScreen, setCurrentScreen] = useState<Screen>('chat');
  // Rol del usuario autenticado (afecta navegación y menús)
  const [userRole, setUserRole] = useState<UserRole>('student');
  // Estado de autenticación básico para mostrar login o el resto de la app
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Maneja el inicio de sesión estableciendo rol, autenticación y llevando al chat.
   */
  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setCurrentScreen('chat');
  };

  /**
   * Cierra sesión y regresa a la pantalla de chat por defecto.
   */
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('chat');
  };

  // Si no está autenticado, se muestra la pantalla de login y se detiene el render del resto
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  /**
   * Devuelve el contenido principal según la pantalla seleccionada.
   */
  const renderContent = () => {
    switch (currentScreen) {
      case 'chat':
        return <ChatInterface />;
      case 'history':
        return <HistoryScreen />;
      case 'citation':
        return <CitationScreen />;
      case 'examples':
        return <ExampleQuestionsScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'knowledge-base':
        return <KnowledgeBaseScreen />;
      case 'notification-manager':
        return <NotificationManagerScreen />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="h-screen flex bg-bolivariano-blue-50">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        {userRole === 'admin' ? (
          <AdminSidebar currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
        ) : (
          <Sidebar currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
        )}
      </div>
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Barra superior: permite cambiar rol, navegar y cerrar sesión */}
        <Header 
          userRole={userRole} 
          onRoleChange={setUserRole}
          currentScreen={currentScreen}
          onScreenChange={setCurrentScreen}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-hidden">
          {/* Contenido principal segun la pantalla activa */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
}