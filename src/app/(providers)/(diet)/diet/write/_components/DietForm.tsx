'use client';
import useDietForm from '@/hooks/diet/useDietForm';
import useRadio from '@/hooks/diet/useRadio';
import { DietTimeType } from '@/types/diet';
import { FormEvent, useRef } from 'react';
import FoodFormInput from './FoodFormInput';
import ImageInputGroup from './ImageInputGroup';
import RadioGroup from './RadioGroup';

const DietForm = () => {
  const MAX_IMAGE = 3;
  const MAX_FOOD = 5;

  const { foodForms, handleChange: handleFormChange, handleAddFoodForm, handleDeleteFoodForm } = useDietForm(MAX_FOOD);
  const { selectedValue: dietType, handleChange: handleRadioChange } = useRadio<DietTimeType>(['아침', '점심', '저녁']);
  const imageFilesRef = useRef<File[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('<< submit >>');
    console.log('images : ', imageFilesRef.current);
    console.log('dietType : ', dietType);
    console.log('foodForms : ', foodForms);
    // INSERT FOOD DATA - https://supabase.com/docs/reference/javascript/insert
  };

  return (
    <form className="flex flex-col justify-center items-center gap-3" onSubmit={handleSubmit}>
      <ImageInputGroup max={MAX_IMAGE} imageFilesRef={imageFilesRef} />
      <div className="w-full px-5">
        <h2 className="font-bold">언제 드셨나요?</h2>
        <RadioGroup
          name="dietType"
          values={['아침', '점심', '저녁']}
          selectedValue={dietType}
          handleChange={handleRadioChange}
        />
      </div>
      {foodForms.map((foodForm, idx) => (
        <div key={`food-form-${idx}`} className="flex flex-col gap-5 p-5 border border-gray-300">
          <button type="button" onClick={() => handleDeleteFoodForm(idx)}>
            X
          </button>
          <FoodFormInput
            title="무엇을 드셨나요?"
            name="foodName"
            value={foodForm['foodName']}
            onChange={(e) => handleFormChange(idx, 'foodName', e.target.value)}
          />
          <FoodFormInput
            type="number"
            title="칼로리를 입력해주세요"
            name="kcal"
            value={foodForm['kcal']}
            onChange={(e) => handleFormChange(idx, 'kcal', e.target.value)}
          />
          <div className="flex flex-wrap gap-3">
            <FoodFormInput
              type="number"
              title="탄수화물"
              name="carbohydrate"
              value={foodForm['carbohydrate']}
              onChange={(e) => handleFormChange(idx, 'carbohydrate', e.target.value)}
            />
            <FoodFormInput
              type="number"
              title="단백질"
              name="protein"
              value={foodForm['protein']}
              onChange={(e) => handleFormChange(idx, 'protein', e.target.value)}
            />
            <FoodFormInput
              type="number"
              title="지방"
              name="fat"
              value={foodForm['fat']}
              onChange={(e) => handleFormChange(idx, 'fat', e.target.value)}
            />
          </div>
          {idx + 1 === foodForms.length && (
            <button
              type="button"
              className="bg-[#949494] text-white p-2 hover:brightness-90"
              onClick={() => handleAddFoodForm(idx)}
            >
              +
            </button>
          )}
        </div>
      ))}
      <button type="submit" className="w-full bg-[#3ECF8E] text-white p-2 hover:brightness-90">
        입력 완료
      </button>
    </form>
  );
};

export default DietForm;
