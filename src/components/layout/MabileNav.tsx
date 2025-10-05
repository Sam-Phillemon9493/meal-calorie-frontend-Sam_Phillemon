'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Search } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils/cn';

export default function MobileNav() {
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return null;

    const navItems = [
        {
            href: ROUTES.DASHBOARD,
            icon: LayoutDashboard,
            label: 'Dashboard'
        },
        {
            href: ROUTES.CALORIES,
            icon: Search,
            label: 'Calories'
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden safe-area-bottom">
            <div className="flex items-center justify-around h-16 px-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-lg transition-all',
                                isActive
                                    ? 'text-primary bg-primary/10'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
