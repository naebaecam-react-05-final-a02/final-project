'use client';

import Checkbox from '@/components/Checkbox';
import { ExerciseTodoItemType } from '@/types/exercises';
import { calculateTodoData } from '@/utils/calculateTodo';
import { useState } from 'react';

const ExerciseTodoItem = ({ exercise }: { exercise: ExerciseTodoItemType }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const formattingString = calculateTodoData(exercise);

  return (
    <div className="select-none border-gradient flex items-center size-full h-[52px] gap-x-3 px-3">
      <Checkbox checked={isChecked} label="" onChange={() => setIsChecked((prev) => !prev)} />

      <div className="flex-1">
        <div className="text-white text-sm">{exercise.name}</div>
        <div className="text-white/50 text-xs">{formattingString}</div>
      </div>
    </div>
  );
};

export default ExerciseTodoItem;
