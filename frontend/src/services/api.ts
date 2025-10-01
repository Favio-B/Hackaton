const API_BASE_URL = 'http://localhost:5000';

interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    status: number;
  };
}

class ApiClient {
  private baseURL: string;
  private timeout: number;
  private maxRetries: number;

  constructor(baseURL: string, timeout: number = 8000, maxRetries: number = 2) {
    this.baseURL = baseURL;
    this.timeout = timeout;
    this.maxRetries = maxRetries;
  }

  private async fetchWithRetry(
    url: string,
    options: RequestInit,
    retryCount: number = 0
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Retry on 5xx errors
      if (response.status >= 500 && retryCount < this.maxRetries) {
        console.warn(`Error del servidor ${response.status}, reintentando... (${retryCount + 1}/${this.maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
        return this.fetchWithRetry(url, options, retryCount + 1);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Tiempo de espera agotado');
      }
      
      // Retry on network errors
      if (retryCount < this.maxRetries) {
        console.warn(`Error de red, reintentando... (${retryCount + 1}/${this.maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
        return this.fetchWithRetry(url, options, retryCount + 1);
      }
      
      throw error;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const token = localStorage.getItem('token');
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await this.fetchWithRetry(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: {
            message: data.error?.message || 'An error occurred',
            status: response.status,
          },
        };
      }

      return { data };
    } catch (error) {
      return {
        error: {
          message: error instanceof Error ? error.message : 'Error de red',
          status: 0,
        },
      };
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Dataset endpoints
  async getDatasets() {
    return this.request('/datasets');
  }

  async getDataset(id: string) {
    return this.request(`/datasets/${id}`);
  }

  async createDataset(name: string, description: string, tags: string[]) {
    return this.request('/datasets', {
      method: 'POST',
      body: JSON.stringify({ name, description, tags }),
    });
  }

  async updateDataset(id: string, name: string, description: string, tags: string[]) {
    return this.request(`/datasets/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, description, tags }),
    });
  }

  async deleteDataset(id: string) {
    return this.request(`/datasets/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export type { ApiResponse };
