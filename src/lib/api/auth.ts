import { AuthResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types/auth';
import { apiClient } from './client';

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

export const authAPI = {
    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<RegisterResponse>('/auth/register', data);
        const { token } = response.data;

        const decodedToken = decodeToken(token);
        const user = {
            id: decodedToken?.userId || decodedToken?.id || 'unknown',
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
        };

        return { token, user };
    },

    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<LoginResponse>('/auth/login', data);
        const { token } = response.data;

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
