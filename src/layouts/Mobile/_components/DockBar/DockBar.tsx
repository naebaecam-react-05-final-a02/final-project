'use client';

import { useThemeStore } from '@/stores/useThemeStore';
import { cva } from 'class-variance-authority';

const DockVariants = cva('h-10 w-full absolute bottom-0 flex justify-center', {
  variants: {
    darkMode: {
      false: 'bg-white',
      true: 'bg-black',
    },
  },
});

const DockBarVariants = cva('w-40 h-1 rounded-full absolute bottom-2', {
  variants: {
    darkMode: {
      false: 'bg-black',
      true: 'bg-white',
    },
  },
});

const DockBar = () => {
  const darkMode = useThemeStore((state) => state.darkMode);
  return (
    <div className={DockVariants({ darkMode })}>
      <div className={DockBarVariants({ darkMode })}></div>
    </div>
  );
};

export default DockBar;
