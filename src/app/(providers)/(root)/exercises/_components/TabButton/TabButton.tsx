'use client';
import { useExerciseTabStore } from '@/stores/useExerciseStore';
import { cva } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

interface TabButtonProps {
  value: 'cardio' | 'weight';
}

const tabButtonVariants = cva('h-9 w-full border-b-2', {
  variants: {
    active: {
      true: ' border-[#12F287] text-[#12F287]',
      false: 'border-primary text-primary',
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
