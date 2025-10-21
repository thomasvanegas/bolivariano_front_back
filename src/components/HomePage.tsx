"use client"

import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { HomeHeader } from '../components/HomeHeader';
import Image from 'next/image';
import { 
  MessageSquare, 
  BookOpen, 
  Clock, 
  Shield, 
  Zap, 
  Users,
  GraduationCap,
  Search,
  FileText,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

/**
 * Props de la página home
 */
interface HomePageProps {
  onNavigateToLogin: () => void;
  onNavigateToRegister: () => void;
}

/**
 * Página principal / Landing page del asistente Bolivariano
 * Muestra características, beneficios y opciones de login/registro
 */
export function HomePage({ onNavigateToLogin, onNavigateToRegister }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header de navegación */}
      <HomeHeader onLoginClick={onNavigateToLogin} onRegisterClick={onNavigateToRegister} />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-pink-100 via-purple-100 to-red-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Contenido principal */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-gradient-to-r from-[#DD198D] to-[#B934E3] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Asistente Académico Inteligente
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight">
                Bolivariano
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Tu compañero inteligente para navegar la vida universitaria en la{' '}
                <span className="font-semibold text-[#DD198D]">Universidad Pontificia Bolivariana</span>
              </p>
              <p className="text-lg text-gray-600">
                Obtén respuestas instantáneas sobre procedimientos académicos, reglamentos, 
                calendario y más. Diseñado especialmente para estudiantes de Ingeniería de Sistemas 
                e Ingeniería en Ciencia de Datos.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#DD198D] to-[#B934E3] hover:opacity-90 transition-smooth text-white px-8 py-6 text-base font-semibold"
                  onClick={onNavigateToLogin}
                >
                  Comenzar Ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  className="border-2 border-[#DD198D] bg-white text-[#DD198D] hover:bg-[#DD198D] hover:text-white transition-smooth px-8 py-6 text-base font-semibold"
                  onClick={onNavigateToRegister}
                >
                  Crear Cuenta
                </Button>
              </div>
            </div>

            {/* Ilustración/Card de ejemplo */}
            <div className="hidden md:block">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-[#DD198D] to-[#B934E3]">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <MessageSquare className="h-5 w-5" />
                    Chat en Vivo
                  </CardTitle>
                  <CardDescription className="text-white">
                    Pregunta lo que necesites
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                    <p className="text-sm text-gray-700">
                      "¿Cuáles son los requisitos para inscribir materias este semestre?"
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-800 font-medium mb-2">
                      <CheckCircle className="inline h-4 w-4 text-green-600 mr-1" />
                      Respuesta instantánea:
                    </p>
                    <p className="text-sm text-gray-600">
                      Para inscribir materias necesitas estar al día con tus pagos, 
                      haber aprobado los prerrequisitos...
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Características principales */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-upb-black mb-4">
              ¿Por qué usar Bolivariano?
            </h2>
            <p className="text-xl text-gray-600">
              Simplificamos tu experiencia académica con tecnología de punta
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Característica 1 */}
            <Card className="border-2 hover:border-[#DD198D] transition-smooth shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-[#DD198D] to-[#B934E3] rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Respuestas Instantáneas</CardTitle>
                <CardDescription>
                  Obtén información en segundos, sin esperas ni complicaciones
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Característica 2 */}
            <Card className="border-2 hover:border-[#B934E3] transition-smooth shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-[#F3095A] to-[#DD198D] rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Base de Conocimiento Completa</CardTitle>
                <CardDescription>
                  Acceso a reglamentos, procedimientos y documentos académicos oficiales
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Característica 3 */}
            <Card className="border-2 hover:border-[#F3095A] transition-smooth shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-[#B934E3] to-[#F3095A] rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Información Confiable</CardTitle>
                <CardDescription>
                  Respuestas basadas en fuentes oficiales de la universidad
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Característica 4 */}
            <Card className="border-2 hover:border-[#DD198D] transition-smooth shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-[#DD198D] to-[#B934E3] rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Disponible 24/7</CardTitle>
                <CardDescription>
                  Consulta cuando lo necesites, cualquier día a cualquier hora
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Característica 5 */}
            <Card className="border-2 hover:border-[#B934E3] transition-smooth shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-[#F3095A] to-[#DD198D] rounded-lg flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Búsqueda Inteligente</CardTitle>
                <CardDescription>
                  Encuentra exactamente lo que necesitas con IA avanzada
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Característica 6 */}
            <Card className="border-2 hover:border-[#F3095A] transition-smooth shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-[#B934E3] to-[#F3095A] rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Especializado en tu Carrera</CardTitle>
                <CardDescription>
                  Optimizado para estudiantes de Ingeniería de Sistemas y Ciencia de Datos
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Casos de uso */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              ¿Qué puedes preguntar?
            </h2>
            <p className="text-xl text-gray-600">
              Bolivariano está entrenado para ayudarte con una amplia variedad de consultas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: FileText,
                title: "Procedimientos Académicos",
                examples: ["¿Cómo solicito una homologación?", "¿Cuál es el proceso de matrícula?"]
              },
              {
                icon: BookOpen,
                title: "Reglamentos",
                examples: ["¿Cuál es el reglamento estudiantil?", "¿Qué dice sobre las ausencias?"]
              },
              {
                icon: Clock,
                title: "Calendario Académico",
                examples: ["¿Cuándo inician las clases?", "¿Cuáles son las fechas de exámenes?"]
              },
              {
                icon: Users,
                title: "Servicios Estudiantiles",
                examples: ["¿Cómo accedo a las becas?", "¿Dónde está la biblioteca?"]
              }
            ].map((category, idx) => (
              <Card key={idx} className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#DD198D] to-[#B934E3] rounded-lg flex items-center justify-center">
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                  <CardContent className="p-0 space-y-2 mt-4">
                    {category.examples.map((example, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-[#DD198D] mt-0.5 flex-shrink-0" />
                        <span>{example}</span>
                      </div>
                    ))}
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#DD198D] via-[#B934E3] to-[#F3095A]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            ¿Listo para empezar?
          </h2>
          <p className="text-xl mb-8 text-white">
            Únete a cientos de estudiantes que ya están usando Bolivariano 
            para facilitar su vida universitaria
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white hover:bg-gray-50 transition-smooth px-8 py-6 text-base font-semibold"
              style={{
                background: 'white',
                backgroundImage: 'none',
                backgroundClip: 'padding-box',
              }}
              onClick={onNavigateToLogin}
            >
              <span className="bg-gradient-to-r from-[#DD198D] to-[#B934E3] bg-clip-text text-transparent font-bold">
                Iniciar Sesión
              </span>
            </Button>
            <Button
              size="lg"
              className="bg-white hover:bg-gray-50 transition-smooth px-8 py-6 text-base font-semibold"
              style={{
                background: 'white',
                backgroundImage: 'none',
                backgroundClip: 'padding-box',
              }}
              onClick={onNavigateToRegister}
            >
              <span className="bg-gradient-to-r from-[#DD198D] to-[#B934E3] bg-clip-text text-transparent font-bold">
                Registrarse Gratis
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm mb-2 text-white">
            Universidad Pontificia Bolivariana (UPB) | Medellín, Colombia
          </p>
          <p className="text-xs text-gray-400">
            Bolivariano © 2025 - Asistente Académico Inteligente
          </p>
        </div>
      </footer>
    </div>
  );
}

