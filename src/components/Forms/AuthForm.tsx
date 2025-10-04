'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';

// Updated schema with camelCase field names
const registerSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;
type LoginFormData = z.infer<typeof loginSchema>;
type FormData = RegisterFormData | LoginFormData;

type AuthFormProps = {
    type: 'login' | 'register';
};

export default function AuthForm({ type }: AuthFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);

    const isRegister = type === 'register';
    const schema = isRegister ? registerSchema : loginSchema;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError('');

        try {
            const response = isRegister
                ? await authAPI.register(data as RegisterFormData)
                : await authAPI.login(data as LoginFormData);

            setAuth(response.token, response.user);
            router.push('/dashboard');
        } catch (err: any) {
            console.error('Auth error:', err);
            setError(
                err.message ||
                `${isRegister ? 'Registration' : 'Login'} failed. Please try again.`
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>{isRegister ? 'Create Account' : 'Welcome Back'}</CardTitle>
                <CardDescription>
                    {isRegister
                        ? 'Sign up to start tracking your meals'
                        : 'Login to your account'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {isRegister && (
                        <>
                            <div>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    {...register('firstName')}
                                    disabled={loading}
                                    placeholder="Jane"
                                />
                                {'firstName' in errors && errors.firstName && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.firstName.message as string}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    {...register('lastName')}
                                    disabled={loading}
                                    placeholder="Doe"
                                />
                                {'lastName' in errors && errors.lastName && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.lastName.message as string}
                                    </p>
                                )}
                            </div>
                        </>
                    )}

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            {...register('email')}
                            disabled={loading}
                            placeholder="jane@example.com"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.email.message as string}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register('password')}
                            disabled={loading}
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password.message as string}
                            </p>
                        )}
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Loading...' : isRegister ? 'Sign Up' : 'Login'}
                    </Button>

                    <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <a
                            href={isRegister ? '/login' : '/register'}
                            className="text-blue-600 hover:underline font-medium"
                        >
                            {isRegister ? 'Login' : 'Sign Up'}
                        </a>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
