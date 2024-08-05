import { Tables } from './supabase';

export interface CardioInput {
  minutes: number;
  distance: number;
}

export interface WeightInput {
  weight: number;
  reps: number;
}

export type weight = {
  sets: number;
  weight: number;
  reps: number;
};

export type cardio = {
  sets: number;
  minutes: number;
  distance: number;
};

export type ExerciseTodoItemType =
  | (Omit<Tables<'exercises'>, 'exerciseType' | 'record'> & { exerciseType: 'weight'; record: weight[] })
  | (Omit<Tables<'exercises'>, 'exerciseType' | 'record'> & { exerciseType: 'cardio'; record: cardio[] });

export interface ExerciseRecord {
  date: string;
  name: string;
  memo: string;
  record: CardioInput[] | WeightInput[];
  exerciseType: ExerciseType;
}
export interface RecordData extends ExerciseRecord {
  isBookMark: boolean;
}

export type ExerciseType = 'weight' | 'cardio';

export type useToggleCompletedDataType = {
  data: ExerciseTodoItemType[];
  error: null;
  details: null;
};
