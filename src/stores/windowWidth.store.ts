import { create } from 'zustand';

interface windowWidthStoreTypes {
  width: number;
  setWidth: (width: number) => void;
}
export const useWindowWidthStore = create<windowWidthStoreTypes>((set) => ({
  width: 1000,
  setWidth: (width) => set((state) => ({ width })),
}));
