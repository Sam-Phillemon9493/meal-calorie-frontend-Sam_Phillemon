import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center py-6 sm:py-8 px-4 bg-gradient-to-br from-background via-background to-accent/20">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                {children}
            </div>
        </div>
    );
}
