import useDateStore from '@/stores/date.store';
import { ExerciseRecord } from '@/types/exercises';

export const exerciseInitialState: ExerciseRecord = {
  date: useDateStore.getState().date,
  name: '',
  memo: '',
  record: [{ weight: 0, reps: 0 }],
  exerciseType: 'weight',
} as ExerciseRecord;
