import { queryClient } from '@/providers/QueryProvider';
import api from '@/service/service';

import { ExerciseTodoItemType, RecordData, UseToggleCompletedDataType } from '@/types/exercises';
import { getFormattedDate } from '@/utils/dateFormatter';

export const ExercisesQueryKeys = {
  all: ['exercises'] as const,
  bookmark: () => [...ExercisesQueryKeys.all, 'bookmark'] as const,
  toggleBookmark: () => [...ExercisesQueryKeys.all, 'toggleBookmark'] as const,
  detail: (date: string) => [...ExercisesQueryKeys.all, { date }] as const,
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
  getExercises: (date: string) => ({
    queryKey: ExercisesQueryKeys.detail(date),
    queryFn: async () => {
      const exercises = await api.exercise.getExercisesByDate(date);
      if (!exercises) throw new Error('Exercise not found');
      return exercises;
    },
  }),
};

export const mutationOptions = {
  register: {
    mutationFn: (exerciseData: RecordData) => api.exercise.register(exerciseData),
  },
  update: {
    mutationFn: ({ exerciseData, exerciseId }: { exerciseData: RecordData; exerciseId: string }) =>
      api.exercise.update({ exerciseData, exerciseId }),
  },
  toggleBookmark: {
    mutationFn: (record: RecordData) => api.exercise.toggleBookmark(record),
  },
  toggleCompleted: {
    mutationFn: (data: { exercise: ExerciseTodoItemType; isCompleted: boolean; date: Date }) =>
      api.exercise.toggleCompleted(data),
    onMutate: async (data: { exercise: ExerciseTodoItemType; isCompleted: boolean; date: Date }) => {
      // const formattingDate = format(data.date, 'yyyy-MM-dd');
      await queryClient.cancelQueries({ queryKey: ExercisesQueryKeys.detail(getFormattedDate(data.date)) });
      const prev: UseToggleCompletedDataType = queryClient.getQueryData(
        ExercisesQueryKeys.detail(getFormattedDate(data.date)),
      ) as UseToggleCompletedDataType;

      queryClient.setQueryData(
        ExercisesQueryKeys.detail(getFormattedDate(data.date)),
        (old: UseToggleCompletedDataType) => {
          return {
            ...old,
            data: old.data.map((o) => {
              if (o.id === data.exercise.id) return { ...o, isCompleted: data.isCompleted };
              return o;
            }),
          };
        },
      );
      return { prev };
    },
  },
  toggleComplete: {
    mutationFn: ({ exerciseId, isCompleted }: { exerciseId: number; isCompleted: boolean }) =>
      api.exercise.toggleComplete({ exerciseId, isCompleted }),
  },
  deleteDiet: {
    mutationFn: ({ id }: Pick<ExerciseTodoItemType, 'id'>) => api.exercise.deleteExercise({ id }),
  },
};
