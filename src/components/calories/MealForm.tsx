'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { calorieAPI } from '@/lib/api/calories';
import { useMeal } from '@/lib/hooks/useMeal';
import { calorieSchema, CalorieFormData } from '@/lib/utils/validation';
import { Loader2 } from 'lucide-react';
import { ApiError } from '@/types/auth';

interface MealFormProps {
    onLoadingChange?: (loading: boolean) => void;
    onError?: () => void;
}

export default function MealForm({ onLoadingChange, onError }: MealFormProps) {
    const [loading, setLoading] = useState(false);
    const { setCurrentResult, addToHistory } = useMeal();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CalorieFormData>({
        resolver: zodResolver(calorieSchema),
    });

    const onSubmit = async (data: CalorieFormData) => {
        setLoading(true);
        onLoadingChange?.(true);

        const servings = parseFloat(data.servings);

        if (isNaN(servings) || servings < 0.1 || servings > 1000) {
            toast.error('Invalid Servings', {
                description: 'Servings must be a number between 0.1 and 1000',
            });
            setLoading(false);
            onLoadingChange?.(false);
            onError?.();
            return;
        }

        try {
            const response = await calorieAPI.getCalories({
                dish_name: data.dish_name,
                servings: servings,
            });

            const mealWithTimestamp = {
                ...response,
                timestamp: new Date().toISOString(),
            };

            setCurrentResult(mealWithTimestamp);
            addToHistory(mealWithTimestamp);

            toast.success('Calorie Data Retrieved!', {
                description: `${response.dish_name}: ${response.total_calories} kcal`,
            });

            reset();
        } catch (err) {
            console.error('Calorie fetch error:', err);

            const apiError = err as ApiError;
            let errorMessage = 'Failed to fetch calorie data. Please try again.';

            if (apiError.status === 404) {
                errorMessage = 'Dish not found. Try a different name or check the spelling.';
            } else if (apiError.status === 400) {
                errorMessage = apiError.message || 'Invalid input. Please check your data.';
            } else if (apiError.status === 401) {
                errorMessage = 'Session expired. Please login again.';
            } else if (apiError.message) {
                errorMessage = apiError.message;
            }

            toast.error('Search Failed', {
                description: errorMessage,
            });

            onError?.();
        } finally {
            setLoading(false);
            onLoadingChange?.(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Search Meal Calories</CardTitle>
                <CardDescription>
                    Enter the dish name and number of servings to get calorie information
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className='space-y-2'>
                        <Label htmlFor="dish_name">Dish Name</Label>
                        <Input
                            id="dish_name"
                            placeholder="e.g., chicken salad"
                            {...register('dish_name')}
                            disabled={loading}
                        />
                        {errors.dish_name && (
                            <p className="text-sm text-destructive mt-1">{errors.dish_name.message}</p>
                        )}
                    </div>

                    <div className='space-y-2'>
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
                            <p className="text-sm text-destructive mt-1">{errors.servings.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
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
