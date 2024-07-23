import api from '@/service/service';
import { FoodType } from '@/types/diet';

export const mutationOptions = {
  saveDiet: {
    mutationFn: (data: { imageFiles: File[]; dietType: string; foodForms: FoodType[] }) =>
      api.diet.postDiet(data.imageFiles, data.dietType, data.foodForms),
  },
};
