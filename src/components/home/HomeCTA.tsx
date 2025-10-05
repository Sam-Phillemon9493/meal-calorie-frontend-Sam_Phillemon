'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';
import { ROUTES } from '@/lib/constants';

export default function HomeCTA() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return null;
    }

    return (
        <div className="text-center bg-primary/10 dark:bg-primary/20 rounded-lg p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to start tracking?</h2>
            <p className="text-lg mb-6 text-muted-foreground">
                Join thousands of users making informed nutrition decisions
            </p>
            <Link href={ROUTES.REGISTER}>
                <Button size="lg" className="text-lg px-8 cursor-pointer">
                    Create Your Free Account
                </Button>
            </Link>
        </div>
    );
}
