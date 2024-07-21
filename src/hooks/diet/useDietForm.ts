import { FoodType } from '@/types/diet';
import { useState } from 'react';

const useDietForm = () => {
  const initialFoodData: FoodType = {
    foodName: '',
    kcal: 0,
    carbohydrate: 0,
    protein: 0,
    fat: 0,
  };

  const [foodForms, setFoodForms] = useState<FoodType[]>([initialFoodData]);

  const handleChange = (index: number, field: keyof FoodType, value: string | number) => {
    const updatedFoodForms = foodForms.map((food, idx) => (idx === index ? { ...food, [field]: value } : food));
    setFoodForms(updatedFoodForms);
  };

  const handleAddFoodForm = (index: number) => {
    const { foodName, kcal, carbohydrate, protein, fat } = foodForms[index];
    if (!foodName) return alert('음식 이름을 입력해주세요');
    if (kcal < carbohydrate * 4 + protein * 4 + fat * 9) return alert('영양 성분을 올바르게 입력해주세요');
    setFoodForms([...foodForms, initialFoodData]);
  };

  const handleDeleteFoodForm = (index: number) => {
    setFoodForms(foodForms.filter((_, idx) => idx !== index));
  };

  return { foodForms, handleChange, handleAddFoodForm, handleDeleteFoodForm };
};

export default useDietForm;
