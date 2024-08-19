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
      acc.kcal += cur.kcal ?? 0;
      acc.carbohydrate += cur.carbohydrate ?? 0;
      acc.protein += cur.protein ?? 0;
      acc.fat += cur.fat ?? 0;
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

export const formatCalory = (value: string) => {
  let num = Number.parseInt(value);
  if (num < 0) return 0;
  if (num > 5000) return 5000;
  return num;
};
