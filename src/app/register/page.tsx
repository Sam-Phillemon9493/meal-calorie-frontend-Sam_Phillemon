'use client';

import AuthForm from '@/components/Forms/AuthForm';
import { useAuthGuard } from '@/lib/auth';

export default function RegisterPage() {
    useAuthGuard(false);

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <AuthForm type="register" />
        </div>
    );
}
