import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/stores/authStore';
import {
    RegisterData,
    LoginData,
    RegisterResponse,
    LoginResponse,
    CalorieRequest,
    CalorieResponse,
    ApiError
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://flybackend-misty-feather-6458.fly.dev';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000, // 15 second timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }

        // Return structured error
        const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
        return Promise.reject({
            message,
            status: error.response?.status,
            data: error.response?.data,
        });
    }
);

// Helper function to extract user info from token (JWT decode)
const decodeToken = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};

// Auth API calls
export const authAPI = {
    register: async (data: RegisterData): Promise<{ token: string; user: any }> => {
        const response = await api.post<RegisterResponse>('/auth/register', data);
        const { token } = response.data;

        // Extract user info from token or create from registration data
        const decodedToken = decodeToken(token);
        const user = {
            id: decodedToken?.userId || decodedToken?.id || 'unknown',
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
        };

        return { token, user };
    },

    login: async (data: LoginData): Promise<{ token: string; user: any }> => {
        const response = await api.post<LoginResponse>('/auth/login', data);
        const { token } = response.data;

        // Decode token to extract user information
        const decodedToken = decodeToken(token);
        const user = {
            id: decodedToken?.userId || decodedToken?.id || 'unknown',
            firstName: decodedToken?.firstName || '',
            lastName: decodedToken?.lastName || '',
            email: decodedToken?.email || data.email,
        };

        return { token, user };
    },
};

// Calorie API calls
export const calorieAPI = {
    getCalories: async (data: CalorieRequest): Promise<CalorieResponse> => {
        const response = await api.post<CalorieResponse>('/get-calories', data);
        return response.data;
    },
};

export default api;
