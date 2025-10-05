'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';
import ThemeToggle from './ThemeToggle';
import { siteConfig, navItems } from '@/config/site';
import { ROUTES } from '@/lib/constants';
import { LogOut } from 'lucide-react';
import { useMealStore } from '@/stores/mealStore';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { user, isAuthenticated, logout } = useAuth();
    const clearHistory = useMealStore((state) => state.clearHistory);

    const handleLogout = () => {
        clearHistory();
        localStorage.removeItem('meal-storage');
        logout();
        router.push(ROUTES.LOGIN);
    };


    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="container mx-auto px-3 sm:px-4 flex h-14 items-center justify-between gap-2">
                <Link href={ROUTES.HOME} className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <span className="text-lg sm:text-xl">🍽️</span>
                    <span className="text-base sm:hidden font-bold">MCC</span>
                    <span className="hidden sm:block text-xl font-bold">
                        {siteConfig.name}
                    </span>
                </Link>

                <div className="flex items-center gap-1 sm:gap-2">
                    {isAuthenticated && (
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant={pathname === item.href ? 'default' : 'ghost'}
                                        size="sm"
                                        className='cursor-pointer'
                                    >
                                        {item.title}
                                    </Button>
                                </Link>
                            ))}
                        </nav>
                    )}

                    <ThemeToggle />

                    {isAuthenticated ? (
                        <>
                            <span className="hidden lg:inline-block text-sm text-muted-foreground">
                                {user?.firstName}
                            </span>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                                className="px-2 sm:px-3 md:cursor-pointer"
                            >
                                <LogOut className="h-4 w-4 sm:mr-2" />
                                <span className="hidden sm:inline">Logout</span>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href={ROUTES.LOGIN}>
                                <Button variant="ghost" size="sm" className="px-2 sm:px-3 text-xs sm:text-sm cursor-pointer">
                                    Login
                                </Button>
                            </Link>
                            <Link href={ROUTES.REGISTER}>
                                <Button size="sm" className="px-2 sm:px-3 text-xs sm:text-sm cursor-pointer">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
