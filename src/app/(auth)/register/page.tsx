import { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
    title: 'Sign Up',
    description: 'Create your free account',
};

export default function RegisterPage() {
    return <RegisterForm />;
}
