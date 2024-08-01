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
  | {
      date: string;
      exerciseType: 'weight';
      id: number;
      name: string | null;
      record: WeightInput[];
      userId: string;
    }
  | {
      date: string;
      exerciseType: 'cardio';
      id: number;
      name: string | null;
      record: CardioInput[];
      userId: string;
    };
