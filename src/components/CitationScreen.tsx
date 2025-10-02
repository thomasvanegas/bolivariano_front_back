import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Search, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

export function CitationScreen() {
  const [citationText, setCitationText] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    issues: string[];
    suggestions: string[];
  } | null>(null);

  const handleVerifyCitation = async () => {
    if (!citationText.trim()) return;
    
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      const mockResult = {
        isValid: citationText.includes('(') && citationText.includes(')'),
        issues: [
          'Falta el año de publicación',
          'El formato del autor no sigue APA',
        ],
        suggestions: [
          'Usar formato: Autor, A. A. (Año). Título. Editorial.',
          'Verificar que todos los elementos estén presentes',
          'Revisar la puntuación según el estilo seleccionado',
        ],
      };
      
      setVerificationResult(mockResult);
      setIsVerifying(false);
    }, 2000);
  };

  const exampleCitations = [
    {
      style: 'APA',
      text: 'García, M. (2023). Metodologías de investigación en ciencias sociales. Editorial Académica.',
    },
    {
      style: 'MLA',
      text: 'García, María. "Metodologías de investigación en ciencias sociales." Editorial Académica, 2023.',
    },
    {
      style: 'Chicago',
      text: 'García, María. Metodologías de investigación en ciencias sociales. Editorial Académica, 2023.',
    },
  ];

  return (
    <div className="h-full bg-background p-4 md:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full space-y-6 md:space-y-8">
        {/* Header */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">Verificador de Citaciones (Próximamente Implementado: 2026-10)</h2>
          <p className="text-muted-foreground mt-2">
            Verifica y valida tus citaciones académicas según diferentes estilos
          </p>
        </div>

        {/* Citation Input */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-8">
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6">Ingresa tu citación</h3>
          <Textarea
            value={citationText}
            onChange={(e) => setCitationText(e.target.value)}
            placeholder="Pega aquí la citación que deseas verificar..."
            className="min-h-32 md:min-h-40 resize-none border-border focus:border-primary focus:ring-primary/20"
          />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4 md:mt-6">
            <div className="flex flex-wrap gap-2 md:gap-3 w-full md:w-auto">
              <Button variant="outline" size="sm">APA</Button>
              <Button variant="outline" size="sm">MLA</Button>
              <Button variant="outline" size="sm">Chicago</Button>
              <Button variant="outline" size="sm">IEEE</Button>
            </div>
            
            <Button
              onClick={handleVerifyCitation}
              disabled={!citationText.trim() || isVerifying}
              className="px-4 md:px-6 w-full md:w-auto"
            >
              {isVerifying ? (
                <>
                  <Search className="w-4 h-4 mr-2 animate-spin" />
                  <span className="hidden sm:inline">Verificando...</span>
                  <span className="sm:hidden">Verificando</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Verificar Citación</span>
                  <span className="sm:hidden">Verificar</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Verification Results */}
        {verificationResult && (
          <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-8">
            <div className="flex items-center space-x-3 mb-4 md:mb-6">
              {verificationResult.isValid ? (
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-destructive" />
              )}
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                {verificationResult.isValid ? 'Citación Válida' : 'Citación con Errores'}
              </h3>
            </div>

            {!verificationResult.isValid && (
              <div className="mb-4 md:mb-6">
                <h4 className="font-medium text-red-700 mb-2">Problemas encontrados:</h4>
                <ul className="space-y-1 text-sm text-red-600">
                  {verificationResult.issues.map((issue, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="break-words">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="font-medium text-blue-700 mb-2">Sugerencias:</h4>
              <ul className="space-y-1 text-sm text-blue-600">
                {verificationResult.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="break-words">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Example Citations */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-8">
          <div className="flex items-center space-x-3 mb-4 md:mb-6">
            <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Ejemplos de Citaciones</h3>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            {exampleCitations.map((example, index) => (
              <div key={index} className="border border-border rounded-xl p-4 md:p-6">
                <div className="flex items-center justify-between mb-3 md:mb-4 gap-4">
                  <span className="px-2 py-1 md:px-3 md:py-1.5 bg-primary/10 text-primary rounded-full text-sm">
                    {example.style}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCitationText(example.text)}
                    className="text-primary hover:text-primary hover:bg-primary/10 flex-shrink-0"
                  >
                    <span className="hidden sm:inline">Usar ejemplo</span>
                    <span className="sm:hidden">Usar</span>
                  </Button>
                </div>
                <p className="text-foreground leading-relaxed text-sm md:text-base break-words">
                  {example.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}