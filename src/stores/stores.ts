import { CategoryTypes } from '@/app/(providers)/(root)/challenges/all/_constants/constants';
import { create } from 'zustand';

interface TChallengeCategoryStore {
  category: CategoryTypes;
  setCategory: (order: CategoryTypes) => void;
}
export const useChallengeCategoryStore = create<TChallengeCategoryStore>((set) => ({
  category: 'all',
  setCategory: (category) => set(() => ({ category })),
}));
