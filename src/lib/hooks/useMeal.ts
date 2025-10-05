import { useMealStore } from '@/stores/mealStore';

export const useMeal = () => {
    const { history, currentResult, addToHistory, setCurrentResult, clearHistory } = useMealStore();

    return {
        history,
        currentResult,
        addToHistory,
        setCurrentResult,
        clearHistory,
    };
};
