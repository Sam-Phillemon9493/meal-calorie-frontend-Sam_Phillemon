import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

// Hook for protecting routes
export const useAuthGuard = (requireAuth: boolean = true) => {
    const router = useRouter();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

    useEffect(() => {
        if (requireAuth && !isAuthenticated) {
            router.push('/login');
        } else if (!requireAuth && isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, requireAuth, router]);

    return isAuthenticated;
};
