export interface CardioInput {
  hours: number;
  minutes: number;
}

export interface WeightInput {
  weight: number;
  reps: number;
}

export type Value = 'weight' | 'cardio';
