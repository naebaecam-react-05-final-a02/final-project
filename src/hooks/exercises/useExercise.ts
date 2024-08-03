import { useMutation, useQuery } from '@tanstack/react-query';
import { mutationOptions, queryOptions } from './queries';

// 운동 기록 등록
export const useRegisterExercise = () => useMutation(mutationOptions.register);

// 운동 북마크 목록 조회
export const useGetExerciseBookmarks = () => useQuery(queryOptions.getExercisesBookmarks());

// 운동 북마크 토글
export const useToggleBookmark = () => useMutation(mutationOptions.toggleBookmark);

export const useToggleComplete = () => useMutation(mutationOptions.toggleComplete);

// 운동 기록 항목
export const useGetExerciseRecord = (id: string) => useQuery(queryOptions.getExerciseRecord(id));

export const useGetExercises = (date: string) => {
  return useQuery(queryOptions.getExercises(date));
};

export const useDeleteExercises = () => useMutation(mutationOptions.deleteDiet);
