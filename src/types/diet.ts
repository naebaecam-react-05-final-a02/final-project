import { Tables } from './supabase';

export type DietTableType = Omit<Tables<'diets'>, 'foodInfo'> & { foodInfo: FoodType[] };

export type DietType = {
  date: Date;
  dietType: DietTimeType;
  foods: FoodType[];
};

export type DietTimeType = '아침' | '점심' | '저녁';

export type FoodType = {
  foodType: string;
  foodName: string;
  kcal: number;
  carbohydrate: number;
  protein: number;
  fat: number;
};

export type DietsLogType = Omit<Tables<'diets'>, 'foodInfo'> & { foodInfo: FoodType[] }[];
