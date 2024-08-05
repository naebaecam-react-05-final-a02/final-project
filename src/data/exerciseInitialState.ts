import { ExerciseRecord } from '@/types/exercises';

export const exerciseInitialState: ExerciseRecord = {
  date: new Date(),
  name: '',
  memo: '',
  record: [{}],
  exerciseType: 'weight',
} as ExerciseRecord;
