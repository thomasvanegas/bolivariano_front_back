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

    // Guardar el valor antes de limpiarlo
    const messageContent = inputValue.trim();
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: 'user',
      timestamp: new Date()
    };

    // Agregar mensaje del usuario y limpiar input
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(messageContent),
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
    } else if (input.includes('pensum') || input.includes('materias')){
      return `Buen día, sobre el pensum. Como asistente académico de la Universidad Pontificia Bolivariana (UPB), puedo informarte sobre el plan 
      de estudios y requisitos para egresar como ingeniero en sistemas e informática. Inginería de Sistemas e Informática: El plan de estudios es el 
      "Plan Estudios Ingeniería de Sistemas" disponible en el documento "MallaCurricular2024.pdf". El programa consta de 137 créditos, distribuidos en 
      8 semestres. Las asignaturas clave incluyen: Matemáticas Básicas, Programación, Lenguajes de Programación, Diseño de Sistemas, Inteligencia 
      Artificial, Teoría de Conhecimento, Teoria de la Computación, Networking y Seguridad de Redes.
      El plan de estudios es relevante para el área de ingeniería de sistemas e informática, según el documento "LineamientosPRACTICA.pdf". 
      Requisitos para la admisión:  El documento "PlanEstudiosIngenieriaDeSistemas.pdf" establece que los requisitos mínimos para ser admitido en 
      el programa son: + Título de Bachillerato en Ciencias Exactas o Afiliado en Ingeniería o Ciencias Aplicadas. + Nota media promedio mínima de 2.5 
      en el índice de notas. + Presentar una carta de motivación y un currículum vitae. Practica empresarial: La UPB ofrece prácticas empresariales 
      para los estudiantes de ingeniería, según el documento "LineamientosPRACTICA.pdf". Las prácticas duran entre 6 y 12 meses, dependiendo del área 
      de especialización. Los requisitos para participar en la práctica empresarial incluyen: Tener una calificación mínima de 2.0 en el índice de notas.
      Presentar un plan de práctica que sea aprobado por el Departamento de Ingeniería. Espero que esta información te sea útil, Pemsun. 
      Si tienes alguna otra pregunta, no dudes en hacérmela saber.`
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
    <div className="flex flex-col h-full bg-white">
      {/* Chat Messages - ScrollArea con altura definida */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            <div className="space-y-4 max-w-4xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-[#DD198D] to-[#B934E3] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] sm:max-w-[70%] md:max-w-[60%] p-3 rounded-lg break-words ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-[#DD198D] to-[#B934E3] text-white ml-auto'
                        : 'bg-white border border-gray-200 text-gray-900 shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
                      {message.content}
                    </p>
                    <span className={`text-xs mt-2 block ${message.sender === 'user' ? 'text-white/80' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-gray-200">
                      <User className="w-4 h-4 text-gray-700" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#DD198D] to-[#B934E3] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 text-gray-900 p-3 rounded-lg shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#DD198D] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#B934E3] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-[#F3095A] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Invisible div for auto-scrolling */}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu consulta académica aquí..."
            className="flex-1 bg-white"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            className="px-3 sm:px-4 bg-gradient-to-r from-[#DD198D] to-[#B934E3] hover:opacity-90 text-white"
          >
            <Send className="w-4 h-4" />
            <span className="sr-only">Enviar mensaje</span>
          </Button>
        </div>
        <p className="text-xs text-gray-600 text-center mt-2 max-w-4xl mx-auto">
          Especializado en procedimientos académicos, reglamento estudiantil, prácticas profesionales y calendario académico
        </p>
      </div>
    </div>
  );
}