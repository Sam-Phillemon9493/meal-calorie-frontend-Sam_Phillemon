// User types - Updated to match backend camelCase
export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

// Backend returns different response structures
export interface RegisterResponse {
    message: string;
    token: string;
}

export interface LoginResponse {
    token: string;
}

export interface AuthResponse {
    token: string;
    user?: User; // Optional since backend doesn't return user on login
}

// Meal types
export interface CalorieRequest {
    dish_name: string;
    servings: number;
}

export interface CalorieResponse {
    dish_name: string;
    servings: number;
    calories_per_serving: number;
    total_calories: number;
    source: string;
}

export interface MealHistory extends CalorieResponse {
    timestamp: string;
}

// Error response type
export interface ApiError {
    message: string;
    errors?: string[];
}
