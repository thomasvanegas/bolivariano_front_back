import React from 'react';
import { cn } from './ui/utils';

interface BolivarianoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'outline' | 'gradient';
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
    gradient: 'bg-gradient-to-br from-bolivariano-primary to-bolivariano-secondary text-white'
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
