import { Tables } from './supabase';

export type DietTableType = Omit<Tables<'diets'>, 'foods'> & { foods: FoodType[] };

export type DietType = {
  id?: number;
  date: Date;
  dietType: DietTimeType;
  foods: FoodType[];
};

export type DietTimeType = '아침' | '점심' | '저녁';

export type FoodType = {
  id?: string;
  foodType: string;
  foodName: string;
  kcal: number;
  carbohydrate: number;
  protein: number;
  fat: number;
};

export type DietsLogType = DietTableType[];
