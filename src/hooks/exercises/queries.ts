import { queryClient } from '@/providers/QueryProvider';
import api from '@/service/service';
import { ExerciseTodoItemType, RecordData, useToggleCompletedDataType } from '@/types/exercises';
import { format } from 'date-fns';

export const ExercisesQueryKeys = {
  all: ['exercises'] as const,
  bookmark: () => [...ExercisesQueryKeys.all, 'bookmark'] as const,
  toggleBookmark: () => [...ExercisesQueryKeys.all, 'toggleBookmark'] as const,
};
export const queryOptions = {
  getExercisesBookmarks: () => ({
    queryKey: ExercisesQueryKeys.bookmark(),
    queryFn: async () => {
      const data = await api.exercise.getBookmarks();

      if (!data) {
        throw new Error('data not found');
      }
      return data;
    },
  }),
  getExerciseRecord: (id: string) => ({
    queryKey: ExercisesQueryKeys.all,
    queryFn: async () => {
      const data = await api.exercise.getExerciseRecord(id);

      if (!data) {
        throw new Error('data not found');
      }
      return data;
    },
  }),
};

export const mutationOptions = {
  register: {
    mutationFn: (exerciseData: RecordData) => api.exercise.register(exerciseData),
  },
  toggleBookmark: {
    mutationFn: (exerciseId: number) => api.exercise.toggleBookmark(exerciseId),
  },
  toggleCompleted: {
    mutationFn: (data: { exercise: ExerciseTodoItemType; isCompleted: boolean; date: Date }) =>
      api.exercise.toggleCompleted(data),
    onMutate: async (data: { exercise: ExerciseTodoItemType; isCompleted: boolean; date: Date }) => {
      const formattingDate = format(data.date, 'yyyy-MM-dd');
      await queryClient.cancelQueries({ queryKey: ['exercises', { date: formattingDate }] });
      const prev: useToggleCompletedDataType = queryClient.getQueryData([
        'exercises',
        { date: formattingDate },
      ]) as useToggleCompletedDataType;

      queryClient.setQueryData(['exercises', { date: formattingDate }], (old: useToggleCompletedDataType) => {
        return {
          ...old,
          data: old.data.map((o) => {
            if (o.id === data.exercise.id && o.userId === data.exercise.userId)
              return { ...o, isCompleted: data.isCompleted };
            return o;
          }),
        };
      });
      return { prev };
    },
  },
};
