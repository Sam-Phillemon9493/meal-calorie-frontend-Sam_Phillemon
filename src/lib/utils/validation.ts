import { z } from 'zod';
import { VALIDATION } from '@/lib/constants';

export const registerSchema = z.object({
    firstName: z.string().min(VALIDATION.MIN_NAME_LENGTH, 'First name must be at least 2 characters'),
    lastName: z.string().min(VALIDATION.MIN_NAME_LENGTH, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(VALIDATION.MIN_PASSWORD_LENGTH, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(VALIDATION.MIN_PASSWORD_LENGTH, 'Password must be at least 6 characters'),
});

export const calorieSchema = z.object({
    dish_name: z
        .string()
        .min(VALIDATION.MIN_DISH_NAME_LENGTH, 'Dish name is required')
        .max(VALIDATION.MAX_DISH_NAME_LENGTH, 'Dish name must be less than 100 characters')
        .regex(
            /^[a-zA-Z0-9\s,'-]+$/,
            'Dish name can only contain letters, numbers, spaces, hyphens, commas, and apostrophes'
        ),
    servings: z.string().min(1, 'Servings is required'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type CalorieFormData = z.infer<typeof calorieSchema>;
