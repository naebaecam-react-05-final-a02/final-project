import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './queries';

export const useSearchFoodInfo = (foodName: string) => useQuery(queryOptions.searchFoodInfo(foodName));
