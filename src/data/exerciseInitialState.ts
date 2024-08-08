import { ExerciseRecord } from '@/types/exercises';

export const exerciseInitialState: ExerciseRecord = {
  date: new Date(),
  name: '',
  memo: '',
  record: [{ weight: 0, reps: 0 }],
  exerciseType: 'weight',
} as ExerciseRecord;
