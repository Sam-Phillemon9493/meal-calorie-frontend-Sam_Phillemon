import { CalorieRequest, CalorieResponse } from '@/types/meal';
import { apiClient } from './client';

export const calorieAPI = {
    getCalories: async (data: CalorieRequest): Promise<CalorieResponse> => {
        const response = await apiClient.post<CalorieResponse>('/get-calories', data);
        return response.data;
    },
};
