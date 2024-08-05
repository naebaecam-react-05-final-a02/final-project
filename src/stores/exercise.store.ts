import { ExerciseTodoItemType } from '@/types/exercises';
import { create } from 'zustand';

interface ExerciseStoreState {
  exercise: ExerciseTodoItemType | null;
  setExercise: (exercise: ExerciseTodoItemType | null) => void;
}

const useExerciseStore = create<ExerciseStoreState>((set) => ({
  exercise: null,
  setExercise: (exercise) => set(() => ({ exercise: exercise })),
}));

export default useExerciseStore;
