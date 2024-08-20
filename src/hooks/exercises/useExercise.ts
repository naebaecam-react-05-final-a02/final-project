import { RecordData } from '@/types/exercises';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ExercisesQueryKeys, mutationOptions, queryOptions } from './queries';

// 운동 기록 등록
export const useRegisterExercise = () => useMutation(mutationOptions.register);

// 운동 기록 수정
export const useUpdateExercise = () => useMutation(mutationOptions.update);

// 운동 북마크 목록 조회
export const useGetExerciseBookmarks = () => useQuery(queryOptions.getExercisesBookmarks());

// 운동 북마크 토글
export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...mutationOptions.toggleBookmark,
    onMutate: async (record: RecordData) => {
      await queryClient.cancelQueries({ queryKey: ExercisesQueryKeys.bookmark() });
      const previousBookmarks = queryClient.getQueryData<RecordData[]>(ExercisesQueryKeys.bookmark());

      queryClient.setQueryData<RecordData[]>(ExercisesQueryKeys.bookmark(), (old) => {
        if (!old) return [record];
        const index = old.findIndex((bookmark) => bookmark.name === record.name);
        if (index > -1) {
          return old.filter((_, i) => i !== index);
        } else {
          return [...old, record];
        }
      });

      return { previousBookmarks };
    },
    onError: (err, record, context) => {
      queryClient.setQueryData(ExercisesQueryKeys.bookmark(), context?.previousBookmarks);
      console.error('북마크 토글 실패:', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ExercisesQueryKeys.bookmark() });
    },
  });
};
// 운동 완료 토글
export const useToggleCompleted = () => useMutation(mutationOptions.toggleCompleted);

export const useToggleComplete = () => useMutation(mutationOptions.toggleComplete);

// 운동 기록 항목
export const useGetExerciseRecord = (id: string) => useQuery(queryOptions.getExerciseRecord(id));

export const useGetExercises = (date: string) => {
  return useQuery(queryOptions.getExercises(date));
};

export const useDeleteExercises = () => useMutation(mutationOptions.deleteDiet);
