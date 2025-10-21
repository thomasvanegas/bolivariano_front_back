import React, { useState, useEffect } from 'react';
import { Upload, FileText, Trash2, Download, Search, Filter, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { api, DocumentResponse } from '@/lib/api';
import { toast } from 'sonner';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: Date;
  category: string;
  status: 'processing' | 'ready' | 'error';
}

export function KnowledgeBaseScreen() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(['all', 'Reglamentos', 'Procedimientos', 'Calendario', 'Prácticas', 'Pensum']);

  // Cargar documentos al montar el componente
  useEffect(() => {
    loadDocuments();
    loadCategories();
  }, []);

  const loadDocuments = async () => {
    try {
      setIsLoading(true);
      const response = await api.listDocuments();
      
      // Convertir DocumentResponse a Document
      const convertedDocs: Document[] = response.documents.map((doc: DocumentResponse) => ({
        id: doc.id,
        name: doc.name,
        type: doc.file_type,
        size: formatFileSize(doc.file_size),
        uploadDate: new Date(doc.created_at),
        category: doc.category,
        status: doc.status,
      }));
      
      setDocuments(convertedDocs);
    } catch (error: any) {
      console.error('Error al cargar documentos:', error);
      toast.error('Error al cargar documentos: ' + (error.message || 'Error desconocido'));
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await api.listCategories();
      setCategories(['all', ...response.categories]);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const formatFileSize = (bytes: number): string => {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    try {
      // Subir cada archivo
      const uploadPromises = Array.from(files).map(async (file) => {
        try {
          const response = await api.uploadDocument(file, 'Sin categoría');
          toast.success(`Documento "${file.name}" subido exitosamente`);
          return response;
        } catch (error: any) {
          toast.error(`Error al subir "${file.name}": ${error.message}`);
          throw error;
        }
      });

      await Promise.all(uploadPromises);
      
      // Recargar la lista de documentos
      await loadDocuments();
      await loadCategories(); // Actualizar categorías por si se agregó una nueva
      
    } catch (error) {
      console.error('Error al subir archivos:', error);
    } finally {
      setIsUploading(false);
      // Limpiar el input para permitir subir el mismo archivo nuevamente
      event.target.value = '';
    }
  };

  const deleteDocument = async (id: number) => {
    try {
      await api.deleteDocument(id);
      toast.success('Documento eliminado exitosamente');
      
      // Actualizar la lista localmente
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    } catch (error: any) {
      console.error('Error al eliminar documento:', error);
      toast.error('Error al eliminar documento: ' + (error.message || 'Error desconocido'));
    }
  };

  const handleDownload = async (id: number, filename: string) => {
    try {
      const response = await api.getDownloadUrl(id);
      
      // Abrir en nueva pestaña para descargar
      window.open(response.download_url, '_blank');
      toast.success('Descargando documento...');
    } catch (error: any) {
      console.error('Error al descargar documento:', error);
      toast.error('Error al descargar: ' + (error.message || 'Error desconocido'));
    }
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
          
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 md:p-12 text-center hover:border-[#DD198D] transition-colors">
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
                <Button asChild disabled={isUploading} className="cursor-pointer w-full sm:w-auto bg-gradient-to-r from-[#DD198D] to-[#B934E3] hover:opacity-90 text-white">
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
            {isLoading ? (
              <div className="p-8 md:p-12 text-center">
                <div className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-4 border-4 border-[#DD198D] border-t-transparent rounded-full animate-spin" />
                <p className="text-muted-foreground text-sm md:text-base">Cargando documentos...</p>
              </div>
            ) : filteredDocuments.length === 0 ? (
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
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-[#DD198D] to-[#B934E3] rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 md:w-6 md:h-6 text-white" />
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
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          disabled={document.status !== 'ready'} 
                          onClick={() => handleDownload(document.id, document.name)}
                          className="h-8 w-8 p-0"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteDocument(document.id)}
                          className="text-gray-600 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0"
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