import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
    const { user, token, isAuthenticated, setAuth, logout } = useAuthStore();

    return {
        user,
        token,
        isAuthenticated: isAuthenticated(),
        login: setAuth,
        logout,
    };
};
