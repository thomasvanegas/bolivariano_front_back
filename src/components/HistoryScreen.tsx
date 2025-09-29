import React from 'react';
import { MessageCircle, Clock, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

export function HistoryScreen() {
  const conversations: Conversation[] = [
    {
      id: '1',
      title: 'Requisitos para prácticas profesionales',
      lastMessage: 'Para iniciar las prácticas necesitas 180 créditos aprobados y estar inscrito...',
      timestamp: new Date(2024, 11, 6, 14, 30),
      messageCount: 8,
    },
    {
      id: '2',
      title: 'Calendario académico 2025-1',
      lastMessage: 'Las inscripciones para el período 2025-1 inician el 18 de enero...',
      timestamp: new Date(2024, 11, 6, 10, 15),
      messageCount: 5,
    },
    {
      id: '3',
      title: 'Procedimiento para cambio de mención',
      lastMessage: 'El cambio de mención requiere tener aprobadas al menos 60 unidades de crédito...',
      timestamp: new Date(2024, 11, 5, 16, 45),
      messageCount: 12,
    },
    {
      id: '4',
      title: 'Pensum Ingeniería en Ciencia de Datos',
      lastMessage: 'El pensum consta de 180 unidades de crédito distribuidas en 10 semestres...',
      timestamp: new Date(2024, 11, 5, 9, 20),
      messageCount: 6,
    },
    {
      id: '5',
      title: 'Normas de citación APA 7ma edición',
      lastMessage: 'Para citar un artículo de revista científica en APA debes incluir...',
      timestamp: new Date(2024, 11, 4, 13, 10),
      messageCount: 15,
    },
  ];

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

  return (
    <div className="h-full bg-background p-4 md:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full">
        <div className="bg-card rounded-xl shadow-sm border border-border">
          <div className="p-4 md:p-8 border-b border-border">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Historial de Conversaciones</h2>
            <p className="text-muted-foreground mt-2">Accede a tus consultas académicas anteriores</p>
          </div>
          
          <div className="divide-y divide-border">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="p-4 md:p-8 hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start space-x-3 md:space-x-5 flex-1 min-w-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-base md:text-lg break-words">
                        {conversation.title}
                      </h3>
                      <p className="text-muted-foreground mt-2 line-clamp-2 leading-relaxed text-sm md:text-base break-words">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex items-center flex-wrap gap-2 md:gap-4 mt-4 text-xs md:text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{formatDate(conversation.timestamp)}</span>
                        </div>
                        <span className="hidden md:inline">•</span>
                        <span>{conversation.messageCount} mensajes</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {conversations.length === 0 && (
            <div className="p-8 md:p-16 text-center">
              <MessageCircle className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                No hay conversaciones aún
              </h3>
              <p className="text-muted-foreground text-base md:text-lg">
                Inicia una nueva conversación para comenzar tu historial académico
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}