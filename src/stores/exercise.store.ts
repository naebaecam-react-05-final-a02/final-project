import { exerciseInitialState } from '@/data/exerciseInitialState';
import { CardioInput, ExerciseRecord, ExerciseType, WeightInput } from '@/types/exercises';
import { create } from 'zustand';

type ExerciseRecordBase = Omit<ExerciseRecord, 'exerciseType' | 'record'>;

type SetRecordUpdate =
  | Partial<ExerciseRecordBase>
  | ({ exerciseType: 'cardio'; record: CardioInput[] } & Partial<ExerciseRecordBase>)
  | ({ exerciseType: 'weight'; record: WeightInput[] } & Partial<ExerciseRecordBase>);

interface ExerciseStore {
  record: ExerciseRecord;
  isBookMark: boolean;
  cardioInputs: CardioInput[];
  weightInputs: WeightInput[];
  exerciseType: ExerciseType;
  setRecord: (update: SetRecordUpdate) => void;
  setIsBookMark: (value: boolean | ((prev: boolean) => boolean)) => void;
  setCardioInputs: (inputs: CardioInput[]) => void;
  setWeightInputs: (inputs: WeightInput[]) => void;
  setExerciseType: (type: ExerciseType) => void;
  addInput: () => void;
  deleteInput: (index: number) => void;
}

export const useExerciseStore = create<ExerciseStore>((set) => ({
  record: exerciseInitialState,
  isBookMark: false,
  cardioInputs: [{ minutes: 0, distance: 0 }],
  weightInputs: [{ weight: 0, reps: 0 }],
  exerciseType: 'weight',
  setRecord: (update) =>
    set((state) => {
      const newState = { ...state.record, ...update };
      // record가 업데이트될 때 cardioInputs나 weightInputs도 함께 업데이트
      if ('record' in update) {
        if (newState.exerciseType === 'cardio') {
          return {
            record: newState,
            cardioInputs: newState.record as CardioInput[],
            exerciseType: 'cardio',
          };
        } else {
          return {
            record: newState,
            weightInputs: newState.record as WeightInput[],
            exerciseType: 'weight',
          };
        }
      }
      return { record: newState };
    }),
  setIsBookMark: (value) =>
    set((state) => ({
      isBookMark: typeof value === 'function' ? value(state.isBookMark) : value,
    })),
  setCardioInputs: (inputs) => set({ cardioInputs: inputs }),
  setWeightInputs: (inputs) => set({ weightInputs: inputs }),
  setExerciseType: (type) => set({ exerciseType: type }),
  addInput: () =>
    set((state) => {
      if (state.exerciseType === 'cardio') {
        return { cardioInputs: [...state.cardioInputs, { minutes: 0, distance: 0 }] };
      } else {
        return { weightInputs: [...state.weightInputs, { weight: 0, reps: 0 }] };
      }
    }),
  deleteInput: (index) =>
    set((state) => {
      if (state.exerciseType === 'cardio') {
        if (state.cardioInputs.length <= 1) {
          alert('You need to have at least one input');
          return state;
        }
        return { cardioInputs: state.cardioInputs.filter((_, i) => i !== index) };
      } else {
        if (state.weightInputs.length <= 1) {
          alert('You need to have at least one input');
          return state;
        }
        return { weightInputs: state.weightInputs.filter((_, i) => i !== index) };
      }
    }),
}));
