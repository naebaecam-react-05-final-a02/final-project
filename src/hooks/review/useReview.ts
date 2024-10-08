import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { mutationOptions, queryOptions } from './queries';
import ChallengeAPI from '@/service/challenge.service';
import api from '@/service/service';

// 챌린지 리뷰 등록
export const useRegisterReview = () => useMutation(mutationOptions.register);

// 챌린지 리뷰 목록 조회
export const useGetReviews = (id: number) => useQuery(queryOptions.getChallengeReviews(id));
