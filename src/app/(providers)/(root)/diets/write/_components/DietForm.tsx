'use client';
import { initialFoodState } from '@/data/foodInitialState';
import useDietForm from '@/hooks/diet/useDietForm';
import { useSaveDiet } from '@/hooks/diet/useDiets';
import useRadio from '@/hooks/diet/useRadio';
import { DietTimeType, FoodType } from '@/types/diet';
import { FormEvent, useState } from 'react';
import AddButton from './AddButton';
import Chip from './Chip';
import EmojiSelector from './EmojiSelector';
import FoodFormInput from './FoodFormInput';
import RadioGroup from './RadioGroup';
import TextInput from './TextInput';

const DietForm = () => {
  const { foodForm, handleChange: handleFormChange, setForm, resetForm } = useDietForm();
  const [date, setDate] = useState(''); // TODO: 식단 추가하기 버튼 눌렀을 때 설정됐던 날짜로 초기값 설정
  const [foods, setFoods] = useState<(FoodType & { id: string })[]>([{ ...initialFoodState, id: crypto.randomUUID() }]);
  const [active, setActive] = useState<number>(0);
  const { selectedValue: dietType, handleChange: handleRadioChange } = useRadio<DietTimeType>(['아침', '점심', '저녁']);

  const { mutate: saveDiet, isPending } = useSaveDiet();

  const handleChipClicked = (idx: number) => {
    if (!validateFood(foods[active])) return;
    setActive(idx);
    setForm(foods[idx]);
  };

  const handleAddFood = () => {
    if (!validateFood(foods[active])) return;
    setActive(0);
    setFoods([{ ...initialFoodState, id: crypto.randomUUID() }, ...foods]);
    resetForm();
  };

  const validateFood = (activeFood: FoodType) => {
    const { foodName, kcal, carbohydrate, protein, fat } = activeFood;
    if (!foodName) return alert('음식 이름을 입력해주세요');
    if (kcal < carbohydrate * 4 + protein * 4 + fat * 9) return alert('영양 성분을 올바르게 입력해주세요');
    return true;
  };

  const handleFoodFormChange = (field: keyof FoodType, value: string | number) => {
    handleFormChange(field, value);
    const updatedFoods = foods.map((food, idx) => (idx === active ? { ...food, [field]: value } : food));
    setFoods(updatedFoods);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveDiet(
      { date: new Date(), dietType, foods },
      {
        onSuccess: (response) => {
          alert(response.message);
          setFoods([{ ...initialFoodState, id: crypto.randomUUID() }]);
          resetForm();
          setActive(0);
        },
        onError: (error) => {
          console.error('Save-diet error:', error);
        },
      },
    );
  };

  return (
    <>
      {isPending && (
        <div className="flex justify-center items-center w-full h-screen fixed top-0 left-0 bg-[#00000088] text-white text-2xl z-50">
          등록 중...
        </div>
      )}
      <div className="grid grid-cols-[48px_1fr] gap-3">
        <AddButton onClick={handleAddFood} />
        <div className="flex gap-3 overflow-x-scroll scale">
          {foods.map((food, idx) => (
            <Chip
              key={food.id}
              food={food}
              isActive={active === idx}
              handleDelete={() => alert('삭제! (기능은 아직...)')}
              onClick={() => handleChipClicked(idx)}
            />
          ))}
        </div>
      </div>
      <form className="flex flex-col justify-center items-center gap-4" onSubmit={handleSubmit}>
        <div className="w-full">
          <h2 className="opacity-70 text-sm">날짜 선택</h2>
          <div className="grid grid-cols-2 items-center gap-2">
            <TextInput type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <RadioGroup
              name="dietType"
              values={['아침', '점심', '저녁']}
              selectedValue={dietType}
              handleChange={handleRadioChange}
            />
          </div>
        </div>
        <div className="w-full">
          <h2 className="opacity-70 text-sm">음식 이름</h2>
          <TextInput
            name="foodName"
            value={foodForm['foodName']}
            placeholder="음식 이름을 입력해주세요."
            onChange={(e) => handleFoodFormChange('foodName', e.target.value)}
          >
            {
              <EmojiSelector
                foodType={foodForm['foodType']}
                handleEmojiChange={(emoji) => handleFoodFormChange('foodType', emoji)}
              />
            }
          </TextInput>
        </div>
        <FoodFormInput
          type="number"
          title="칼로리"
          name="kcal"
          unit="kcal"
          value={foodForm['kcal']}
          onChange={(e) => handleFoodFormChange('kcal', Number.parseInt(e.target.value))}
        />
        <div className="grid grid-cols-3 gap-2">
          <FoodFormInput
            type="number"
            title="탄수화물"
            name="carbohydrate"
            unit="g"
            value={foodForm['carbohydrate']}
            onChange={(e) => handleFoodFormChange('carbohydrate', Number.parseInt(e.target.value))}
          />
          <FoodFormInput
            type="number"
            title="단백질"
            name="protein"
            unit="g"
            value={foodForm['protein']}
            onChange={(e) => handleFoodFormChange('protein', Number.parseInt(e.target.value))}
          />
          <FoodFormInput
            type="number"
            title="지방"
            name="fat"
            unit="g"
            value={foodForm['fat']}
            onChange={(e) => handleFormChange('fat', Number.parseInt(e.target.value))}
          />
        </div>
        <button type="submit" className="w-full bg-[#12F28780] text-white px-6 py-3 rounded-lg">
          입력 완료
        </button>
      </form>
    </>
  );
};

export default DietForm;
