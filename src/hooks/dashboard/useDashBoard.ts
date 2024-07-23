import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './queries';

// 체중 기록 가져오기
export const useGetWeights = () => useQuery(queryOptions.dashboard());
