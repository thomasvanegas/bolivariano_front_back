"use client"

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

/**
 * Props del header de la home
 */
interface HomeHeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

/**
 * Header de navegación para la página home/landing
 * Incluye logo, links de navegación y botones de login/registro
 */
export function HomeHeader({ onLoginClick, onRegisterClick }: HomeHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <div className="flex items-center gap-3">
            <Image 
              src="/Logo-UPB-2022.svg" 
              alt="Universidad Pontificia Bolivariana" 
              width={48} 
              height={48}
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-black">Bolivariano</h1>
              <p className="text-xs text-gray-600 hidden sm:block">Asistente Académico</p>
            </div>
          </div>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#inicio" 
              className="text-sm font-medium text-gray-700 hover:text-[#DD198D] transition-smooth"
            >
              Inicio
            </a>
            <a 
              href="#caracteristicas" 
              className="text-sm font-medium text-gray-700 hover:text-[#DD198D] transition-smooth"
            >
              Características
            </a>
            <a 
              href="#preguntas" 
              className="text-sm font-medium text-gray-700 hover:text-[#DD198D] transition-smooth"
            >
              ¿Qué puedes preguntar?
            </a>
          </nav>

          {/* Botones de acción desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              className="bg-gradient-to-r from-[#DD198D] to-[#B934E3] hover:opacity-90 transition-smooth text-white font-semibold"
              onClick={onLoginClick}
            >
              Iniciar Sesión
            </Button>
            <Button
              className="bg-gradient-to-r from-[#DD198D] to-[#B934E3] hover:opacity-90 transition-smooth text-white font-semibold"
              onClick={onRegisterClick}
            >
              Registrarse
            </Button>
          </div>

          {/* Botón de menú móvil */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-smooth"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top">
            <nav className="flex flex-col gap-4">
              <a
                href="#inicio"
                className="text-sm font-medium text-gray-700 hover:text-[#DD198D] transition-smooth py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </a>
              <a
                href="#caracteristicas"
                className="text-sm font-medium text-gray-700 hover:text-[#DD198D] transition-smooth py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Características
              </a>
              <a
                href="#preguntas"
                className="text-sm font-medium text-gray-700 hover:text-[#DD198D] transition-smooth py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                ¿Qué puedes preguntar?
              </a>
              <div className="pt-4 space-y-3 border-t border-gray-200">
                <Button
                  className="w-full bg-gradient-to-r from-[#DD198D] to-[#B934E3] hover:opacity-90 transition-smooth text-white font-semibold"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLoginClick();
                  }}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-[#DD198D] to-[#B934E3] hover:opacity-90 transition-smooth text-white font-semibold"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onRegisterClick();
                  }}
                >
                  Registrarse
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

