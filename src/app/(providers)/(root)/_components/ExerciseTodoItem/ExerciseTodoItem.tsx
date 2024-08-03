'use client';

import Checkbox from '@/components/Checkbox';
import { queryClient } from '@/providers/QueryProvider';
import { createClient } from '@/supabase/client';
import { ExerciseTodoItemType } from '@/types/exercises';
import { calculateTodoData } from '@/utils/calculateTodo';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';

type ExerciseTodoItemProps = {
  exercise: ExerciseTodoItemType;
  date: Date;
};

type ExerciseData = {
  data: ExerciseTodoItemType[];
  error: null;
  details: null;
};
const ExerciseTodoItem = ({ exercise, date }: ExerciseTodoItemProps) => {
  const [set, data1, data2] = calculateTodoData(exercise);

  const { mutate: isCompleted } = useMutation({
    mutationFn: async (exercise: ExerciseTodoItemType) => {
      const supabase = createClient();
      const response = await supabase
        .from('exercises')
        .update({ isCompleted: true })
        .match({ id: exercise.id, userId: exercise.userId });

      return response;
    },
    onMutate: async () => {
      const formattingDate = format(date, 'yyyy-MM-dd');
      await queryClient.cancelQueries({ queryKey: ['exercises', { date: formattingDate }] });
      const prev: ExerciseData = queryClient.getQueryData(['exercises', { date: formattingDate }]) as ExerciseData;

      queryClient.setQueryData(['exercises', { date: formattingDate }], (old: ExerciseData) => {
        return {
          ...old,
          data: old.data.map((o) => {
            if (o.id === exercise.id && o.userId === exercise.userId) return { ...o, isCompleted: true };
            return o;
          }),
        };
      });

      return { prev };
    },
    onError: (error, _hero, context?: { prev: ExerciseData }) => {
      const formattingDate = format(date, 'yyyy-MM-dd');
      console.error('Checked Exercise Todo is Error', error);
      if (context?.prev) {
        queryClient.setQueryData(['exercises', { date: formattingDate }], context?.prev);
      }
    },
    onSettled: () => {
      const formattingDate = format(date, 'yyyy-MM-dd');
      queryClient.invalidateQueries({ queryKey: ['exercises', { date: formattingDate }] });
    },
  });

  const { mutate: isNoneCompleted } = useMutation({
    mutationFn: async (exercise: ExerciseTodoItemType) => {
      const supabase = createClient();
      const response = await supabase
        .from('exercises')
        .update({ isCompleted: false })
        .match({ id: exercise.id, userId: exercise.userId });

      return response;
    },
    onMutate: async () => {
      const formattingDate = format(date, 'yyyy-MM-dd');
      await queryClient.cancelQueries({ queryKey: ['exercises', { date: formattingDate }] });
      const prev: ExerciseData = queryClient.getQueryData(['exercises', { date: formattingDate }]) as ExerciseData;

      queryClient.setQueryData(['exercises', { date: formattingDate }], (old: ExerciseData) => {
        return {
          ...old,
          data: old.data.map((o) => {
            if (o.id === exercise.id && o.userId === exercise.userId) return { ...o, isCompleted: false };
            return o;
          }),
        };
      });

      return { prev };
    },
    onError: (error, _hero, context?: { prev: ExerciseData }) => {
      const formattingDate = format(date, 'yyyy-MM-dd');
      console.error('Checked Exercise Todo is Error', error);
      if (context?.prev) {
        queryClient.setQueryData(['exercises', { date: formattingDate }], context?.prev);
      }
    },
    onSettled: () => {
      const formattingDate = format(date, 'yyyy-MM-dd');
      queryClient.invalidateQueries({ queryKey: ['exercises', { date: formattingDate }] });
    },
  });

  const handleChange = () => {
    if (exercise.isCompleted) isNoneCompleted(exercise);
    else isCompleted(exercise);
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
