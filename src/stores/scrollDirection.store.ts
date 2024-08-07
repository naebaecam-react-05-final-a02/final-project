import { create } from 'zustand';

import { Direction } from '@smakss/react-scroll-direction';

interface scrollDirectionProps {
  dir: Direction;
  setDir: (dir: Direction) => void;
}
export const useScrollDirectionStore = create<scrollDirectionProps>((set) => ({
  dir: Direction.Still,
  setDir: (dir) => set({ dir }),
}));
