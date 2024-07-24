import { useMutation, useQuery } from '@tanstack/react-query';
import { mutationOptions, queryOptions } from './queries';

export const useGetDiets = (date: string) => {
  return useQuery(queryOptions.getDiets(date));
};
export const useSaveDiet = () => useMutation(mutationOptions.saveDiet);
