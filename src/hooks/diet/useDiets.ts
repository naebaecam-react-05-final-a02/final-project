import { useMutation, useQuery } from '@tanstack/react-query';
import { mutationOptions, queryOptions } from './queries';

export const useGetDiets = (date: string) => {
  return useQuery(queryOptions.getDiets(date));
};

export const useSubmitDiet = () => useMutation(mutationOptions.submitDiet);

export const useDeleteDiets = () => useMutation(mutationOptions.deleteDiet);
