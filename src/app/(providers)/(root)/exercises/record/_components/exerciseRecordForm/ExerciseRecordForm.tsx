'use client';

import { useExerciseStore } from '@/stores/exercise.store';
import CardioForm from '../../../_components/CardioForm';
import Tab from '../../../_components/Tab';
import WeightForm from '../../../_components/WeightForm';

const ExerciseRecordForm = () => {
  const { exerciseType } = useExerciseStore();

  return (
    <div>
      <Tab />
      {exerciseType === 'cardio' ? <CardioForm /> : <WeightForm />}
    </div>
  );
};

export default ExerciseRecordForm;
