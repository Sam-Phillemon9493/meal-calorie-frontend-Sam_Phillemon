'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authAPI } from '@/lib/api/auth';
import { useAuth } from '@/lib/hooks/useAuth';
import { registerSchema, RegisterFormData } from '@/lib/utils/validation';
import { ApiError } from '@/types/auth';
import { ROUTES } from '@/lib/constants';
import { Loader2 } from 'lucide-react';

export default function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            router.push(ROUTES.DASHBOARD);
        }
    }, [isAuthenticated, router]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);

        try {
            localStorage.removeItem('meal-storage');

            const response = await authAPI.register(data);
            login(response.token, response.user);

            toast.success('Account Created!', {
                description: 'Welcome to Meal Calorie Counter.',
            });
            router.push(ROUTES.DASHBOARD);
        } catch (err) {
            console.error('Registration error:', err);
            const apiError = err as ApiError;

            toast.error('Registration Failed', {
                description: apiError.message || 'Please check your information and try again.',
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <Card className="w-full border-2">
            <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl">Create Account</CardTitle>
                <CardDescription>Sign up to start tracking your meals</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label htmlFor="firstName" className="text-sm">
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                {...register('firstName')}
                                disabled={loading}
                                placeholder="Jane"
                                className="h-9"
                            />
                            {errors.firstName && (
                                <p className="text-xs text-destructive">{errors.firstName.message}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="lastName" className="text-sm">
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                {...register('lastName')}
                                disabled={loading}
                                placeholder="Doe"
                                className="h-9"
                            />
                            {errors.lastName && (
                                <p className="text-xs text-destructive">{errors.lastName.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-sm">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            {...register('email')}
                            disabled={loading}
                            placeholder="jane@example.com"
                            className="h-9"
                        />
                        {errors.email && (
                            <p className="text-xs text-destructive">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="password" className="text-sm">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            {...register('password')}
                            disabled={loading}
                            placeholder="••••••••"
                            className="h-9"
                        />
                        {errors.password && (
                            <p className="text-xs text-destructive">{errors.password.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full h-9 mt-4 cursor-pointer" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground pt-2">
                        Already have an account?{' '}
                        <Link href={ROUTES.LOGIN} className="text-primary hover:underline font-medium">
                            Login
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
