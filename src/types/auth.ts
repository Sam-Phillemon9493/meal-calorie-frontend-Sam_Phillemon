export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterResponse {
    message: string;
    token: string;
}

export interface LoginResponse {
    token: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface ApiError {
    message: string;
    status?: number;
    errors?: string[];
}
