'use client';

import { useExerciseTabStore } from '@/stores/useExerciseStore';
import { CardioInput, ExerciseType, WeightInput } from '@/types/exercises';
import { useEffect } from 'react';
import CardioForm from '../../../_components/CardioForm';
import Tab from '../../../_components/Tab';
import WeightForm from '../../../_components/WeightForm';

type ExerciseRecordFormProps = {
  onChange: (data: CardioInput[] | WeightInput[], type: ExerciseType) => void;
};

const ExerciseRecordForm = ({ onChange }: ExerciseRecordFormProps) => {
  const exerciseType = useExerciseTabStore((state) => state.exerciseType);
  console.log('@@exerciseType', exerciseType);
  const handleFormChange = (data: CardioInput[] | WeightInput[]) => {
    console.log('@@Data', data);
    if (data.length === 0) {
      console.error('데이터가 없습니다. 세트를 추가해 주세요.');
    } else {
      console.log('전달된 세트 데이터:', data);
      onChange(data, exerciseType);
    }
  };

  return (
    <div>
      <Tab />
      {exerciseType === 'cardio' ? (
        <CardioForm onChange={handleFormChange} />
      ) : (
        <WeightForm onChange={handleFormChange} />
      )}
    </div>
  );
};

export default ExerciseRecordForm;
