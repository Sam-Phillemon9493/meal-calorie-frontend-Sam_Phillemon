'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { useMeal } from '@/lib/hooks/useMeal';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/utils/date';
import Link from 'next/link';
import { PlusCircle, History, TrendingUp, Search, X } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function DashboardContent() {
    const { user } = useAuth();
    const { history } = useMeal();
    const [searchQuery, setSearchQuery] = useState('');

    const totalSearches = history.length;
    const totalCalories = history.reduce((sum, meal) => sum + meal.total_calories, 0);
    const avgCalories = totalSearches > 0 ? Math.round(totalCalories / totalSearches) : 0;

    const filteredHistory = searchQuery.trim()
        ? history.filter((meal) =>
            meal.dish_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : history;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {user?.firstName}! 👋
                </h1>
                <p className="text-muted-foreground">
                    Track your meals and monitor your calorie intake
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Searches</CardTitle>
                        <History className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalSearches}</div>
                        <p className="text-xs text-muted-foreground">All time meal lookups</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Calories</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">{totalCalories.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Across all searches</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average per Meal</CardTitle>
                        <PlusCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{avgCalories}</div>
                        <p className="text-xs text-muted-foreground">kcal per search</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Start tracking your meals or view your history</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href={ROUTES.CALORIES}>
                        <Button className="w-full cursor-pointer" size="lg">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Search Calories
                        </Button>
                    </Link>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Searches</CardTitle>
                    <CardDescription>
                        {searchQuery ? `Found ${filteredHistory.length} result(s)` : `Your last ${Math.min(history.length, 10)} calorie lookups`}
                    </CardDescription>
                    {history.length > 0 && (
                        <div className="relative mt-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search meals..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-10"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    )}
                </CardHeader>
                <CardContent>
                    {history.length === 0 ? (
                        <div className="text-center py-12">
                            <History className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground mb-4">No search history yet</p>
                            <Link href={ROUTES.CALORIES}>
                                <Button>Start Your First Search</Button>
                            </Link>
                        </div>
                    ) : filteredHistory.length === 0 ? (
                        <div className="text-center py-12">
                            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground mb-2">No meals found</p>
                            <p className="text-sm text-muted-foreground">
                                Try searching for a different meal name
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredHistory.map((meal, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg p-4 hover:bg-accent transition-colors"
                                >
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                                        <h3 className="font-semibold capitalize text-lg break-words line-clamp-2">
                                            {meal.dish_name}
                                        </h3>
                                        <span className="text-sm text-muted-foreground whitespace-nowrap flex-shrink-0">
                                            {formatDate(meal.timestamp)}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground text-xs whitespace-nowrap">Servings</p>
                                            <p className="font-medium whitespace-nowrap">{meal.servings}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-xs whitespace-nowrap">Per Serving</p>
                                            <p className="font-medium whitespace-nowrap">{meal.calories_per_serving} kcal</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground etxt-xs whitespace-nowrap">Total</p>
                                            <p className="font-bold text-success whitespace-nowrap">{meal.total_calories} kcal</p>
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
