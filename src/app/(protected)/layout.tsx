import { ReactNode } from 'react';
import AuthGuard from '@/components/providers/AuthGuard';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    return (
        <AuthGuard>
            <div className="container mx-auto px-4 py-8">
                {children}
            </div>
        </AuthGuard>
    );
}
