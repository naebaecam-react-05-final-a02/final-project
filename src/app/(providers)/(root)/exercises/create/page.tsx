'use client';

import { useExerciseTabStore } from '@/stores/useExerciseStore';
import CardioForm from '../_components/CardioForm';
import Tab from '../_components/Tab';
import WeightForm from '../_components/WeightForm';

const ExerciseRecordPage = () => {
  const exerciseType = useExerciseTabStore((state) => state.exerciseType);
  return (
    <div>
      <Tab />
      {exerciseType === 'cardio' ? <CardioForm /> : <WeightForm />}
    </div>
  );
};

export default ExerciseRecordPage;
