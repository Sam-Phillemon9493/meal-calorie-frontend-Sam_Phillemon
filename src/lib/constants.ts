export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://flybackend-misty-feather-6458.fly.dev",
    TIMEOUT: 15000,
    TOKEN_KEY: "auth-token",
} as const;

export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    DASHBOARD: "/dashboard",
    CALORIES: "/calories",
} as const;

export const MEAL_HISTORY_LIMIT = 10;

export const VALIDATION = {
    MIN_PASSWORD_LENGTH: 6,
    MIN_NAME_LENGTH: 2,
    MIN_DISH_NAME_LENGTH: 1,
    MAX_DISH_NAME_LENGTH: 100,
    MIN_SERVINGS: 0.1,
    MAX_SERVINGS: 1000,
} as const;
