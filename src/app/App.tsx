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

export type Screen = 'chat' | 'history' | 'citation' | 'examples' | 'notifications' | 'knowledge-base' | 'notification-manager';
export type UserRole = 'student' | 'admin';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('chat');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
    setCurrentScreen('chat');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('chat');
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

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
        <Header 
          userRole={userRole} 
          onRoleChange={setUserRole}
          currentScreen={currentScreen}
          onScreenChange={setCurrentScreen}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}