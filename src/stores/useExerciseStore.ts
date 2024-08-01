import { CardioInput, Value, WeightInput } from '@/types/exercises';
import { create } from 'zustand';

interface ExerciseTabStoreTypes {
  exerciseType: Value;
  setExerciseType: (value: Value) => void;
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
      hours: 0,
      minutes: 0,
    },
  ],
  addInput: () => set((state) => ({ cardioInputs: [...state.cardioInputs, { hours: 0, minutes: 0 }] })),
  setCardioInputs: (value) => set(() => ({ cardioInputs: value })),
  deleteInput: (index) =>
    set((state) => {
      if (state.cardioInputs.length <= 1) {
        alert('You need to have at least one input');
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
        alert('You need to have at least one input');
        return { weightInputs: state.weightInputs };
      }
      return { weightInputs: state.weightInputs.filter((_, i) => i !== index) };
    }),
}));
