import { CardioInput, ExerciseType, WeightInput } from '@/types/exercises';
import { create } from 'zustand';

interface ExerciseTabStoreTypes {
  exerciseType: ExerciseType;
  setExerciseType: (value: ExerciseType) => void;
}

export const useExerciseTabStore = create<ExerciseTabStoreTypes>((set) => ({
  exerciseType: 'weight',
  setExerciseType: (value) => set(() => ({ exerciseType: value })),
}));

interface CardioInputStoreTypes {
  cardioInputs: CardioInput[];
  setCardioInputs: (value: CardioInput[]) => void;
  addInput: () => void;
  deleteInput: (index: number) => void;
}

export const useCardioInputStore = create<CardioInputStoreTypes>((set) => ({
  cardioInputs: [
    {
      minutes: 0,
      distance: 0,
    },
  ],
  addInput: () => set((state) => ({ cardioInputs: [...state.cardioInputs, { minutes: 0, distance: 0 }] })),
  setCardioInputs: (value) => set(() => ({ cardioInputs: value })),
  deleteInput: (index) =>
    set((state) => {
      if (state.cardioInputs.length <= 1) {
        alert('최소한 한 개의 세트는 유지해야 합니다.');
        return { cardioInputs: state.cardioInputs };
      }
      return { cardioInputs: state.cardioInputs.filter((_, i) => i !== index) };
    }),
}));

interface WeightInputStoreTypes {
  weightInputs: WeightInput[];
  setWeightInputs: (value: WeightInput[]) => void;
  addInput: () => void;
  deleteInput: (index: number) => void;
}

export const useWeightInputStore = create<WeightInputStoreTypes>((set) => ({
  weightInputs: [
    {
      weight: 0,
      reps: 0,
    },
  ],
  setWeightInputs: (value) => set(() => ({ weightInputs: value })),
  addInput: () => set((state) => ({ weightInputs: [...state.weightInputs, { weight: 0, reps: 0 }] })),
  deleteInput: (index) =>
    set((state) => {
      if (state.weightInputs.length <= 1) {
        alert('최소한 한 개의 세트는 유지해야 합니다.');
        return { weightInputs: state.weightInputs };
      }
      return { weightInputs: state.weightInputs.filter((_, i) => i !== index) };
    }),
}));
