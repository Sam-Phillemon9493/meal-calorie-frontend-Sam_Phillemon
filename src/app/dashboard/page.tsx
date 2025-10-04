'use client';

import { useAuthGuard } from '@/lib/auth';
import { useAuthStore } from '@/stores/authStore';
import { useMealStore } from '@/stores/mealStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, History, TrendingUp } from 'lucide-react';
import { formatDate } from '@/lib/helpers';

export default function DashboardPage() {
    useAuthGuard(true);
    const { user } = useAuthStore();
    const { history } = useMealStore();

    // Calculate stats
    const totalSearches = history.length;
    const totalCalories = history.reduce((sum, meal) => sum + meal.total_calories, 0);
    const avgCalories = totalSearches > 0 ? Math.round(totalCalories / totalSearches) : 0;

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {user?.firstName}! 👋
                </h1>
                <p className="text-muted-foreground">
                    Track your meals and monitor your calorie intake
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Searches</CardTitle>
                        <History className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalSearches}</div>
                        <p className="text-xs text-muted-foreground">
                            All time meal lookups
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Calories</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalCalories.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            Across all searches
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average per Meal</CardTitle>
                        <PlusCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{avgCalories}</div>
                        <p className="text-xs text-muted-foreground">
                            kcal per search
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Action */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                        Start tracking your meals or view your history
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                    <Link href="/calories" className="flex-1">
                        <Button className="w-full" size="lg">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Search Calories
                        </Button>
                    </Link>
                </CardContent>
            </Card>

            {/* Recent History */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Searches</CardTitle>
                    <CardDescription>
                        Your last {Math.min(history.length, 10)} calorie lookups
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {history.length === 0 ? (
                        <div className="text-center py-12">
                            <History className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground mb-4">
                                No search history yet
                            </p>
                            <Link href="/calories">
                                <Button>Start Your First Search</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {history.map((meal, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg p-4 hover:bg-accent transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold capitalize text-lg">
                                            {meal.dish_name}
                                        </h3>
                                        <span className="text-sm text-muted-foreground">
                                            {formatDate(meal.timestamp)}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Servings</p>
                                            <p className="font-medium">{meal.servings}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Per Serving</p>
                                            <p className="font-medium">{meal.calories_per_serving} kcal</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Total</p>
                                            <p className="font-bold text-green-600">
                                                {meal.total_calories} kcal
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
