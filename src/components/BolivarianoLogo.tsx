import React from 'react';
import { cn } from './ui/utils';

interface BolivarianoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'outline' | 'gradient' | 'tile';
  className?: string;
}

export function BolivarianoLogo({ 
  size = 'md', 
  variant = 'default', 
  className 
}: BolivarianoLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-sm',
    md: 'w-8 h-8 text-base',
    lg: 'w-10 h-10 text-lg',
    xl: 'w-12 h-12 text-xl'
  };

  const variantClasses = {
    default: 'bg-bolivariano-primary text-white',
    outline: 'border-2 border-bolivariano-primary text-bolivariano-primary bg-transparent',
    // Mayor contraste: degradado azul más oscuro, borde y sombra de texto
    gradient: 'bg-gradient-to-br from-bolivariano-blue-700 to-bolivariano-blue-500 text-white ring-1 ring-bolivariano-blue-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] shadow',
    // Azulejo blanco con B azul para máxima legibilidad en fondos blancos
    tile: 'bg-white text-bolivariano-blue-700 border border-gray-200 shadow-sm'
  };

  return (
    <div 
      className={cn(
        'rounded-lg flex items-center justify-center font-bold shadow-sm',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      B
    </div>
  );
}
