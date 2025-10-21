import React from 'react';
import { MessageCircle, BookOpen, GraduationCap, Calendar, FileText, Users } from 'lucide-react';
import { Button } from './ui/button';

interface QuestionCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  questions: string[];
}

export function ExampleQuestionsScreen() {
  const categories: QuestionCategory[] = [
    {
      id: 'sistemas',
      title: 'Ingeniería de Sistemas',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
      questions: [
        '¿Cuáles son los requisitos para inscribir materias de 8vo semestre en Ingeniería de Sistemas?',
        '¿Cómo es el proceso de solicitud de equivalencias para materias cursadas en otras universidades?',
        '¿Cuáles son los procedimientos para cambio de mención en Ingeniería de Sistemas?',
        '¿Qué documentos necesito para solicitar la carta de culminación de estudios?',
      ],
    },
    {
      id: 'ciencia-datos',
      title: 'Ingeniería en Ciencia de Datos',
      icon: GraduationCap,
      color: 'bg-purple-100 text-purple-600',
      questions: [
        '¿Cuál es el pensum de estudios de Ingeniería en Ciencia de Datos?',
        '¿Cuáles son los prerrequisitos para cursar las materias del área de Machine Learning?',
        '¿Cómo funciona el proceso de selección de proyecto de grado en Ciencia de Datos?',
        '¿Qué opciones de especialización ofrece la carrera de Ingeniería en Ciencia de Datos?',
      ],
    },
    {
      id: 'reglamento',
      title: 'Reglamento Estudiantil',
      icon: FileText,
      color: 'bg-green-100 text-green-600',
      questions: [
        '¿Cuáles son las causales para solicitar retiro de materias según el reglamento?',
        '¿Qué establece el reglamento sobre la asistencia mínima requerida?',
        '¿Cuál es el procedimiento para apelar una calificación según el reglamento estudiantil?',
        '¿Qué sanciones contempla el reglamento por plagio académico?',
      ],
    },
    {
      id: 'practicas',
      title: 'Requisitos de Prácticas',
      icon: Users,
      color: 'bg-orange-100 text-orange-600',
      questions: [
        '¿Cuántas horas debo cumplir para aprobar las prácticas profesionales?',
        '¿Qué documentos necesito entregar para iniciar mis prácticas profesionales?',
        '¿Cuáles son los requisitos académicos para poder inscribir prácticas?',
        '¿Cómo puedo validar prácticas realizadas en empresa donde trabajo?',
      ],
    },
    {
      id: 'calendario',
      title: 'Calendario Académico',
      icon: Calendar,
      color: 'bg-pink-100 text-pink-600',
      questions: [
        '¿Cuándo son las fechas de inscripción para el próximo semestre?',
        '¿Cuál es el cronograma de evaluaciones del período actual?',
        '¿Cuándo comienzan y terminan las clases del semestre en curso?',
        '¿Cuáles son las fechas importantes del calendario académico 2024?',
      ],
    },
    {
      id: 'citaciones',
      title: 'Citaciones y Referencias',
      icon: MessageCircle,
      color: 'bg-indigo-100 text-indigo-600',
      questions: [
        '¿Cómo citar correctamente un artículo científico en formato APA?',
        '¿Cuál es la diferencia entre cita directa e indirecta en trabajos académicos?',
        '¿Cómo estructurar las referencias bibliográficas en un proyecto de grado?',
        'Ayúdame a verificar si mis citas cumplen con las normas académicas',
      ],
    },
  ];

  const handleUseQuestion = (question: string) => {
    // This would typically navigate to chat and pre-fill the question
    console.log('Using question:', question);
  };

  return (
    <div className="h-full bg-background p-4 md:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-8 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Preguntas de Ejemplo</h2>
          <p className="text-muted-foreground mt-2">
            Consulta información académica específica sobre procedimientos, reglamentos y requisitos institucionales
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 md:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;
            
            return (
              <div
                key={category.id}
                className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-6 lg:p-8"
              >
                <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${category.color}`}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base break-words">{category.title}</h3>
                </div>

                <div className="space-y-3 md:space-y-4">
                  {category.questions.map((question, index) => (
                    <div
                      key={index}
                      className="p-3 md:p-4 bg-accent/30 rounded-xl hover:bg-accent/50 transition-colors"
                    >
                      <p className="text-foreground mb-2 md:mb-3 leading-relaxed text-sm md:text-base break-words">
                        {question}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUseQuestion(question)}
                        className="text-[#DD198D] hover:text-[#B934E3] hover:bg-pink-50 h-7 md:h-8 px-2 md:px-3 text-xs md:text-sm"
                      >
                        Usar pregunta
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Tips */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-8 mt-6 md:mt-8">
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">Consejos para mejores preguntas</h3>
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            <div className="flex items-start space-x-3 md:space-x-4">
              <div className="w-3 h-3 bg-[#DD198D] rounded-full mt-2 flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="font-semibold text-foreground text-sm md:text-base">Sé específico</h4>
                <p className="text-muted-foreground mt-1 text-sm md:text-base break-words">
                  Incluye detalles sobre el tema, contexto o nivel académico
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 md:space-x-4">
              <div className="w-3 h-3 bg-[#B934E3] rounded-full mt-2 flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="font-semibold text-foreground text-sm md:text-base">Pide ejemplos</h4>
                <p className="text-muted-foreground mt-1 text-sm md:text-base break-words">
                  Solicita casos prácticos para entender mejor los conceptos
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 md:space-x-4">
              <div className="w-3 h-3 bg-[#F3095A] rounded-full mt-2 flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="font-semibold text-foreground text-sm md:text-base">Solicita fuentes</h4>
                <p className="text-muted-foreground mt-1 text-sm md:text-base break-words">
                  Pide referencias académicas para validar la información
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 md:space-x-4">
              <div className="w-3 h-3 bg-[#DD198D] rounded-full mt-2 flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="font-semibold text-foreground text-sm md:text-base">Estructura tu consulta</h4>
                <p className="text-muted-foreground mt-1 text-sm md:text-base break-words">
                  Organiza tu pregunta con contexto, problema y objetivos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}