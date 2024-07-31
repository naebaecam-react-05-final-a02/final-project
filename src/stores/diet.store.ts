import { DietTableType } from '@/types/diet';
import { create } from 'zustand';

interface DietStoreState {
  diet: DietTableType | null;
  setDiet: (diet: DietTableType | null) => void;
}

const useDietStore = create<DietStoreState>((set) => ({
  diet: null,
  setDiet: (diet) => set(() => ({ diet })),
}));

export default useDietStore;
