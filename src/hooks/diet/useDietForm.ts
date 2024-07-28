import { initialFoodState } from '@/data/foodInitialState';
import { FoodType } from '@/types/diet';
import { useState } from 'react';

const useDietForm = () => {
  const [foodChips, setFoodChips] = useState<(FoodType & { id: string })[]>([
    { ...initialFoodState, id: crypto.randomUUID() },
  ]);
  const [activeChipIdx, setActiveChipIdx] = useState<number>(0);
  const [foodForm, setFoodForms] = useState<FoodType>(initialFoodState);

  const handleChange = (field: keyof FoodType, value: string | number) => {
    const updatedFoods = foodChips.map((food, idx) => (idx === activeChipIdx ? { ...food, [field]: value } : food));
    setFoodChips(updatedFoods);
    setFoodForms({ ...foodForm, [field]: value });
  };

  const addNewChip = () => {
    // 이전에 활성화됐던 칩 검사
    if (!validateFood(foodChips[activeChipIdx])) return;
    setFoodForms(initialFoodState);
  };

  const changeChip = (chipIdx: number) => {
    // 이전에 활성화됐던 칩 검사
    if (!validateFood(foodChips[activeChipIdx])) return;
    setActiveChipIdx(chipIdx);
    setFoodForms(foodChips[chipIdx]);
  };

  const resetForm = () => {
    setFoodForms(initialFoodState);
    setFoodChips([{ ...initialFoodState, id: crypto.randomUUID() }]);
    setActiveChipIdx(0);
  };

  const validateFood = (food: FoodType) => {
    const { foodName, kcal, carbohydrate, protein, fat } = food;
    if (!foodName) return alert('음식 이름을 입력해주세요');
    if (kcal < carbohydrate * 4 + protein * 4 + fat * 9) return alert('영양 성분을 올바르게 입력해주세요');
    return true;
  };

  return { foodForm, foodChips, activeChipIdx, handleChange, addNewChip, changeChip, resetForm };
};

export default useDietForm;
