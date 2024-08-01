export interface CardioInput {
  hours: number;
  minutes: number;
}

export interface WeightInput {
  weight: number;
  reps: number;
}

export interface ExerciseRecord {
  date: string;
  name: string;
  record: CardioInput[] | WeightInput[];
  exerciseType: ExerciseType;
}
export interface RecordData extends ExerciseRecord {
  isBookMark: boolean;
}

export type ExerciseType = 'weight' | 'cardio';
