'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalorieResponse } from '@/types/meal';

interface ResultCardProps {
    result: CalorieResponse;
}

export default function ResultCard({ result }: ResultCardProps) {
    return (
        <Card className="border-2">
            <CardHeader>
                <CardTitle>Calorie Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-muted-foreground">Dish Name:</span>
                    <span className="font-semibold capitalize">{result.dish_name}</span>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-muted-foreground">Servings:</span>
                    <span className="font-semibold">{result.servings}</span>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-muted-foreground">Calories per Serving:</span>
                    <span className="font-semibold text-primary">
                        {result.calories_per_serving} kcal
                    </span>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-muted-foreground">Total Calories:</span>
                    <span className="font-bold text-lg text-success">
                        {result.total_calories} kcal
                    </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                    <span className="text-muted-foreground text-sm">Data Source:</span>
                    <span className="text-sm">{result.source}</span>
                </div>
            </CardContent>
        </Card>
    );
}
