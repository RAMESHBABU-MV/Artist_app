import axios, {
    AxiosError,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios';
import { TokenManager } from './TokenManager';

// --------------------


// API Response Types
// --------------------
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: any;
    message?: string;
    status?: number;
    headers?: any;
}

// --------------------
// Axios Instance
// --------------------
export const API_BASE_URL = 'http://localhost:3000/api/v1';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        Accept: 'application/json',
    },
});

// --------------------
// Request interceptor
// --------------------
apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const isAuthEndpoint =
            config.url?.includes('/login') ||
            config.url?.includes('/signup') ||
            config.url?.includes('/refresh');

        if (!isAuthEndpoint) {
            const token = await TokenManager.getAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        } else {
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },
    (error: AxiosError) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// --------------------
// Response interceptor
// --------------------
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (process.env.NODE_ENV !== 'production') {
            console.info(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.status);
        }
        return response;
    },
    async (error: AxiosError) => {
        if (process.env.NODE_ENV !== 'production') {
            console.error(
                `❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
                error.response?.status,
                error.response?.data
            );
        }

        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
            const originalRequest = error.config;
            if (!originalRequest?.url?.includes('/login') && !originalRequest?.url?.includes('/signup')) {
                await TokenManager.clearToken();
                // Redirect to login or dispatch an event if needed
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('auth-logout', { detail: { reason: 'unauthorized' } }));
                }
            }
        }

        return Promise.reject(error);
    }
);

// --------------------
// Generic Service
// --------------------
interface ServiceConfig extends AxiosRequestConfig {
    url: string;
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    data?: any;
    params?: any;
}

export async function service<T = any>(
    config: ServiceConfig
): Promise<ApiResponse<T>> {
    try {
        const response = await apiClient(config);
        const backend = response.data;

        return {
            success: backend?.success ?? true,
            data: backend?.data ?? backend,
            status: response.status,
            headers: response.headers,
        };

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const backendError = error.response?.data;

            const message =
                backendError?.message ||
                backendError?.data?.message ||
                backendError?.error ||
                error.response?.statusText ||
                error.message ||
                'Something went wrong';

            return Promise.reject({
                success: false,
                error: backendError,
                status: error.response?.status,
                message,
            });
        }

        return Promise.reject({
            success: false,
            status: 500,
            message: 'Network error'
        });
    }
}


export const apiService = {
    get: <T = any>(url: string, params?: any) =>
        service<T>({ url, method: 'get', params }),
    post: <T = any>(url: string, data?: any) =>
        service<T>({ url, method: 'post', data }),
    put: <T = any>(url: string, data?: any) =>
        service<T>({ url, method: 'put', data }),
    patch: <T = any>(url: string, data?: any) =>
        service<T>({ url, method: 'patch', data }),
    delete: <T = any>(url: string) => service<T>({ url, method: 'delete' }),
};

export default service;
