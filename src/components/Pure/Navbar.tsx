'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import ThemeToggle from '../ThemeToggle';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout, isAuthenticated } = useAuthStore();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const navItems = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/calories', label: 'Calories' },
    ];

    return (
        <nav className="border-b bg-background sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold hover:text-blue-600 transition-colors">
                    🍽️ Calorie Tracker
                </Link>

                <div className="flex items-center gap-4">
                    {isAuthenticated() && (
                        <div className="hidden md:flex items-center gap-2">
                            {navItems.map((item) => (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        variant={pathname === item.href ? 'default' : 'ghost'}
                                        size="sm"
                                    >
                                        {item.label}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    )}

                    <ThemeToggle />

                    {isAuthenticated() ? (
                        <>
                            <span className="text-sm text-muted-foreground hidden sm:inline">
                                {user?.firstName || 'User'}
                            </span>
                            <Button variant="outline" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                            <Link href="/register">
                                <Button>Sign Up</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
