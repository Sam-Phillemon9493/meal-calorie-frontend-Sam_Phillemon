'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { calorieAPI } from '@/lib/api';
import { useMealStore } from '@/stores/mealStore';
import { Loader2 } from 'lucide-react';

const mealSchema = z.object({
    dish_name: z
        .string()
        .min(1, 'Dish name is required')
        .max(100, 'Dish name must be less than 100 characters')
        .regex(
            /^[a-zA-Z0-9\s,'-]+$/,
            'Dish name can only contain letters, numbers, spaces, hyphens, commas, and apostrophes'
        ),
    servings: z.coerce
        .number()
        .min(0.1, 'Servings must be at least 0.1')
        .max(1000, 'Servings must be less than 1000'),
});

export default function MealForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setCurrentResult, addToHistory } = useMealStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(mealSchema),
        defaultValues: {
            dish_name: '',
            servings: 1,
        },
    });

    const onSubmit = async (data: any) => {
        setLoading(true);
        setError('');

        try {
            const response = await calorieAPI.getCalories(data);
            const mealWithTimestamp = {
                ...response,
                timestamp: new Date().toISOString(),
            };

            setCurrentResult(mealWithTimestamp);
            addToHistory(mealWithTimestamp);
            reset();
        } catch (err: any) {
            console.error('Calorie fetch error:', err);

            let errorMessage = 'Failed to fetch calorie data. Please try again.';

            if (err.status === 404) {
                errorMessage = 'Dish not found in the database. Try a different name or check the spelling.';
            } else if (err.status === 400) {
                errorMessage = err.message || 'Invalid dish name or servings. Please check your input.';
            } else if (err.status === 401) {
                errorMessage = 'Session expired. Please login again.';
            } else if (err.message) {
                errorMessage = err.message;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Search Meal Calories</CardTitle>
                <CardDescription>
                    Enter the dish name and number of servings to get calorie information from USDA FoodData Central
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="dish_name">Dish Name</Label>
                        <Input
                            id="dish_name"
                            placeholder="e.g., chicken salad"
                            {...register('dish_name')}
                            disabled={loading}
                        />
                        {errors.dish_name && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.dish_name.message as string}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="servings">Number of Servings</Label>
                        <Input
                            id="servings"
                            type="number"
                            step="0.1"
                            placeholder="e.g., 2"
                            {...register('servings')}
                            disabled={loading}
                        />
                        {errors.servings && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.servings.message as string}
                            </p>
                        )}
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Searching...
                            </>
                        ) : (
                            'Get Calorie Info'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
