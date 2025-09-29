import React, { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, Clock, Trash2, CheckCheck } from 'lucide-react';
import { Button } from './ui/button';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'reminder';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'info',
      title: 'Calendario Académico Actualizado',
      message: 'Se ha publicado el cronograma de inscripciones para el período 2025-1. Revisa las fechas importantes.',
      timestamp: new Date(2024, 11, 6, 15, 30),
      isRead: false,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Fecha límite de prácticas profesionales',
      message: 'Recuerda que el plazo para entregar documentos de prácticas vence el 15 de enero.',
      timestamp: new Date(2024, 11, 6, 12, 15),
      isRead: false,
    },
    {
      id: '3',
      type: 'success',
      title: 'Reglamento estudiantil actualizado',
      message: 'El reglamento estudiantil ha sido actualizado con nuevas disposiciones sobre evaluaciones.',
      timestamp: new Date(2024, 11, 6, 10, 45),
      isRead: true,
    },
    {
      id: '4',
      type: 'info',
      title: 'Nuevos procedimientos para Ingeniería en Ciencia de Datos',
      message: 'Se han establecido nuevos procedimientos para la selección de proyectos de grado.',
      timestamp: new Date(2024, 11, 5, 16, 20),
      isRead: true,
    },
    {
      id: '5',
      type: 'reminder',
      title: 'Verificación de citación disponible',
      message: 'Recuerda usar la herramienta de citaciones para verificar tus referencias académicas.',
      timestamp: new Date(2024, 11, 5, 9, 10),
      isRead: true,
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertCircle;
      case 'reminder':
        return Clock;
      default:
        return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'reminder':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Hoy ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Ayer ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="h-full bg-background p-4 md:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-8 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Notificaciones</h2>
              <p className="text-muted-foreground mt-2">
                {unreadCount > 0 
                  ? `Tienes ${unreadCount} notificación${unreadCount > 1 ? 'es' : ''} sin leer`
                  : 'Todas las notificaciones están al día'
                }
              </p>
            </div>
            
            {unreadCount > 0 && (
              <Button
                onClick={markAllAsRead}
                variant="outline"
                className="flex items-center space-x-2 w-full md:w-auto"
                size="sm"
              >
                <CheckCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Marcar todas como leídas</span>
                <span className="sm:hidden">Marcar todas</span>
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4 md:space-y-6">
          {notifications.length === 0 ? (
            <div className="bg-card rounded-xl shadow-sm border border-border p-8 md:p-16 text-center">
              <Bell className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                No hay notificaciones
              </h3>
              <p className="text-muted-foreground text-base md:text-lg">
                Te mantendremos informado sobre actividades importantes
              </p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const colorClass = getNotificationColor(notification.type);
              
              return (
                <div
                  key={notification.id}
                  className={`bg-card rounded-xl shadow-sm border transition-all ${
                    !notification.isRead ? 'border-l-4 border-l-primary bg-primary/5' : 'border-border'
                  } p-4 md:p-8`}
                >
                  <div className="flex items-start space-x-3 md:space-x-5">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-semibold text-base md:text-lg break-words ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h3>
                          <p className={`mt-2 text-sm md:text-base break-words ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'} leading-relaxed`}>
                            {notification.message}
                          </p>
                          <p className="mt-3 text-xs md:text-sm text-muted-foreground">
                            {formatDate(notification.timestamp)}
                          </p>
                        </div>
                        
                        <div className="flex items-center flex-wrap gap-2 flex-shrink-0">
                          {!notification.isRead && (
                            <Button
                              onClick={() => markAsRead(notification.id)}
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:text-primary hover:bg-primary/10 text-xs md:text-sm"
                            >
                              <span className="hidden sm:inline">Marcar como leída</span>
                              <span className="sm:hidden">Marcar</span>
                            </Button>
                          )}
                          <Button
                            onClick={() => deleteNotification(notification.id)}
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Notification Settings */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-8 mt-6 md:mt-8">
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">Configuración de Notificaciones</h3>
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-foreground text-sm md:text-base">Verificaciones de citación</h4>
                <p className="text-muted-foreground mt-1 text-xs md:text-sm break-words">Recibir notificaciones cuando se complete una verificación</p>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative flex-shrink-0">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-all shadow-sm"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-foreground text-sm md:text-base">Actualizaciones reglamentarias</h4>
                <p className="text-muted-foreground mt-1 text-xs md:text-sm break-words">Recibir notificaciones sobre cambios en reglamentos y procedimientos</p>
              </div>
              <div className="w-12 h-6 bg-primary rounded-full relative flex-shrink-0">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-all shadow-sm"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-foreground text-sm md:text-base">Recordatorios de sesión</h4>
                <p className="text-muted-foreground mt-1 text-xs md:text-sm break-words">Avisos cuando has estado inactivo por mucho tiempo</p>
              </div>
              <div className="w-12 h-6 bg-muted rounded-full relative flex-shrink-0">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-all shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}