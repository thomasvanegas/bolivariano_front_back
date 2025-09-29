import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '¡Hola! Soy tu asistente académico Bolivariano. Estoy aquí para ayudarte con consultas sobre procedimientos académicos, reglamento estudiantil, requisitos de prácticas y calendario académico. ¿En qué puedo asistirte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('reglamento') || input.includes('normativa')) {
      return 'Te puedo ayudar con el reglamento estudiantil. ¿Necesitas información sobre algún artículo específico, normas de convivencia, procesos disciplinarios, o derechos y deberes estudiantiles?';
    } else if (input.includes('practica') || input.includes('pasantia')) {
      return 'Sobre los requisitos de prácticas profesionales: Necesitas haber aprobado el 70% de las materias de tu pensum, estar inscrito en el semestre correspondiente, y presentar una carta de postulación de la empresa. ¿Necesitas más detalles sobre algún requisito específico?';
    } else if (input.includes('calendario') || input.includes('fecha')) {
      return 'El calendario académico incluye fechas importantes como inscripciones, inicio y fin de clases, períodos de evaluaciones, y fechas límite para trámites. ¿Qué fecha específica necesitas consultar?';
    } else if (input.includes('procedimiento') || input.includes('tramite')) {
      return 'Puedo guiarte con diversos procedimientos académicos como inscripciones, cambios de carrera, solicitud de equivalencias, trámites de grado, y más. ¿Qué procedimiento específico necesitas realizar?';
    } else {
      return 'Entiendo tu consulta. Como asistente académico, puedo ayudarte con información sobre procedimientos académicos, reglamento estudiantil, requisitos de prácticas y calendario académico. ¿Podrías ser más específico sobre qué aspecto académico necesitas consultar?';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-muted/30">
      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] sm:max-w-[70%] md:max-w-[60%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-card border text-card-foreground'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-card border text-card-foreground p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Invisible div for auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-card p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu consulta académica aquí..."
            className="flex-1 bg-input-background"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            className="px-3 sm:px-4"
          >
            <Send className="w-4 h-4" />
            <span className="sr-only">Enviar mensaje</span>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2 max-w-4xl mx-auto">
          Especializado en procedimientos académicos, reglamento estudiantil, prácticas profesionales y calendario académico
        </p>
      </div>
    </div>
  );
}