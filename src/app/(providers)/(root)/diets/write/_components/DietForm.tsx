'use client';
import Chip from '@/components/Chip';
import useDietForm from '@/hooks/diet/useDietForm';
import { useSaveDiet } from '@/hooks/diet/useDiets';
import useRadio from '@/hooks/diet/useRadio';
import useDateStore from '@/stores/date.store';
import useDietStore from '@/stores/diet.store';
import { DietTimeType } from '@/types/diet';
import { getFormattedDate } from '@/utils/dateFormatter';
import { FormEvent, useState } from 'react';
import AddButton from './AddButton';
import EmojiSelector from './EmojiSelector';
import RadioGroup from './RadioGroup';
import TextInput from './TextInput';

const DietForm = () => {
  const initialValue = useDietStore((state) => state.diet);

  const {
    foodForm,
    foodChips,
    activeChipIdx,
    handleChange: handleFormChange,
    validateFood,
    addNewChip,
    deleteChip,
    changeChip,
    resetForm,
  } = useDietForm({ initialValue });

  // TODO: 식단 date 컬럼 타입 timestamp에서 date로 변경해서 split 필요없게 할래용
  const selectedDate = useDateStore((state) => state.date);
  const [date, setDate] = useState(getFormattedDate(selectedDate));
  const { selectedValue: dietType, handleChange: handleRadioChange } = useRadio<DietTimeType>(
    ['아침', '점심', '저녁'],
    initialValue?.dietType,
  );

  const { mutate: saveDiet, isPending } = useSaveDiet();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFood()) return;
    saveDiet(
      { date: new Date(date), dietType, foods: foodChips },
      {
        onSuccess: (response) => {
          alert(response.message);
          resetForm();
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
        <AddButton onClick={addNewChip} />
        <div className="chips flex gap-3 overflow-x-scroll scale">
          {foodChips.map((food, idx) => (
            <Chip
              key={food.id}
              food={food}
              isActive={activeChipIdx === idx}
              handleDelete={() => deleteChip(food.id)}
              onClick={() => changeChip(idx)}
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
            value={foodForm['foodName']}
            placeholder="음식 이름을 입력해주세요."
            onChange={(e) => handleFormChange('foodName', e.target.value)}
          >
            {
              <EmojiSelector
                foodType={foodForm['foodType']}
                handleEmojiChange={(emoji) => handleFormChange('foodType', emoji)}
              />
            }
          </TextInput>
        </div>
        <div className="w-full">
          <h2 className="opacity-70 text-sm">칼로리</h2>
          <TextInput
            type="number"
            unit="kcal"
            value={foodForm['kcal']}
            onChange={(e) => handleFormChange('kcal', Number.parseInt(e.target.value))}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="w-full">
            <h2 className="opacity-70 text-sm">탄수화물</h2>
            <TextInput
              type="number"
              unit="g"
              value={foodForm['carbohydrate']}
              onChange={(e) => handleFormChange('carbohydrate', Number.parseInt(e.target.value))}
            />
          </div>
          <div className="w-full">
            <h2 className="opacity-70 text-sm">단백질</h2>
            <TextInput
              type="number"
              unit="g"
              value={foodForm['protein']}
              onChange={(e) => handleFormChange('protein', Number.parseInt(e.target.value))}
            />
          </div>
          <div className="w-full">
            <h2 className="opacity-70 text-sm">지방</h2>
            <TextInput
              type="number"
              unit="g"
              value={foodForm['fat']}
              onChange={(e) => handleFormChange('fat', Number.parseInt(e.target.value))}
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-[#12F28780] text-white px-6 py-3 rounded-lg">
          입력 완료
        </button>
      </form>
    </>
  );
};

export default DietForm;
