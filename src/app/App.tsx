"use client"

import React, { useState, useEffect } from 'react';
import { ChatInterface } from '../components/ChatInterface';
import { Sidebar } from '../components/Sidebar';
import { AdminSidebar } from '../components/AdminSidebar';
import { Header } from '../components/Header';
import { LoginScreen } from '../components/LoginScreen';
import { RegisterScreen } from '../components/RegisterScreen';
import { HomePage } from '../components/HomePage';
import { HistoryScreen } from '../components/HistoryScreen';
import { CitationScreen } from '../components/CitationScreen';
import { ExampleQuestionsScreen } from '../components/ExampleQuestionsScreen';
import { NotificationsScreen } from '../components/NotificationsScreen';
import { KnowledgeBaseScreen } from '../components/KnowledgeBaseScreen';
import { NotificationManagerScreen } from '../components/NotificationManagerScreen';
import { authUtils } from '@/lib/api';

/**
 * Conjunto de pantallas disponibles en la aplicación.
 */
export type Screen = 'chat' | 'history' | 'citation' | 'examples' | 'notifications' | 'knowledge-base' | 'notification-manager';

/**
 * Roles admitidos para controlar la experiencia de usuario (permisos y navegación).
 */
export type UserRole = 'student' | 'admin';

/**
 * Vistas principales de la aplicación (home, login, registro, app)
 */
export type AppView = 'home' | 'login' | 'register' | 'app';

/**
 * Componente raíz de la aplicación. Gestiona autenticación, rol y navegación entre pantallas.
 */
export default function App() {
  // Vista actual de la aplicación
  const [currentView, setCurrentView] = useState<AppView>('home');
  // Pantalla actualmente activa en el contenido principal de la app
  const [currentScreen, setCurrentScreen] = useState<Screen>('chat');
  // Rol del usuario autenticado (afecta navegación y menús)
  const [userRole, setUserRole] = useState<UserRole>('student');
  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Verifica si hay una sesión activa al cargar la app
   */
  useEffect(() => {
    const token = authUtils.getToken();
    const user = authUtils.getUser();
    
    if (token && user) {
      setIsAuthenticated(true);
      setUserRole(user.is_superuser !== undefined ? 'admin' : 'student');
      setCurrentView('app');
    }
  }, []);

  /**
   * Maneja el inicio de sesión estableciendo rol, autenticación y llevando a la app.
   */
  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setCurrentView('app');
    setCurrentScreen('chat');
  };

  /**
   * Cierra sesión y regresa a la home
   */
  const handleLogout = () => {
    authUtils.clearSession();
    setIsAuthenticated(false);
    setCurrentView('home');
    setCurrentScreen('chat');
  };

  /**
   * Navega al login desde la home
   */
  const navigateToLogin = () => {
    setCurrentView('login');
  };

  /**
   * Navega al registro desde la home o login
   */
  const navigateToRegister = () => {
    setCurrentView('register');
  };

  /**
   * Navega a la home
   */
  const navigateToHome = () => {
    setCurrentView('home');
  };

  /**
   * Maneja el éxito del registro
   */
  const handleRegisterSuccess = () => {
    setCurrentView('login');
  };

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

  /**
   * Renderiza la vista según el estado actual
   */
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomePage 
            onNavigateToLogin={navigateToLogin}
            onNavigateToRegister={navigateToRegister}
          />
        );
      
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      
      case 'register':
        return (
          <RegisterScreen 
            onRegisterSuccess={handleRegisterSuccess}
            onBackToLogin={navigateToLogin}
          />
        );
      
      case 'app':
        return (
          <div className="h-screen flex bg-white">
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
                {/* Contenido principal según la pantalla activa */}
                {renderContent()}
              </main>
            </div>
          </div>
        );
      
      default:
        return (
          <HomePage 
            onNavigateToLogin={navigateToLogin}
            onNavigateToRegister={navigateToRegister}
          />
        );
    }
  };

  return renderView();
}