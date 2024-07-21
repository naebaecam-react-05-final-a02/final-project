import { FoodType } from '@/types/diet';
import { useState } from 'react';

const useDietForm = (MAX_FOOD: number) => {
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
    if (foodForms.length < MAX_FOOD) {
      setFoodForms([...foodForms, initialFoodData]);
    }
  };

  const handleDeleteFoodForm = (index: number) => {
    setFoodForms(foodForms.filter((_, idx) => idx !== index));
  };

  return { foodForms, handleChange, handleAddFoodForm, handleDeleteFoodForm };
};

export default useDietForm;
