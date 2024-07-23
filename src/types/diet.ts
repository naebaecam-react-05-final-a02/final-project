export type DietType = {
  dietType: DietTimeType;
  images: File[];
  foods: FoodType[];
};

export type DietTimeType = '아침' | '점심' | '저녁';

export type FoodType = {
  foodName: string;
  kcal: number;
  carbohydrate: number;
  protein: number;
  fat: number;
};
