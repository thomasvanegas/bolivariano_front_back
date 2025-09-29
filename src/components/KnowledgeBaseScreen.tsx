import React, { useState } from 'react';
import { Upload, FileText, Trash2, Download, Search, Filter, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: Date;
  category: string;
  status: 'processing' | 'ready' | 'error';
}

export function KnowledgeBaseScreen() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Reglamento Estudiantil UBV.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: new Date(2024, 11, 6, 14, 30),
      category: 'Reglamentos',
      status: 'ready',
    },
    {
      id: '2',
      name: 'Procedimientos Académicos Ingeniería de Sistemas.pdf',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: new Date(2024, 11, 6, 10, 15),
      category: 'Procedimientos',
      status: 'ready',
    },
    {
      id: '3',
      name: 'Calendario Académico 2025.pdf',
      type: 'PDF',
      size: '3.2 MB',
      uploadDate: new Date(2024, 11, 5, 16, 45),
      category: 'Calendario',
      status: 'processing',
    },
    {
      id: '4',
      name: 'Requisitos Prácticas Profesionales.pdf',
      type: 'PDF',
      size: '1.9 MB',
      uploadDate: new Date(2024, 11, 5, 9, 20),
      category: 'Prácticas',
      status: 'ready',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploading, setIsUploading] = useState(false);

  const categories = ['all', 'Reglamentos', 'Procedimientos', 'Calendario', 'Prácticas', 'Pensum'];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        const newDocuments = Array.from(files).map((file, index) => ({
          id: (Date.now() + index).toString(),
          name: file.name,
          type: 'PDF',
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadDate: new Date(),
          category: 'Sin categoría',
          status: 'processing' as const,
        }));
        
        setDocuments(prev => [...newDocuments, ...prev]);
        setIsUploading(false);
        
        // Simulate processing completion
        setTimeout(() => {
          setDocuments(prev => 
            prev.map(doc => 
              newDocuments.some(newDoc => newDoc.id === doc.id)
                ? { ...doc, status: 'ready' as const }
                : doc
            )
          );
        }, 3000);
      }, 1000);
    }
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">Listo</Badge>;
      case 'processing':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Procesando</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Desconocido</Badge>;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full bg-background p-4 md:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto w-full space-y-6 md:space-y-8">
        {/* Header */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Base de Conocimiento</h2>
          <p className="text-muted-foreground">
            Administra los documentos académicos que alimentan el conocimiento de Bolivariano
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Subir Documentos</h3>
            <div className="text-xs md:text-sm text-muted-foreground">
              Formatos soportados: PDF, DOC, DOCX (máx. 10MB)
            </div>
          </div>
          
          <div className="border-2 border-dashed border-border rounded-xl p-6 md:p-12 text-center hover:border-primary/50 transition-colors">
            <Upload className="w-8 h-8 md:w-12 md:h-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-base md:text-lg font-medium text-foreground mb-2">
              Arrastra archivos aquí o haz clic para seleccionar
            </h4>
            <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">
              Los documentos serán procesados automáticamente para alimentar la base de conocimiento
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="w-full sm:w-auto">
                <Button asChild disabled={isUploading} className="cursor-pointer w-full sm:w-auto">
                  <span>
                    <Plus className="w-4 h-4 mr-2" />
                    {isUploading ? 'Subiendo...' : 'Seleccionar Archivos'}
                  </span>
                </Button>
              </label>
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Descargar Plantilla</span>
                <span className="sm:hidden">Plantilla</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-card rounded-xl shadow-sm border border-border">
          <div className="p-4 md:p-8 border-b border-border">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-foreground">Documentos ({filteredDocuments.length})</h3>
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
              <div className="flex-1 w-full sm:max-w-md">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar documentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-border rounded-md px-3 py-2 bg-background text-foreground flex-1 sm:flex-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Todas las categorías' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-border">
            {filteredDocuments.length === 0 ? (
              <div className="p-8 md:p-12 text-center">
                <FileText className="w-8 h-8 md:w-12 md:h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-base md:text-lg font-medium text-foreground mb-2">
                  No se encontraron documentos
                </h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'Intenta ajustar los filtros de búsqueda'
                    : 'Sube tu primer documento para comenzar'
                  }
                </p>
              </div>
            ) : (
              filteredDocuments.map((document) => (
                <div key={document.id} className="p-4 md:p-6 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start md:items-center justify-between gap-4">
                    <div className="flex items-start md:items-center space-x-3 md:space-x-4 flex-1 min-w-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground text-sm md:text-base break-words mb-1">
                          {document.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
                          <span>{document.size}</span>
                          <span className="hidden md:inline">•</span>
                          <span>{document.uploadDate.toLocaleDateString('es-ES')}</span>
                          <Badge variant="outline" className="text-xs">
                            {document.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-3 flex-shrink-0">
                      {getStatusBadge(document.status)}
                      
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" disabled={document.status !== 'ready'} className="h-8 w-8 p-0">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteDocument(document.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}