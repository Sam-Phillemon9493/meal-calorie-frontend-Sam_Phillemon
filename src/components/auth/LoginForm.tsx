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
import { loginSchema, LoginFormData } from '@/lib/utils/validation';
import { ApiError } from '@/types/auth';
import { ROUTES } from '@/lib/constants';
import { Loader2 } from 'lucide-react';

export default function LoginForm() {
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
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);

        try {
            localStorage.removeItem('meal-storage');

            const response = await authAPI.login(data);
            login(response.token, response.user);

            toast.success('Welcome back!', {
                description: 'You have successfully logged in.',
            });
            router.push(ROUTES.DASHBOARD);
        } catch (err) {
            console.error('Login error:', err);
            const apiError = err as ApiError;

            let errorTitle = 'Login Failed';
            let errorDescription = 'Please check your credentials and try again.';

            if (apiError.message) {
                if (apiError.message.toLowerCase().includes('invalid credentials') ||
                    apiError.message.toLowerCase().includes('incorrect')) {
                    errorTitle = 'Invalid Credentials';
                    errorDescription = 'The email or password you entered is incorrect.';
                } else if (apiError.message.toLowerCase().includes('not found')) {
                    errorTitle = 'Account Not Found';
                    errorDescription = 'No account exists with this email. Please sign up first.';
                } else {
                    errorDescription = apiError.message;
                }
            }

            toast.error(errorTitle, {
                description: errorDescription,
            });

            if (apiError.status === 401) {
                localStorage.removeItem('auth-storage');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full border-2">
            <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                <CardDescription>Login to your account to continue</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
                                Logging in...
                            </>
                        ) : (
                            'Login'
                        )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground pt-2">
                        Don&apos;t have an account?{' '}
                        <Link href={ROUTES.REGISTER} className="text-primary hover:underline font-medium">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
