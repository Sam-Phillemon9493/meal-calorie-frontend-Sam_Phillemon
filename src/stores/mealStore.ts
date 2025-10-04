import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MealHistory } from '@/types';

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
                    history: [meal, ...state.history].slice(0, 10), // Keep last 10
                })),
            setCurrentResult: (result) => set({ currentResult: result }),
            clearHistory: () => set({ history: [] }),
        }),
        {
            name: 'meal-storage',
        }
    )
);
