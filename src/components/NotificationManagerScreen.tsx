import React, { useState } from 'react';
import { Send, Users, Clock, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

interface NotificationTemplate {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  category: string;
}

interface SentNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  recipients: number;
  sentAt: Date;
  status: 'sent' | 'pending' | 'failed';
}

export function NotificationManagerScreen() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'info' | 'success' | 'warning'>('info');
  const [targetAudience, setTargetAudience] = useState('all');
  const [isSending, setIsSending] = useState(false);

  const [sentNotifications, setSentNotifications] = useState<SentNotification[]>([
    {
      id: '1',
      title: 'Actualización del reglamento estudiantil',
      message: 'Se han actualizado las normas académicas y procedimientos administrativos.',
      type: 'info',
      recipients: 1247,
      sentAt: new Date(2024, 11, 6, 14, 30),
      status: 'sent',
    },
    {
      id: '2',
      title: 'Mantenimiento del sistema académico',
      message: 'El sistema estará en mantenimiento el domingo de 2:00 AM a 4:00 AM.',
      type: 'warning',
      recipients: 1247,
      sentAt: new Date(2024, 11, 5, 10, 15),
      status: 'sent',
    },
    {
      id: '3',
      title: 'Nuevos procedimientos de prácticas',
      message: 'Se han establecido nuevos requisitos para las prácticas profesionales.',
      type: 'success',
      recipients: 342,
      sentAt: new Date(2024, 11, 4, 16, 45),
      status: 'sent',
    },
  ]);

  const templates: NotificationTemplate[] = [
    {
      id: '1',
      title: 'Actualización de procedimientos',
      message: 'Se han actualizado los procedimientos académicos para mejorar la experiencia estudiantil.',
      type: 'info',
      category: 'Académico',
    },
    {
      id: '2',
      title: 'Mantenimiento programado',
      message: 'El sistema estará en mantenimiento el [FECHA] de [HORA_INICIO] a [HORA_FIN].',
      type: 'warning',
      category: 'Sistema',
    },
    {
      id: '3',
      title: 'Nuevos recursos disponibles',
      message: 'Hemos agregado nuevos recursos académicos a la base de conocimiento.',
      type: 'info',
      category: 'Recursos',
    },
  ];

  const handleSendNotification = async () => {
    if (!title.trim() || !message.trim()) return;
    
    setIsSending(true);
    
    // Simulate sending process
    setTimeout(() => {
      const newNotification: SentNotification = {
        id: Date.now().toString(),
        title,
        message,
        type: notificationType,
        recipients: targetAudience === 'all' ? 1247 : 456,
        sentAt: new Date(),
        status: 'sent',
      };
      
      setSentNotifications(prev => [newNotification, ...prev]);
      
      // Reset form
      setTitle('');
      setMessage('');
      setNotificationType('info');
      setTargetAudience('all');
      setIsSending(false);
    }, 2000);
  };

  const handleUseTemplate = (template: NotificationTemplate) => {
    setTitle(template.title);
    setMessage(template.message);
    setNotificationType(template.type);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertCircle;
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
      default:
        return 'text-blue-600 bg-blue-100';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Enviado</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pendiente</Badge>;
      case 'failed':
        return <Badge variant="destructive">Falló</Badge>;
      default:
        return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  return (
    <div className="h-full bg-background p-4 md:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full space-y-6 md:space-y-8">
        {/* Header */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Gestor de Notificaciones</h2>
          <p className="text-muted-foreground">
            Envía actualizaciones y comunicados importantes a los usuarios de Bolivariano
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Send Notification Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">Nueva Notificación</h3>
              
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Título de la notificación
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: Actualización de procedimientos académicos"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mensaje
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe el contenido de la notificación..."
                    className="min-h-24 md:min-h-32 resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.length}/280 caracteres
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tipo de notificación
                    </label>
                    <select
                      value={notificationType}
                      onChange={(e) => setNotificationType(e.target.value as 'info' | 'success' | 'warning')}
                      className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                    >
                      <option value="info">Informativa</option>
                      <option value="success">Éxito/Buenas noticias</option>
                      <option value="warning">Advertencia/Importante</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Audiencia objetivo
                    </label>
                    <select
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground text-sm"
                    >
                      <option value="all">Todos los usuarios (1,247)</option>
                      <option value="active">Usuarios activos (856)</option>
                      <option value="new">Nuevos usuarios (456)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    <span>
                      Se enviará a {targetAudience === 'all' ? '1,247' : targetAudience === 'active' ? '856' : '456'} usuarios
                    </span>
                  </div>
                  
                  <Button
                    onClick={handleSendNotification}
                    disabled={!title.trim() || !message.trim() || isSending}
                    className="px-4 md:px-6 w-full md:w-auto"
                  >
                    {isSending ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        <span className="hidden sm:inline">Enviando...</span>
                        <span className="sm:hidden">Enviando</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Enviar Notificación</span>
                        <span className="sm:hidden">Enviar</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Templates Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-6">
              <h4 className="font-semibold text-foreground mb-4">Plantillas</h4>
              <div className="space-y-3">
                {templates.map((template) => (
                  <div key={template.id} className="p-3 md:p-4 bg-accent/50 rounded-lg">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h5 className="font-medium text-foreground text-sm break-words">{template.title}</h5>
                      <Badge variant="outline" className="text-xs flex-shrink-0">
                        {template.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2 break-words">
                      {template.message}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUseTemplate(template)}
                      className="w-full justify-start h-8 text-xs"
                    >
                      Usar plantilla
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sent Notifications History */}
        <div className="bg-card rounded-xl shadow-sm border border-border">
          <div className="p-4 md:p-8 border-b border-border">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Historial de Notificaciones</h3>
            <p className="text-muted-foreground mt-1">
              Revisa las notificaciones enviadas recientemente
            </p>
          </div>
          
          <div className="divide-y divide-border">
            {sentNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const colorClass = getNotificationColor(notification.type);
              
              return (
                <div key={notification.id} className="p-4 md:p-6 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start space-x-3 md:space-x-4">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${colorClass} flex-shrink-0`}>
                      <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-2 gap-2">
                        <h4 className="font-medium text-foreground text-sm md:text-base break-words">{notification.title}</h4>
                        {getStatusBadge(notification.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 break-words">
                        {notification.message}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{notification.recipients.toLocaleString()} usuarios</span>
                        </div>
                        <span className="hidden md:inline">•</span>
                        <span>{notification.sentAt.toLocaleDateString('es-ES')} a las {notification.sentAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}