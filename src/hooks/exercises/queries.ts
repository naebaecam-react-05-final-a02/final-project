import api from '@/service/service';
import { ExerciseTodoItemType, RecordData } from '@/types/exercises';

export const ExercisesQueryKeys = {
  all: ['exercises'] as const,
  bookmark: () => [...ExercisesQueryKeys.all, 'bookmark'] as const,
  toggleBookmark: () => [...ExercisesQueryKeys.all, 'toggleBookmark'] as const,
  detail: (date: string) => [...ExercisesQueryKeys.all, date] as const,
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
  toggleBookmark: {
    mutationFn: (exerciseId: number) => api.exercise.toggleBookmark(exerciseId),
  },
  toggleComplete: {
    mutationFn: ({ exerciseId, isCompleted }: { exerciseId: number; isCompleted: boolean }) =>
      api.exercise.toggleComplete({ exerciseId, isCompleted }),
  },
  deleteDiet: {
    mutationFn: ({ id }: Pick<ExerciseTodoItemType, 'id'>) => api.exercise.deleteExercise({ id }),
  },
};
