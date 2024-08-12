import api from '@/service/service';

export const foodsQueryKeys = {
  all: ['food'] as const,
};

export const queryOptions = {
  searchFoodInfo: (foodName: string) => ({
    queryKey: foodsQueryKeys.all,
    queryFn: () => {
      if (foodName) return api.diet.getFoodInfoByFoodName(foodName);
      return [];
    },
  }),
};
