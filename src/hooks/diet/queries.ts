import api from '@/service/service';
import { FoodType } from '@/types/diet';

export const dietsQueryKeys = {
  all: ['diet'] as const,
};

export const queryOptions = {
  getDiets: (date: string) => ({
    queryKey: dietsQueryKeys.all,
    queryFn: async () => {
      const diets = await api.diet.getDietsByDate(date);
      console.log(diets);
      if (!diets) throw new Error('Diet not found');
      return diets;
    },
  }),
};

export const mutationOptions = {
  saveDiet: {
    mutationFn: (data: { imageFiles: File[]; dietType: string; foodForms: FoodType[] }) =>
      api.diet.postDiet(data.imageFiles, data.dietType, data.foodForms),
  },
};
