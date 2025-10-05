'use client';

import { useState } from 'react';
import MealForm from './MealForm';
import ResultCard from './ResultCard';
import ResultCardSkeleton from './ResultCardSkeleton';
import { useMealStore } from '@/stores/mealStore';

export default function CaloriesContent() {
    const [isSearching, setIsSearching] = useState(false);
    const currentResult = useMealStore((state) => state.currentResult);

    const handleError = () => {
        setIsSearching(false);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Calorie Lookup</h1>
                <p className="text-muted-foreground">
                    Search for any dish to get accurate calorie information from USDA FoodData Central
                </p>
            </div>

            <MealForm onLoadingChange={setIsSearching} onError={handleError} />

            {isSearching && <ResultCardSkeleton />}

            {!isSearching && currentResult && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ResultCard result={currentResult} />
                </div>
            )}
        </div>
    );
}
