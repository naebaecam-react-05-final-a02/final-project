import { create } from 'zustand';

interface themeStoreTypes {
  darkMode: boolean;
  toggleMode: () => void;
}
export const useThemeStore = create<themeStoreTypes>((set) => ({
  darkMode: false,
  toggleMode: () => set((prev) => ({ darkMode: !prev.darkMode })),
}));
