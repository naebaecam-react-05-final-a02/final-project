'use client';

import Checkbox from '@/components/Checkbox';
import { useToggleCompleted } from '@/hooks/exercises/useExercise';
import { queryClient } from '@/providers/QueryProvider';
import { ExerciseTodoItemType } from '@/types/exercises';
import { calculateTodoData } from '@/utils/calculateTodo';
import { format } from 'date-fns';

type ExerciseTodoItemProps = {
  exercise: ExerciseTodoItemType;
  date: Date;
};

const ExerciseTodoItem = ({ exercise, date }: ExerciseTodoItemProps) => {
  const { mutate: toggleCompleted } = useToggleCompleted();
  const formattingDate = format(date, 'yyyy-MM-dd');

  const [set, data1, data2] = calculateTodoData(exercise);

  const handleChange = () => {
    toggleCompleted(
      { exercise, isCompleted: !exercise.isCompleted, date },
      {
        onError(error, _, context) {
          console.error('Checked Exercise Todo is Error', error);
          if (context?.prev) {
            queryClient.setQueryData(['exercises', { date: formattingDate }], context?.prev);
          }
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ['exercises', { date: formattingDate }] });
        },
      },
    );
  };

  return (
    <div className="select-none border-gradient flex items-center size-full h-[52px] gap-x-3 px-3">
      <Checkbox checked={exercise.isCompleted!} label="" onChange={handleChange} />

      <div className="flex flex-col gap-y-1">
        <div className="text-white text-sm">{exercise.name}</div>
        <div className="flex items-center gap-2 text-white/50 text-xs">
          <span>{set}</span>
          <span className="inline-block w-[1px] h-2 bg-whiteT-10"></span>
          <span>{data1}</span>
          <span className="inline-block w-[1px] h-2 bg-whiteT-10"></span>
          <span>{data2}</span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseTodoItem;
