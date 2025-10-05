import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG, ROUTES } from '@/lib/constants';
import { ApiError } from '@/types/auth';

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
    (error: AxiosError<ApiError>) => {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message || 'An unexpected error occurred',
            status: error.response?.status,
            errors: error.response?.data?.errors,
        };

        return Promise.reject(apiError);
    }
);
