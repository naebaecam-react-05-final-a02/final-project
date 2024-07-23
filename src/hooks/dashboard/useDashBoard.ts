import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './queries';

// 체중 기록 가져오기
export const useWeights = (query: string) => useQuery(queryOptions.weights(query));
