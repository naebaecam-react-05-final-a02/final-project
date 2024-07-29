import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { mutationOptions, queryOptions } from './queries';

// 챌린지 등록(생성)
export const useChallengeRegister = () => useMutation(mutationOptions.register);

// 챌린지 인증 등록(생성)
export const useChallengeVerify = () => useMutation(mutationOptions.verify);

// 챌린지 인증 조회(읽기)
export const useGetChallengeVerification = (client: SupabaseClient<Database>, cid: string, vid: string) =>
  useQuery(queryOptions.getVerification(client, cid, vid));

// 챌린지 인증 수정
export const useChallengeVerifyUpdate = () => useMutation(mutationOptions.updateVerification);

//챌린지 항목 조회
export const useGetChallengeDetail = (id: number) => useQuery(queryOptions.getChallengeDetail(id));
