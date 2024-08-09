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
  kcal: number | null;
  carbohydrate: number | null;
  protein: number | null;
  fat: number | null;
};

export type DietsLogType = DietTableType[];

export type SearchFoodResponseType = {
  resultCode: string;
  resultMsg: string;
  numOfRows: string;
  pageNo: string;
  totalCount: string;
  DESC_KOR: string;
  SERVING_WT: string;
  NUTR_CONT1: string; // 열량 (kcal)
  NUTR_CONT2: string; // 탄수화물 (g)
  NUTR_CONT3: string; // 단백질 (g)
  NUTR_CONT4: string; // 지방 (g)
  NUTR_CONT5: string; // 당류 (g)
  NUTR_CONT6: string; // 나트륨 (mg)
  NUTR_CONT7: string; // 콜레스테롤 (mg)
  NUTR_CONT8: string; // 포화지방산 (g)
  NUTR_CONT9: string; // 트랜스지방산 (g)
};
