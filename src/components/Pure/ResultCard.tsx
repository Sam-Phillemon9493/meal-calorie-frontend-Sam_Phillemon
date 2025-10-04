'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalorieResponse } from '@/types';

type ResultCardProps = {
    result: CalorieResponse;
};

export default function ResultCard({ result }: ResultCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Calorie Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">Dish Name:</span>
                    <span className="font-semibold capitalize">{result.dish_name}</span>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">Servings:</span>
                    <span className="font-semibold">{result.servings}</span>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">Calories per Serving:</span>
                    <span className="font-semibold text-blue-600">
                        {result.calories_per_serving} kcal
                    </span>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">Total Calories:</span>
                    <span className="font-bold text-lg text-green-600">
                        {result.total_calories} kcal
                    </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-600 text-sm">Data Source:</span>
                    <span className="text-sm">{result.source}</span>
                </div>
            </CardContent>
        </Card>
    );
}
