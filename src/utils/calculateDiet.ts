import { DietTableType, FoodType } from '@/types/diet';

export const getDietsCalories = (diets: DietTableType[] | undefined | null) => {
  if (typeof diets === 'undefined' || !diets) {
    return { kcal: 0, carbohydrate: 0, protein: 0, fat: 0 };
  }
  const calories = diets.reduce(
    (acc, diet) => {
      const { kcal, carbohydrate, protein, fat } = getFoodsCalories(diet.foods);
      acc.kcal += kcal;
      acc.carbohydrate += carbohydrate;
      acc.protein += protein;
      acc.fat += fat;
      return acc;
    },
    { kcal: 0, carbohydrate: 0, protein: 0, fat: 0 },
  );

  return calories;
};

export const getFoodsCalories = (foods: FoodType[]) => {
  const calories = foods.reduce(
    (acc, cur) => {
      acc.kcal += cur.kcal;
      acc.carbohydrate += cur.carbohydrate;
      acc.protein += cur.protein;
      acc.fat += cur.fat;
      return acc;
    },
    { kcal: 0, carbohydrate: 0, protein: 0, fat: 0 },
  );
  return calories;
};

export const getFoods = (diets: DietTableType[] | undefined | null) => {
  if (typeof diets === 'undefined' || !diets) {
    return null;
  }
  return diets.reduce((acc, cur) => {
    return [...acc, ...cur.foods];
  }, [] as FoodType[]);
};
