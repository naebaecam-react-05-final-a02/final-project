import { initialFoodState } from '@/data/foodInitialState';
import { FoodType } from '@/types/diet';
import { useState } from 'react';

const useDietForm = () => {
  const [foodForm, setFoodForms] = useState<FoodType>(initialFoodState);

  const handleChange = (field: keyof FoodType, value: string | number) => {
    setFoodForms({ ...foodForm, [field]: value });
  };

  const setForm = (foodData: FoodType) => {
    setFoodForms(foodData);
  };

  const resetForm = () => {
    setFoodForms(initialFoodData);
  };

  return { foodForm, handleChange, setForm, resetForm };
};

export default useDietForm;
