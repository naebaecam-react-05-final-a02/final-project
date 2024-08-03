import { create } from 'zustand';

interface TChallengeCategoryStore {
  category: string;
  setCategory: (order: string) => void;
}
export const useChallengeCategoryStore = create<TChallengeCategoryStore>((set) => ({
  category: 'all',
  setCategory: (category) => set(() => ({ category })),
}));
