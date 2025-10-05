import { Metadata } from 'next';
import DashboardContent from '@/components/dashboard/DashboardContent';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Your meal tracking dashboard',
};

export default function DashboardPage() {
    return <DashboardContent />;
}
