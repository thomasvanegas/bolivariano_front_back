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

