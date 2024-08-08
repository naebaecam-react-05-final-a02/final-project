import { Tables } from './supabase';

export interface CardioInput {
  minutes: number | null;
  distance: number | null;
}

export interface WeightInput {
  weight: number | null;
  reps: number | null;
}

export interface Weight {
  sets: number;
  weight: number;
  reps: number;
}

export interface Cardio {
  sets: number;
  minutes: number;
  distance: number;
}

export type ExerciseType = 'weight' | 'cardio';

export type ExerciseTodoItemType = {
  exerciseType: ExerciseType;
} & (
  | (Omit<Tables<'exercises'>, 'exerciseType' | 'record'> & { exerciseType: 'weight'; record: Weight[] })
  | (Omit<Tables<'exercises'>, 'exerciseType' | 'record'> & { exerciseType: 'cardio'; record: Cardio[] })
);

export type ExerciseRecord = {
  date: Date;
  name: string;
  memo: string;
  exerciseType: ExerciseType;
} & ({ exerciseType: 'cardio'; record: CardioInput[] } | { exerciseType: 'weight'; record: WeightInput[] });

export type RecordData = {
  date: Date;
  name: string;
  memo: string;
  exerciseType: ExerciseType;
  record: CardioInput[] | WeightInput[];
};

export type UseToggleCompletedDataType = {
  data: ExerciseTodoItemType[];
  error: null;
  details: null;
};
