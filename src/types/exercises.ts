import { Tables } from './supabase';

export interface CardioInput {
  hours: number;
  minutes: number;
}

export interface WeightInput {
  weight: number;
  reps: number;
}

export type Value = 'weight' | 'cardio';

export type ExerciseTodoItemType =
  | (Omit<Tables<'exercises'>, 'exerciseType' | 'record'> & { exerciseType: 'weight'; record: WeightInput[] })
  | (Omit<Tables<'exercises'>, 'exerciseType' | 'record'> & { exerciseType: 'cardio'; record: CardioInput[] });
