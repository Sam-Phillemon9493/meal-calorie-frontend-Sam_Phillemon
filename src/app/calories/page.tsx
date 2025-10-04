'use client';

import MealForm from '@/components/Forms/MealForm';
import ResultCard from '@/components/Pure/ResultCard';
import { useAuthGuard } from '@/lib/auth';
import { useMealStore } from '@/stores/mealStore';

export default function CaloriesPage() {
    useAuthGuard(true);
    const { currentResult } = useMealStore();

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Calorie Lookup</h1>
                <p className="text-muted-foreground">
                    Search for any dish to get accurate calorie information
                </p>
            </div>

            <MealForm />

            {currentResult && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ResultCard result={currentResult} />
                </div>
            )}
        </div>
    );
}
