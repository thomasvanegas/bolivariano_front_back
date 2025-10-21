/**
 * Cliente API para comunicación con el backend de Bolivariano
 */

// URL base de la API - cambia según el entorno
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Tipos de respuesta de la API
 */
export interface LoginResponse {
  access_token: string;
  token_type: string;
  role: 'student' | 'admin';
  user: {
    id: number;
    student_id?: string;
    username?: string;
    full_name: string;
    email: string;
    is_superuser?: boolean;
  };
}

export interface ApiError {
  detail: string;
}

export interface DocumentResponse {
  id: number;
  name: string;
  file_type: string;
  file_size: number;
  category: string;
  status: 'processing' | 'ready' | 'error';
  storage_url: string;
  storage_key: string;
  uploaded_by?: number;
  uploaded_by_type?: string;
  description?: string;
  tags?: string;
  created_at: string;
  updated_at?: string;
  processed_at?: string;
}

export interface DocumentListResponse {
  total: number;
  documents: DocumentResponse[];
}

/**
 * Credenciales de login para estudiantes
 */
export interface StudentLoginCredentials {
  student_id: string;
  password: string;
}

/**
 * Credenciales de login para administradores
 */
export interface AdminLoginCredentials {
  username: string;
  password: string;
}

/**
 * Manejo de errores de la API
 */
class ApiErrorHandler extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Cliente API principal
 */
export const api = {
  /**
   * Login de estudiante
   */
  async loginStudent(credentials: StudentLoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login/student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new ApiErrorHandler(response.status, error.detail || 'Error al iniciar sesión');
      }

      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiErrorHandler) {
        throw error;
      }
      // Error de red o conexión
      throw new ApiErrorHandler(0, 'No se pudo conectar con el servidor. Verifica tu conexión.');
    }
  },

  /**
   * Login de administrador
   */
  async loginAdmin(credentials: AdminLoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new ApiErrorHandler(response.status, error.detail || 'Error al iniciar sesión');
      }

      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiErrorHandler) {
        throw error;
      }
      // Error de red o conexión
      throw new ApiErrorHandler(0, 'No se pudo conectar con el servidor. Verifica tu conexión.');
    }
  },

  /**
   * Registrar estudiante (para testing)
   */
  async registerStudent(data: {
    student_id: string;
    full_name: string;
    email: string;
    password: string;
  }): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/students/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new ApiErrorHandler(response.status, error.detail || 'Error al registrar');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiErrorHandler) {
        throw error;
      }
      throw new ApiErrorHandler(0, 'No se pudo conectar con el servidor. Verifica tu conexión.');
    }
  },

  /**
   * Verificar salud de la API
   */
  async healthCheck(): Promise<{ status: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      throw new Error('API no disponible');
    }
  },

  /**
   * Subir documento a la base de conocimiento
   */
  async uploadDocument(
    file: File,
    category: string = 'Sin categoría',
    description?: string,
    tags?: string,
    token?: string
  ): Promise<DocumentResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);
      if (description) formData.append('description', description);
      if (tags) formData.append('tags', tags);

      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/documents/upload`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new ApiErrorHandler(response.status, error.detail || 'Error al subir documento');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiErrorHandler) {
        throw error;
      }
      throw new ApiErrorHandler(0, 'No se pudo conectar con el servidor.');
    }
  },

  /**
   * Listar documentos con filtros opcionales
   */
  async listDocuments(params?: {
    skip?: number;
    limit?: number;
    category?: string;
    status?: string;
    search?: string;
    token?: string;
  }): Promise<DocumentListResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.skip !== undefined) queryParams.append('skip', params.skip.toString());
      if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());
      if (params?.category) queryParams.append('category', params.category);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.search) queryParams.append('search', params.search);

      const headers: HeadersInit = {};
      if (params?.token) {
        headers['Authorization'] = `Bearer ${params.token}`;
      }

      const url = `${API_BASE_URL}/api/documents?${queryParams.toString()}`;
      const response = await fetch(url, { headers });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new ApiErrorHandler(response.status, error.detail || 'Error al listar documentos');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiErrorHandler) {
        throw error;
      }
      throw new ApiErrorHandler(0, 'No se pudo conectar con el servidor.');
    }
  },

  /**
   * Obtener un documento específico
   */
  async getDocument(documentId: number, token?: string): Promise<DocumentResponse> {
    try {
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/documents/${documentId}`, { headers });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new ApiErrorHandler(response.status, error.detail || 'Error al obtener documento');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiErrorHandler) {
        throw error;
      }
      throw new ApiErrorHandler(0, 'No se pudo conectar con el servidor.');
    }
  },

  /**
   * Actualizar metadata de un documento
   */
  async updateDocument(
    documentId: number,
    updates: {
      category?: string;
      description?: string;
      tags?: string;
      status?: 'processing' | 'ready' | 'error';
    },
    token?: string
  ): Promise<DocumentResponse> {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/documents/${documentId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new ApiErrorHandler(response.status, error.detail || 'Error al actualizar documento');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiErrorHandler) {
        throw error;
      }
      throw new ApiErrorHandler(0, 'No se pudo conectar con el servidor.');
    }
  },

  /**
   * Eliminar un documento
   */
  async deleteDocument(documentId: number, token?: string): Promise<{ message: string; document_id: number }> {
    try {
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/documents/${documentId}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new ApiErrorHandler(response.status, error.detail || 'Error al eliminar documento');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiErrorHandler) {
        throw error;
      }
      throw new ApiErrorHandler(0, 'No se pudo conectar con el servidor.');
    }
  },

  /**
   * Obtener URL de descarga temporal para un documento
   */
  async getDownloadUrl(
    documentId: number,
    token?: string
  ): Promise<{ download_url: string; document_id: number; filename: string }> {
    try {
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/documents/${documentId}/download-url`, { headers });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new ApiErrorHandler(response.status, error.detail || 'Error al obtener URL de descarga');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiErrorHandler) {
        throw error;
      }
      throw new ApiErrorHandler(0, 'No se pudo conectar con el servidor.');
    }
  },

  /**
   * Obtener lista de categorías
   */
  async listCategories(token?: string): Promise<{ categories: string[] }> {
    try {
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/documents/categories/list`, { headers });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new ApiErrorHandler(response.status, error.detail || 'Error al listar categorías');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiErrorHandler) {
        throw error;
      }
      throw new ApiErrorHandler(0, 'No se pudo conectar con el servidor.');
    }
  },
};

/**
 * Utilidades para manejo de tokens
 */
export const authUtils = {
  /**
   * Guardar token en localStorage
   */
  saveToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  },

  /**
   * Obtener token de localStorage
   */
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  },

  /**
   * Remover token de localStorage
   */
  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  },

  /**
   * Guardar datos del usuario
   */
  saveUser(user: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_data', JSON.stringify(user));
    }
  },

  /**
   * Obtener datos del usuario
   */
  getUser(): any | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  },

  /**
   * Limpiar toda la sesión
   */
  clearSession() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  },
};

