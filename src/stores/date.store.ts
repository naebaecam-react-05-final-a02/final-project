import { create } from 'zustand';

interface DateStoreState {
  date: Date; //
  setDate: (date: Date) => void;
}

const useDateStore = create<DateStoreState>((set) => ({
  date: new Date(),
  setDate: (date) => set(() => ({ date })),
}));

export default useDateStore;
