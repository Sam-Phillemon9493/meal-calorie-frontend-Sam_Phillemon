import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MEAL_HISTORY_LIMIT } from '@/lib/constants';
import { MealHistory } from '@/types/meal';

interface MealState {
    history: MealHistory[];
    currentResult: MealHistory | null;
    addToHistory: (meal: MealHistory) => void;
    setCurrentResult: (result: MealHistory | null) => void;
    clearHistory: () => void;
}

export const useMealStore = create<MealState>()(
    persist(
        (set) => ({
            history: [],
            currentResult: null,
            addToHistory: (meal) =>
                set((state) => ({
                    history: [meal, ...state.history].slice(0, MEAL_HISTORY_LIMIT),
                })),
            setCurrentResult: (result) => set({ currentResult: result }),
            clearHistory: () => set({ history: [], currentResult: null }),
        }),
        {
            name: 'meal-storage',
        }
    )
);
