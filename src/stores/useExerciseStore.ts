import { create } from 'zustand';

type Value = 'weight' | 'cardio';

interface ExerciseTabStoreTypes {
  exerciseType: Value;
  setExerciseType: (value: Value) => void;
}

export const useExerciseTabStore = create<ExerciseTabStoreTypes>((set) => ({
  exerciseType: 'weight',
  setExerciseType: (value) => set(() => ({ exerciseType: value })),
}));
