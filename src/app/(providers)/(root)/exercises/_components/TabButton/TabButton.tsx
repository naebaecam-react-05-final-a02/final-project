'use client';
import { useExerciseTabStore } from '@/stores/useExerciseStore';
import { cva } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

interface TabButtonProps {
  value: 'cardio' | 'weight';
}

const tabButtonVariants = cva('h-9 w-full ', {
  variants: {
    active: {
      true: ' border-[#12F287] text-[#12F287] border-b-2 font-semibold',
      false: 'border-white/40 border-b text-white/40',
    },
  },
});

const TabButton = ({ value, children }: PropsWithChildren<TabButtonProps>) => {
  const exerciseType = useExerciseTabStore((state) => state.exerciseType);
  const setExerciseType = useExerciseTabStore((state) => state.setExerciseType);

  return (
    <button className={tabButtonVariants({ active: exerciseType === value })} onClick={() => setExerciseType(value)}>
      {children}
    </button>
  );
};

export default TabButton;
