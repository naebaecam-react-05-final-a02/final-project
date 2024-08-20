import { useModal } from '@/contexts/modal.context/modal.context';
import { initialFoodState } from '@/data/foodInitialState';
import { DietTableType, FoodType } from '@/types/diet';
import { useState } from 'react';

interface DietFormProps {
  initialValue: DietTableType | null;
}

const useDietForm = ({ initialValue }: DietFormProps) => {
  const [foodChips, setFoodChips] = useState<FoodType[]>(
    initialValue ? initialValue.foods : [{ ...initialFoodState, id: crypto.randomUUID() }],
  );
  const [activeChipIdx, setActiveChipIdx] = useState<number>(0);
  const [foodForm, setFoodForms] = useState<FoodType>(foodChips[0]);

  const modal = useModal();

  const handleChange = (field: keyof FoodType, value: string | number | null) => {
    const updatedValue =
      field === 'foodName' || field === 'foodType' ? value : value === '' ? null : Number(Number(value).toFixed(0));
    setFoodChips((prev) =>
      prev.map((food, idx) => (idx === activeChipIdx ? { ...food, [field]: updatedValue } : food)),
    );
    setFoodForms((prev) => ({ ...prev, [field]: updatedValue }));
  };

  const addNewChip = () => {
    // 이전에 활성화됐던 칩 검사
    if (!validateFood(foodChips[activeChipIdx])) return;
    setFoodChips([{ ...initialFoodState, id: crypto.randomUUID() }, ...foodChips]);
    setActiveChipIdx(0);
    setFoodForms(initialFoodState);
  };

  const deleteChip = (deleteFoodId: string) => {
    if (foodChips.length === 1) {
      // setFoodChips([initialFoodState]);
      // setFoodForms(foodChips[0]);
      modal.alert(['최소 1개의 음식이 남아있어야 합니다.']);
    } else {
      const deletedFoods = foodChips.filter((food) => food.id !== deleteFoodId);
      setFoodChips(deletedFoods);
      setActiveChipIdx(0);
      setFoodForms(deletedFoods[0]);
    }
  };

  const changeChip = (chipIdx: number) => {
    // 이전에 활성화됐던 칩 검사
    if (!validateFood(foodChips[activeChipIdx])) return;
    setActiveChipIdx(chipIdx);
    setFoodForms(foodChips[chipIdx]);
  };

  const resetForm = () => {
    setFoodChips([{ ...initialFoodState, id: crypto.randomUUID() }]);
    setActiveChipIdx(0);
    setFoodForms(initialFoodState);
  };

  const validateFood = (food: FoodType = foodChips[activeChipIdx]) => {
    const { foodName } = food;
    if (!foodName) {
      modal.alert(['음식 이름을 입력해주세요']);
      return false;
    }
    return true;
  };

  return {
    foodForm,
    foodChips,
    activeChipIdx,
    handleChange,
    addNewChip,
    deleteChip,
    changeChip,
    resetForm,
    validateFood,
  };
};

export default useDietForm;
