import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from '@/lib/constants';
import { ApiError } from '@/types/auth';

interface BackendErrorResponse {
    error?: string;
    message?: string;
    errors?: Record<string, string[]>;
}


export const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('auth-storage');
            if (token) {
                try {
                    const parsed = JSON.parse(token);
                    if (parsed.state?.token) {
                        config.headers.Authorization = `Bearer ${parsed.state.token}`;
                    }
                } catch (error) {
                    console.error('Failed to parse auth token:', error);
                }
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<BackendErrorResponse>) => {
        const apiError: ApiError = {
            message:
                error.response?.data?.error ||
                error.response?.data?.message ||
                error.message ||
                'An unexpected error occurred',
            status: error.response?.status,
            errors: error.response?.data?.errors,
        };

        return Promise.reject(apiError);
    }
);
