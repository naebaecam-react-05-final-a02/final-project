'use client';

import Checkbox from '@/components/Checkbox';
import { ExercisesQueryKeys } from '@/hooks/exercises/queries';
import { useToggleCompleted } from '@/hooks/exercises/useExercise';
import { queryClient } from '@/providers/QueryProvider';
import { ExerciseTodoItemType } from '@/types/exercises';
import { calculateTodoData } from '@/utils/calculateTodo';
import { getFormattedDate } from '@/utils/dateFormatter';

type ExerciseTodoItemProps = {
  exercise: ExerciseTodoItemType;
  date: Date;
};

const ExerciseTodoItem = ({ exercise, date }: ExerciseTodoItemProps) => {
  const { mutate: toggleCompleted } = useToggleCompleted();

  const [set, data1, data2] = calculateTodoData(exercise);

  const handleChange = () => {
    toggleCompleted(
      { exercise, isCompleted: !exercise.isCompleted, date },
      {
        onError(error, _, context) {
          console.error('Checked Exercise Todo is Error', error);
          if (context?.prev) {
            queryClient.setQueryData(ExercisesQueryKeys.detail(getFormattedDate(date)), context?.prev);
          }
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ExercisesQueryKeys.detail(getFormattedDate(date)) });
        },
      },
    );
  };

  return (
    <div
      className={`select-none border-gradient flex items-center size-full h-[52px] gap-x-3 px-3 transition duration-300 ease-in-out ${
        exercise.isCompleted ? 'brightness-50' : ''
      }`}
    >
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
