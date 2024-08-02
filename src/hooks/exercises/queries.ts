import api from '@/service/service';
import { RecordData } from '@/types/exercises';

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
};
