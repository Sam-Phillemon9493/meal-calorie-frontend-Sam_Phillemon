import { Metadata } from 'next';
import CaloriesContent from '@/components/calories/CaloriesContent';

export const metadata: Metadata = {
    title: 'Calorie Lookup',
    description: 'Search for meal calorie information',
};

export default function CaloriesPage() {
    return <CaloriesContent />;
}
