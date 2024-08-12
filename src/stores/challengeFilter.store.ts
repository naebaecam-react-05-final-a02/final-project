import { ChallengeFilterTypes } from '@/types/challenge';
import { create } from 'zustand';

interface TChallengeFilterStore {
  filter: ChallengeFilterTypes;
  setFilter: (filter: ChallengeFilterTypes) => void;
}
export const useChallengeFilterStore = create<TChallengeFilterStore>((set) => ({
  filter: { categories: ['all'], status: ['all'], order: ['date'] },
  setFilter: (filter) => set(() => ({ filter })),
}));
