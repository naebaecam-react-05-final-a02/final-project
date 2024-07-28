import api from '@/service/service';
import { DietType } from '@/types/diet';

export const dietsQueryKeys = {
  all: ['diet'] as const,
};

export const queryOptions = {
  getDiets: (date: string) => ({
    queryKey: [dietsQueryKeys.all, date], // TODO: refactoring 필요
    queryFn: async () => {
      const diets = await api.diet.getDietsByDate(date);
      if (!diets) throw new Error('Diet not found');
      return diets;
    },
  }),
};

export const mutationOptions = {
  saveDiet: {
    mutationFn: ({ date, dietType, foods }: DietType) => api.diet.postDiet({ date, dietType, foods }),
  },
};
