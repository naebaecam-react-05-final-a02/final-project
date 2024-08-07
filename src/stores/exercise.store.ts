import { exerciseInitialState } from '@/data/exerciseInitialState';
import { CardioInput, ExerciseRecord, ExerciseType, WeightInput } from '@/types/exercises';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { create } from 'zustand';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Seoul');

type ExerciseRecordBase = Omit<ExerciseRecord, 'exerciseType' | 'record'>;

type SetRecordUpdate =
  | Partial<ExerciseRecordBase>
  | ({ exerciseType: 'cardio'; record: CardioInput[] } & Partial<ExerciseRecordBase>)
  | ({ exerciseType: 'weight'; record: WeightInput[] } & Partial<ExerciseRecordBase>);

interface ExerciseStore {
  record: ExerciseRecord;
  cardioInputs: CardioInput[];
  weightInputs: WeightInput[];
  exerciseType: ExerciseType;
  setRecord: (update: SetRecordUpdate) => void;
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
      const newRecord = { ...state.record, ...update };

      if ('date' in update && update.date != null) {
        newRecord.date = dayjs(update.date).tz().toDate();
      }

      let newState: Partial<ExerciseStore> = { record: newRecord };

      if ('exerciseType' in update) {
        newState.exerciseType = update.exerciseType;
      }

      if ('record' in update) {
        if (newRecord.exerciseType === 'cardio') {
          newState.cardioInputs = update.record as CardioInput[];
        } else {
          newState.weightInputs = update.record as WeightInput[];
        }
      }

      return newState;
    }),
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
