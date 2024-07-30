import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { mutationOptions, queryOptions } from './queries';
import ChallengeAPI from '@/service/challenge.service';
import api from '@/service/service';

// 챌린지 등록
export const useChallengeRegister = () => useMutation(mutationOptions.register);

// 챌린지 인증
export const useChallengeVerify = () => useMutation(mutationOptions.verify);

//챌린지 항목 조회
export const useGetChallengeDetail = (id: number) => useQuery(queryOptions.getChallengeDetail(id));
